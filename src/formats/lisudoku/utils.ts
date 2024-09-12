import { camelCase, flatten, flattenDeep, times } from 'lodash-es'
import { CellPosition, FixedNumber, Grid, LisudokuConstraints, Region } from './types'

// TODO: deduplicate copy-pasted code from lisudou_frontend

const GRID_SIZES = [ 4, 6, 9 ]

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

export const defaultConstraints = (gridSize: number): Required<LisudokuConstraints> => ({
  gridSize,
  fixedNumbers: [],
  regions: ensureDefaultRegions(gridSize),
  extraRegions: [],
  thermos: [],
  arrows: [],
  killerCages: [],
  kropkiDots: [],
  kropkiNegative: false,
  primaryDiagonal: false,
  secondaryDiagonal: false,
  antiKnight: false,
  antiKing: false,
  oddCells: [],
  evenCells: [],
  topBottom: false,
  renbans: [],
})

export const gridSizeFromString: (gridString: string) => number = (gridString: string) => (
  Math.sqrt(gridString.length)
)

export const isGridString = (gridString: string) => {
  const gridSize = gridSizeFromString(gridString)
  if (Math.trunc(gridSize) !== gridSize) {
    return false
  }
  if (!GRID_SIZES.includes(gridSize)) {
    return false
  }
  if (![...gridString].every(value => '0' <= value && value <= String(gridSize))) {
    return false
  }
  return true
}

const createGridOfSize: (gridSize: number) => Grid = (gridSize: number) => (
  Array(gridSize).fill(null).map(() => Array(gridSize).fill(null))
)

const gridStringToGrid: (gridString: string) => Grid = (gridString: string) => {
  const gridSize = gridSizeFromString(gridString)
  const grid = createGridOfSize(gridSize)
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const index = row * gridSize + col
      if (gridString[index] !== '0') {
        grid[row][col] = parseInt(gridString[index])
      }
    }
  }
  return grid
}

const gridToFixedNumbers: (grid: Grid) => FixedNumber[] = (grid: Grid) => {
  const fixedNumbers: FixedNumber[] = []
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell !== null) {
        fixedNumbers.push({
          position: {
            row: rowIndex,
            col: colIndex,
          },
          value: cell,
        })
      }
    })
  })
  return fixedNumbers
}

export const gridStringToFixedNumbers: (gridString: string) => FixedNumber[] = (gridString: string) => {
  const grid = gridStringToGrid(gridString)
  return gridToFixedNumbers(grid)
}

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
