import { fromPairs, inRange, isEmpty, orderBy, times, toPairs } from 'lodash-es'
import { Transformer, TransformOutput } from '../../types'
import { LisudokuConstraints } from '../lisudoku'
import { CellPosition, FixedNumber, KropkiDot, KropkiDotType } from '../lisudoku/types'
import { GRID_SIZES, normalizeConstraints } from '../lisudoku/utils'
import { PenpaConstraints } from './types'
import { encoder as penpaEncoder } from './encoder'
import { encoder as lisudokuEncoder } from '../lisudoku/encoder'

// Simplifies formula because spaces will be 0
const cellToIndex = (cell: CellPosition, constraints: Pick<PenpaConstraints, 'colCount' | 'space'>) => (
  (cell.row + 2 + constraints.space[0]) * (constraints.colCount + 4) + cell.col + 2 + constraints.space[2]
)

const cellArrayToIndices = (cells: CellPosition[], constraints: Pick<PenpaConstraints, 'colCount' | 'space'>) => (
  cells.map((cell) => cellToIndex(cell, constraints))
)

const cellTopLeftIndex = (cell: CellPosition, constraints: PenpaConstraints) => (
  4 * (cellToIndex(cell, constraints) + (constraints.rowCount + 4) * (constraints.colCount + 4))
)

const indexToCell = (index: number, constraints: Pick<PenpaConstraints, 'colCount' | 'space'>) => ({
  row: Math.floor(index / (constraints.colCount + 4)) - 2 - constraints.space[0],
  col: index % (constraints.colCount + 4) - 2 - constraints.space[2],
})

const indexArraytoCells = (indices: number[], constraints: Pick<PenpaConstraints, 'colCount' | 'space'>) => (
  indices.map((index) => indexToCell(index, constraints))
)

const kropkiDotToIndex = (dot: KropkiDot, constraints: Pick<PenpaConstraints, 'rowCount' | 'colCount' | 'space'>) => {
  const cells = orderBy([dot.cell1, dot.cell2], ['row', 'col'])
  const cell = cells[0]
  if (cell.row === cells[1].row) {
    // horizontal
    return 3 * (constraints.rowCount + 4) * (constraints.colCount + 4) + cellToIndex(cell, constraints)
  } else {
    // vertical
    return 2 * (constraints.rowCount + 4) * (constraints.colCount + 4) + cellToIndex(cell, constraints)
  }
}

const buildKropki = (index: number, val: [number, string, number], constraints: PenpaConstraints): KropkiDot => {
  const dotType = val[0] === 1 || val[0] === 8 ? KropkiDotType.Consecutive : KropkiDotType.Double

  // Note: might have missed some cases here when it's from the other cell's perspective
  if (index >= 3 * (constraints.rowCount + 4) * (constraints.colCount + 4) + cellToIndex({ row: 0, col: 0 }, constraints)) {
    // horizontal
    const cellIndex = index - 3 * (constraints.rowCount + 4) * (constraints.colCount + 4)
    const cell = indexToCell(cellIndex, constraints)
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
    const cellIndex = index - 2 * (constraints.rowCount + 4) * (constraints.colCount + 4)
    const cell = indexToCell(cellIndex, constraints)
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

    const cell = indexToCell(Number(index), constraints)
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
    thermos: constraints.thermo.filter((thermo) => thermo.length >= 2).map((thermo) => indexArraytoCells(thermo, constraints)),
    arrows: constraints.arrows.map(([circleIndex, ...arrowIndices]) => ({
      circleCells: [indexToCell(circleIndex, constraints)],
      arrowCells: indexArraytoCells(arrowIndices, constraints),
    })),
    primaryDiagonal: Boolean(constraints.sudoku[0]),
    secondaryDiagonal: Boolean(constraints.sudoku[3]),
    // Need to fix killer cages first
    // killerCages: [],
    kropkiDots: toPairs(constraints.symbol)
      .filter(([_, val]) => val[1] === 'circle_SS')
      .map(([index, val]) => buildKropki(Number(index), val, constraints)),
    oddCells: toPairs(constraints.symbol)
      .filter(([_, val]) => val[1] === 'circle_L')
      .map(([index, _]) => indexToCell(Number(index), constraints)),
    evenCells: toPairs(constraints.symbol)
      .filter(([_, val]) => val[1] === 'square_L')
      .map(([index, _]) => indexToCell(Number(index), constraints)),
  }

  const fixedDigitsInvalid = newConstraints.fixedNumbers?.some(({ position: { row, col }, value }) => {
    if (!inRange(value, 1, newConstraints.gridSize + 1)) return true;
    if (!inRange(row, 0, newConstraints.gridSize)) return true;
    if (!inRange(col, 0, newConstraints.gridSize)) return true;
    return false;
  })
  if (fixedDigitsInvalid) {
    return {
      error: `Given digits out of range.`,
    }
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
      const index = cellToIndex({ row, col }, { colCount: constraints.gridSize, space: [0, 0, 0, 0] })
      centerlist.push(index - prevIndex)
      prevIndex = index
    })
  })

  const gridSize = constraints.gridSize

  const auxConstraints: Pick<PenpaConstraints, 'rowCount' | 'colCount' | 'space'> = {
    rowCount: gridSize,
    colCount: gridSize,
    space: [0, 0, 0, 0],
  }

  // TODO: Killer cage and primary diagonals not showing
  // Not implemented: extra regions, renban and others
  // Include some (like antiknigh into written rules?! antiknight, antiking, kropkiNegative)
  const newConstraints: PenpaConstraints = {
    ...auxConstraints,
    cellSize: 38,
    canvasWidth: (gridSize + 1) * 38,
    canvasHeight: (gridSize + 1) * 38,
    centerCellIndex: cellToIndex({ row: Math.floor(gridSize / 2), col: Math.floor(gridSize / 2) }, auxConstraints),
    sudoku: [Number(constraints.primaryDiagonal), 0, 0, Number(constraints.secondaryDiagonal)],
    thermo: (constraints.thermos ?? []).map((thermo) => cellArrayToIndices(thermo, auxConstraints)),
    // Commented until killer cage is fixed
    // killercages: (constraints.killerCages ?? []).map((cage) => cellArrayToIndices(cage.region, gridSize)),
    killercages: [],
    arrows: (constraints.arrows ?? [])
      .filter((arrow) => arrow.circleCells.length === 1)
      .map((arrow) => cellArrayToIndices([...arrow.circleCells, ...arrow.arrowCells], auxConstraints)),
    number: fromPairs(
      (constraints.fixedNumbers ?? []).map(({ position, value }) => [
        cellToIndex(position, auxConstraints),
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
        kropkiDotToIndex(dot, auxConstraints),
        [dot.dotType === KropkiDotType.Consecutive ? 8 : 2, 'circle_SS', 2]
      ]),
      ...(constraints.oddCells ?? []).map((cell) => [
        cellToIndex(cell, auxConstraints),
        [3, 'circle_L', 2],
      ]),
      ...(constraints.evenCells ?? []).map((cell) => [
        cellToIndex(cell, auxConstraints),
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
