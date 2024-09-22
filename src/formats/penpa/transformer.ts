import { fromPairs, isEmpty, orderBy, times, toPairs } from 'lodash-es'
import { Transformer, TransformOutput } from '../../types'
import { LisudokuConstraints } from '../lisudoku'
import { CellPosition, FixedNumber, KropkiDot, KropkiDotType, Region } from '../lisudoku/types'
import { GRID_SIZES, normalizeConstraints } from '../lisudoku/utils'
import { PenpaConstraints } from './types'
import { encoder as penpaEncoder } from './encoder'
import { encoder as lisudokuEncoder } from '../lisudoku/encoder'

// Simplifies formula because spaces will be 0
const cellToIndex = (cell: CellPosition, gridSize: number) => (
  (cell.row + 2) * (gridSize + 4) + cell.col + 2
)

const cellArrayToIndices = (cells: CellPosition[], gridSize: number) => (
  cells.map((cell) => cellToIndex(cell, gridSize))
)

const cellTopLeftIndex = (cell: CellPosition, gridSize: number) => (
  4 * (cellToIndex(cell, gridSize) + (gridSize + 4) * (gridSize + 4))
)

const indexToCell = (index: number, gridSize: number) => ({
  row: Math.floor(index / (gridSize + 4)) - 2,
  col: index % (gridSize + 4) - 2,
})

const indexArraytoCells = (indices: number[], gridSize: number) => (
  indices.map((index) => indexToCell(index, gridSize))
)

const kropkiDotToIndex = (dot: KropkiDot, gridSize: number) => {
  const cells = orderBy([dot.cell1, dot.cell2], ['row', 'col'])
  const cell = cells[0]
  if (cell.row === cells[1].row) {
    // horizontal
    return 3 * (gridSize + 4) * (gridSize + 4) + cellToIndex(cell, gridSize)
  } else {
    // vertical
    return 2 * (gridSize + 4) * (gridSize + 4) + cellToIndex(cell, gridSize)
  }
}

const buildKropki = (index: number, val: [number, string, number], gridSize: number): KropkiDot => {
  const dotType = val[0] === 1 || val[0] === 8 ? KropkiDotType.Consecutive : KropkiDotType.Double

  // Note: might have missed some cases here when it's from the other cell's perspective
  if (index >= 3 * (gridSize + 4) * (gridSize + 4) + cellToIndex({ row: 0, col: 0 }, gridSize)) {
    // horizontal
    const cellIndex = index - 3 * (gridSize + 4) * (gridSize + 4)
    const cell = indexToCell(cellIndex, gridSize)
    return {
      dotType,
      cell1: cell,
      cell2: {
        row: cell.row,
        col: cell.col + 1,
      }
    }
  } else {
    // vertical
    const cellIndex = index - 2 * (gridSize + 4) * (gridSize + 4)
    const cell = indexToCell(cellIndex, gridSize)
    return {
      dotType,
      cell1: cell,
      cell2: {
        row: cell.row + 1,
        col: cell.col,
      }
    }
  }
}

const transformToLisudoku = (constraints: PenpaConstraints): TransformOutput<LisudokuConstraints> => {
  const rowCountFinal = constraints.rowCount - constraints.space[0] - constraints.space[1]
  const colCountFinal = constraints.colCount - constraints.space[2] - constraints.space[3]
  if (rowCountFinal !== colCountFinal) {
    return {
      error: 'Grid is not square, cannot convert',
    }
  }

  const gridSize = rowCountFinal

  if (!GRID_SIZES.includes(gridSize)) {
    return {
      error: `Invalid grid size ${gridSize}.`,
    }
  }

  const fixedNumbers: FixedNumber[] = []
  for (const [index, valueArr] of Object.entries(constraints.number)) {
    if (!Array.isArray(valueArr)) {
      continue
    }
    const [valueStr] = valueArr
    const value = Number(valueStr)
    if (!Number.isInteger(value)) {
      continue
    }

    const cell = indexToCell(Number(index), gridSize)
    const fixedNumber: FixedNumber = {
      position: cell,
      value,
    }
    fixedNumbers.push(fixedNumber)
  }

  // Not implemented: custom regions, extra regions, antiKnight, antiKing, kropkiNegative

  const newConstraints: LisudokuConstraints = {
    gridSize,
    fixedNumbers,
    thermos: constraints.thermo.map((thermo) => indexArraytoCells(thermo, gridSize)),
    arrows: constraints.arrows.map(([circleIndex, ...arrowIndices]) => ({
      circleCells: [indexToCell(circleIndex, gridSize)],
      arrowCells: indexArraytoCells(arrowIndices, gridSize),
    })),
    primaryDiagonal: Boolean(constraints.sudoku[0]),
    secondaryDiagonal: Boolean(constraints.sudoku[3]),
    // Need to fix killer cages first
    // killerCages: [],
    kropkiDots: toPairs(constraints.symbol)
      .filter(([_, val]) => val[1] === 'circle_SS')
      .map(([index, val]) => buildKropki(Number(index), val, gridSize)),
    oddCells: toPairs(constraints.symbol)
      .filter(([_, val]) => val[1] === 'circle_L')
      .map(([index, _]) => indexToCell(Number(index), gridSize)),
    evenCells: toPairs(constraints.symbol)
      .filter(([_, val]) => val[1] === 'square_L')
      .map(([index, _]) => indexToCell(Number(index), gridSize)),
  }

  const normalizedConstraints = normalizeConstraints(newConstraints)

  const result: TransformOutput<LisudokuConstraints> = {
    constraints: newConstraints,
    ...lisudokuEncoder(normalizedConstraints)
  }

  const PENPA_UNIMPLEMENTED_CONSTRAINTS = ['killercages']
  const ignoredConstraints = [
    ...PENPA_UNIMPLEMENTED_CONSTRAINTS.filter(field => !isEmpty(constraints[field as keyof PenpaConstraints]))
  ]
  if (ignoredConstraints.length > 0) {
    result.warning = 'Ignored some constraints: ' + ignoredConstraints.join(', ')
  }

  return result
}

const transformFromLisudoku = (constraints: LisudokuConstraints): TransformOutput<PenpaConstraints> => {
  const centerlist: number[] = []
  let prevIndex = 0
  times(constraints.gridSize, row => {
    times(constraints.gridSize, col => {
      const index = cellToIndex({ row, col }, constraints.gridSize)
      centerlist.push(index - prevIndex)
      prevIndex = index
    })
  })

  const gridSize = constraints.gridSize

  // TODO: Killer cage and primary diagonals not showing
  // Not implemented: extra regions, renban and others
  // Include some (like antiknigh into written rules?! antiknight, antiking, kropkiNegative)
  const newConstraints: PenpaConstraints = {
    rowCount: gridSize,
    colCount: gridSize,
    cellSize: 38,
    canvasWidth: (gridSize + 1) * 38,
    canvasHeight: (gridSize + 1) * 38,
    centerCellIndex: cellToIndex({ row: Math.floor(gridSize / 2), col: Math.floor(gridSize / 2) }, gridSize),
    space: [0, 0, 0, 0],
    sudoku: [Number(constraints.primaryDiagonal), 0, 0, Number(constraints.secondaryDiagonal)],
    thermo: (constraints.thermos ?? []).map((thermo) => cellArrayToIndices(thermo, gridSize)),
    // Commented until killer cage is fixed
    // killercages: (constraints.killerCages ?? []).map((cage) => cellArrayToIndices(cage.region, gridSize)),
    killercages: [],
    arrows: (constraints.arrows ?? [])
      .filter((arrow) => arrow.circleCells.length === 1)
      .map((arrow) => cellArrayToIndices([...arrow.circleCells, ...arrow.arrowCells], gridSize)),
    number: fromPairs(
      (constraints.fixedNumbers ?? []).map(({ position, value }) => [
        cellToIndex(position, gridSize),
        [String(value), 1, "1"],
      ]
    )),
    numberS: fromPairs(
      // Commented until killer cage is fixed
      // (constraints.killerCages ?? []).map((cage) => [
      //   cellTopLeftIndex(cage.region[0], gridSize),
      //   [` ${cage.sum}`, 1],
      // ])
      []
    ),
    symbol: fromPairs([
      ...(constraints.kropkiDots ?? []).map((dot) => [
        kropkiDotToIndex(dot, gridSize),
        [dot.dotType === KropkiDotType.Consecutive ? 8 : 2, 'circle_SS', 2]
      ]),
      ...(constraints.oddCells ?? []).map((cell) => [
        cellToIndex(cell, gridSize),
        [3, 'circle_L', 2],
      ]),
      ...(constraints.evenCells ?? []).map((cell) => [
        cellToIndex(cell, gridSize),
        [3, 'square_L', 2],
      ]),
    ]),
    centerlist,
  }

  const result: TransformOutput<PenpaConstraints> = {
    constraints: newConstraints,
    ...penpaEncoder(newConstraints)
  }

  const PENPA_UNIMPLEMENTED_CONSTRAINTS = ['killerCages']
  const ignoredConstraints = [
    ...PENPA_UNIMPLEMENTED_CONSTRAINTS.filter(field => !isEmpty(constraints[field as keyof LisudokuConstraints]))
  ]
  if (ignoredConstraints.length > 0) {
    result.warning = 'Ignored some constraints: ' + ignoredConstraints.join(', ')
  }

  return result
}

export const transformer: Transformer<PenpaConstraints> = {
  transformToLisudoku,
  transformFromLisudoku,
}
