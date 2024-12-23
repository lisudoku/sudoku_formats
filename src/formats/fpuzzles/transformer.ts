import { flatMap, isEmpty, minBy, times } from 'lodash-es'
import { Transformer, TransformOutput } from '../../types'
import { LisudokuConstraints } from '../lisudoku'
import { CellPosition, FixedNumber, KropkiDot, KropkiDotType, Region } from '../lisudoku/types'
import { ensureDefaultRegions, GRID_SIZES, normalizeConstraints, regionGridToRegions, regionsToRegionGrid } from '../lisudoku/utils'
import { FpuzzlesConstraints, Grid as FGrid } from './types'
import { encoder as fpuzzlesEncoder } from './encoder'
import { encoder as lisudokuEncoder } from '../lisudoku/encoder'

const FPUZZLES_UNIMPLEMENTED_CONSTRAINTS: string[] = [
  'disjointgroups', 'littlekillersum', 'minimum', 'maximum',
  'rowindexer', 'columnindexer', 'boxindexer', 'palindrome', 'whispers', 'regionsumline',
  'xv', 'clone', 'quadruple', 'betweenline', 'sandwichsum', 'xsum', 'skyscraper', 'entropicline',
  'cage', 'text',
  // Removed 'disabledlogic' and 'truecandidatesoptions' because they seem related to the solver
]

const cellStringToObject = (cell: string) => ({
  row: Number.parseInt(cell[1]) - 1,
  col: Number.parseInt(cell[3]) - 1,
})

const mapCellStringArray = (cells: string[]) => (
  cells.map((cell: string) => cellStringToObject(cell))
)

const cellObjectToString = (cell: CellPosition): string => `R${cell.row + 1}C${cell.col + 1}`

const transformToLisudoku = (constraints: FpuzzlesConstraints): TransformOutput<LisudokuConstraints> => {
  const ignoredConstraints = []

  const gridSize = constraints.size
  if (!GRID_SIZES.includes(gridSize)) {
    return {
      error: `Invalid grid size ${gridSize}.`,
    }
  }

  const fixedNumbers: FixedNumber[] = []
  times(gridSize, row => {
    times(gridSize, col => {
      const cell = constraints.grid[row][col]
      if (cell.value) {
        const fixedNumber: FixedNumber = {
          position: {
            row,
            col,
          },
          value: cell.value,
        }
        fixedNumbers.push(fixedNumber)
      }
    })
  })

  const defaultRegions = ensureDefaultRegions(gridSize)
  const regionGrid = regionsToRegionGrid(gridSize, defaultRegions)
  times(gridSize, row => {
    times(gridSize, col => {
      const regionIndex = constraints.grid[row][col].region
      if (regionIndex !== undefined) {
        regionGrid[row][col] = regionIndex + 1
      }
    })
  })
  const regions: Region[] = regionGridToRegions(gridSize, regionGrid)

  const kropkiDots: KropkiDot[] = []
  for (const { cells, value } of constraints.difference ?? []) {
    if (value !== undefined) {
      ignoredConstraints.push('difference')
      continue
    }
    const dot: KropkiDot = {
      dotType: KropkiDotType.Consecutive,
      cell1: cellStringToObject(cells[0]),
      cell2: cellStringToObject(cells[1]),
    }
    kropkiDots.push(dot)
  }
  for (const { cells, value } of constraints.ratio ?? []) {
    if (value !== undefined) {
      ignoredConstraints.push('ratio')
      continue
    }
    const dot: KropkiDot = {
      dotType: KropkiDotType.Double,
      cell1: cellStringToObject(cells[0]),
      cell2: cellStringToObject(cells[1]),
    }
    kropkiDots.push(dot)
  }

  ignoredConstraints.push(
    ...FPUZZLES_UNIMPLEMENTED_CONSTRAINTS.filter(field => constraints[field as keyof FpuzzlesConstraints] !== undefined)
  )

  const newConstraints: LisudokuConstraints = {
    gridSize: gridSize,
    fixedNumbers,
    regions,
    extraRegions: (constraints.extraregion ?? []).map(({ cells }: { cells: string[] }) => (
      mapCellStringArray(cells)
    )),
    thermos: flatMap(constraints.thermometer ?? [], ({ lines }: { lines: string[][] }) => (
      lines.map((cells: string[]) => mapCellStringArray(cells))
    )),
    arrows: (constraints.arrow ?? []).map(({ cells, lines }: { cells: string[], lines: string[][] }) => ({
      circleCells: cells.map(cellStringToObject),
      // TODO: multiple lines not implemented
      arrowCells: lines[0].slice(1).map(cellStringToObject),
    })),
    primaryDiagonal: Boolean(constraints['diagonal-']),
    secondaryDiagonal: Boolean(constraints['diagonal+']),
    antiKnight: Boolean(constraints.antiknight),
    antiKing: Boolean(constraints.antiking),
    killerCages: (constraints.killercage ?? []).map(({ cells, value }: { cells: string[], value?: string }) => ({
      sum: value === undefined ? null : Number.parseInt(value),
      region: mapCellStringArray(cells),
    })),
    kropkiDots,
    kropkiNegative: (!isEmpty(constraints.negative) && constraints.negative?.includes('ratio')) || Boolean(constraints.nonconsecutive),
    oddCells: (constraints.odd ?? []).map(({ cell }: { cell: string }) => cellStringToObject(cell)),
    evenCells: (constraints.even ?? []).map(({ cell }: { cell: string }) => cellStringToObject(cell)),
    topBottom: false,
    renbans: flatMap(constraints.renban ?? [], ({ lines }) => lines.map(mapCellStringArray)),
  }

  const normalizedConstraints = normalizeConstraints(newConstraints)

  const result: TransformOutput<LisudokuConstraints> = {
    constraints: normalizedConstraints,
    ...lisudokuEncoder(normalizedConstraints)
  }

  if (ignoredConstraints.length > 0) {
    result.warning = 'Ignored some constraints: ' + ignoredConstraints.join(', ')
  }

  return result
}

const transformFromLisudoku = (constraints: LisudokuConstraints): TransformOutput<FpuzzlesConstraints> => {
  const gridSize = constraints.gridSize
  const grid: FGrid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null).map(() => ({})))
  const defaultRegions = ensureDefaultRegions(gridSize)
  const regionGrid = regionsToRegionGrid(gridSize, constraints.regions ?? defaultRegions)
  const defaultRegionGrid = regionsToRegionGrid(gridSize, defaultRegions)
  times(gridSize, row => {
    times(gridSize, col => {
      if (regionGrid[row][col] !== defaultRegionGrid[row][col]) {
        grid[row][col].region = regionGrid[row][col] - 1
      }
    })
  })
  for (const { value, position: { row, col } } of constraints.fixedNumbers ?? []) {
    grid[row][col].value = value
    grid[row][col].given = true
  }

  const newConstraints: FpuzzlesConstraints = {
    size: gridSize,
    grid,
    extraregion: constraints.extraRegions?.map((region) => ({ cells: region.map(cellObjectToString) })),
    thermometer: constraints.thermos?.map((thermo) => ({ lines: [thermo.map(cellObjectToString)] })),
    arrow: constraints.arrows?.map((arrow) => ({
      cells: arrow.circleCells.map(cellObjectToString),
      lines: [[
        cellObjectToString(minBy(arrow.circleCells, cell => (
          Math.abs(arrow.arrowCells[0].row - cell.row) + Math.abs(arrow.arrowCells[0].col - cell.col)
        ))!),
        ...arrow.arrowCells.map(cellObjectToString)
      ]],
    })),
    "diagonal+": constraints.primaryDiagonal,
    "diagonal-": constraints.secondaryDiagonal,
    antiknight: constraints.antiKnight,
    antiking: constraints.antiKing,
    difference: constraints.kropkiDots
      ?.filter(({ dotType }) => dotType === KropkiDotType.Consecutive)
      .map(({ cell1, cell2 }) => ({
        cells: [cellObjectToString(cell1), cellObjectToString(cell2)],
        // value ignored, not implemented
      })),
    ratio: constraints.kropkiDots
      ?.filter(({ dotType }) => dotType === KropkiDotType.Double)
      .map(({ cell1, cell2 }) => ({
        cells: [cellObjectToString(cell1), cellObjectToString(cell2)],
        // value ignored, not implemented
      })),
    odd: constraints.oddCells?.map((cell: CellPosition) => ({ cell: cellObjectToString(cell) })),
    even: constraints.evenCells?.map((cell: CellPosition) => ({ cell: cellObjectToString(cell) })),
    killercage: constraints.killerCages?.map((killerCage) => ({
      cells: killerCage.region.map(cellObjectToString),
      value: killerCage.sum === null ? undefined : killerCage.sum.toString(),
    })),
    ...(constraints.kropkiNegative ? { nonconsecutive: true } : {}), // shady
    // negative: [], // probably should include something here
    renban: constraints.renbans?.map(renban => ({
      lines: [renban.map(cellObjectToString)],
    })),
    line: [
      ...(constraints.renbans ?? []).map(renban => ({
        lines: [renban.map(cellObjectToString)],
        outlineC: 'gray',
        width: 0.2,
        isNewConstraint: true,
      }))
    ],
  }

  return {
    constraints: newConstraints,
    ...fpuzzlesEncoder(newConstraints)
  }
}

export const transformer: Transformer<FpuzzlesConstraints> = {
  transformToLisudoku,
  transformFromLisudoku,
}
