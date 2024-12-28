import { camelCase, flatten, flattenDeep, isBoolean, isEmpty, isEqual, isNumber, omitBy, times } from 'lodash-es'
import { CellPosition, Grid, LisudokuConstraints, Region, SudokuVariant } from './types'

// TODO: deduplicate copy-pasted code from lisudou_frontend

export const GRID_SIZES = [ 4, 6, 9 ]

const changeKeys = (obj: any, keyChangeFn: (string?: string) => string): any => {
  if (Array.isArray(obj)) {
    return obj.map(v => changeKeys(v, keyChangeFn));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [keyChangeFn(key)]: changeKeys(obj[key], keyChangeFn),
      }),
      {},
    );
  }
  return obj;
};

export const camelCaseKeys = (obj: any): any => changeKeys(obj, camelCase)

const computeRegionSizes = (gridSize: number) => {
  if (gridSize === 4) {
    return [ 2, 2 ]
  } else if (gridSize === 6) {
    return [ 2, 3 ]
  } else {
    return [ 3, 3 ]
  }
}

export const defaultConstraints = (gridSize: number): LisudokuConstraints => ({
  gridSize,
})

export const ensureDefaultRegions = (gridSize: number): Region[] => {
  const [ regionHeight, regionWidth ] = computeRegionSizes(gridSize)
  const defaultRegions: Region[] = flatten(
    times(gridSize / regionHeight, regionRowIndex => (
      times(gridSize / regionWidth, regionColIndex => (
        flattenDeep(
          times(regionHeight, rowIndex => (
            times(regionWidth, colIndex => (
              {
                row: regionRowIndex * regionHeight + rowIndex,
                col: regionColIndex * regionWidth + colIndex,
              } as CellPosition
            ))
          ))
        )
      ))
    ))
  )

  return defaultRegions
}

export const detectVariant = (constraints: LisudokuConstraints | null) => {
  if (constraints === null) {
    return SudokuVariant.Classic
  }
  const variants = []
  if (!isEmpty(constraints.thermos)) {
    variants.push(SudokuVariant.Thermo)
  }
  if (!isEmpty(constraints.arrows)) {
    variants.push(SudokuVariant.Arrow)
  }
  if (constraints.primaryDiagonal || constraints.secondaryDiagonal) {
    variants.push(SudokuVariant.Diagonal)
  }
  if (constraints.antiKnight) {
    variants.push(SudokuVariant.AntiKnight)
  }
  if (constraints.antiKing) {
    variants.push(SudokuVariant.AntiKing)
  }
  if (constraints.regions !== undefined && !isEqual(constraints.regions, ensureDefaultRegions(constraints.gridSize))) {
    variants.push(SudokuVariant.Irregular)
  }
  if (!isEmpty(constraints.killerCages)) {
    variants.push(SudokuVariant.Killer)
  }
  if (!isEmpty(constraints.kropkiDots)) {
    variants.push(SudokuVariant.Kropki)
  }
  if (!isEmpty(constraints.extraRegions)) {
    variants.push(SudokuVariant.ExtraRegions)
  }
  if (!isEmpty(constraints.oddCells) || !isEmpty(constraints.evenCells)) {
    variants.push(SudokuVariant.OddEven)
  }
  if (constraints.topBottom) {
    variants.push(SudokuVariant.TopBottom)
  }
  if (!isEmpty(constraints.renbans)) {
    variants.push(SudokuVariant.Renban)
  }
  if (!isEmpty(constraints.palindromes)) {
    variants.push(SudokuVariant.Palindrome)
  }
  if (variants.length > 1) {
    return SudokuVariant.Mixed
  } else if (variants.length === 1) {
    return variants[0]
  } else {
    return SudokuVariant.Classic
  }
}

export const regionsToRegionGrid = (gridSize: number, regions: Region[]) => {
  const regionGrid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null))
  regions.forEach((region, index) => {
    for (const { row, col } of region) {
      regionGrid[row][col] = index + 1
    }
  })
  return regionGrid
}

export const regionGridToRegions = (gridSize: number, regionGrid: Grid): Region[] => {
  const regions: Region[] = []
  times(gridSize, row => {
    times(gridSize, col => {
      const regionIndex = regionGrid[row][col]! - 1
      regions[regionIndex] ||= []
      const cell: CellPosition = { row, col }
      regions[regionIndex].push(cell)
    })
  })
  return regions
}

// This one is original :)
export const normalizeConstraints = (constraints: LisudokuConstraints): LisudokuConstraints => {
  const filteredConstraints = omitBy(
    constraints,
    value => !isNumber(value) &&
             (value === false || (!isBoolean(value) && isEmpty(value)))
  ) as LisudokuConstraints
  if (isEqual(filteredConstraints.regions, ensureDefaultRegions(constraints.gridSize))) {
    delete filteredConstraints.regions
  }
  return filteredConstraints
}
