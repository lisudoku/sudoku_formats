import { Transformer, TransformOutput } from '../../types'
import { LisudokuConstraints } from '../lisudoku'
import { FixedNumber, Grid, SudokuVariant } from '../lisudoku/types'
import { detectVariant, GRID_SIZES, normalizeConstraints } from '../lisudoku/utils'
import { encoder as gridStringEncoder } from './encoder'
import { encoder as lisudokuEncoder } from '../lisudoku/encoder'

const gridSizeFromString: (gridString: string) => number = (gridString: string) => (
  Math.sqrt(gridString.length)
)

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

const gridStringToFixedNumbers: (gridString: string) => FixedNumber[] = (gridString: string) => {
  const grid = gridStringToGrid(gridString)
  return gridToFixedNumbers(grid)
}

// Assumes gridString is valid
const transformToLisudoku = (gridString: string): TransformOutput<LisudokuConstraints> => {
  const gridSize = gridSizeFromString(gridString)
  if (!GRID_SIZES.includes(gridSize)) {
    return {
      error: `Invalid grid size ${gridSize}.`,
    }
  }

  const fixedNumbers = gridStringToFixedNumbers(gridString)

  const newConstraints: LisudokuConstraints = {
    gridSize: gridSize,
    fixedNumbers,
  }
  const normalizedConstraints = normalizeConstraints(newConstraints)

  const result: TransformOutput<LisudokuConstraints> = {
    constraints: normalizedConstraints,
    ...lisudokuEncoder(normalizedConstraints)
  }

  return result
}

const gridToGridString: (grid: Grid) => string = (grid: Grid) => {
  let gridString = '';
  grid.forEach(row => {
    row.forEach(cell => {
      const value = cell !== null ? cell : 0;
      gridString += value;
    })
  })
  return gridString;
}

const fixedNumbersToGridString: (gridSize: number, fixedNumbers?: FixedNumber[]) => string = (gridSize: number, fixedNumbers?: FixedNumber[]) => {
  const grid = computeFixedNumbersGrid(gridSize, fixedNumbers)
  return gridToGridString(grid)
}

const computeFixedNumbersGrid = (gridSize: number, fixedNumbers?: FixedNumber[]) => {
  const grid: Grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null))
  for (const fixedNumber of fixedNumbers ?? []) {
    grid[fixedNumber.position.row][fixedNumber.position.col] = fixedNumber.value
  }
  return grid
}

const transformFromLisudoku = (constraints: LisudokuConstraints): TransformOutput<string> => {
  const variant = detectVariant(constraints)
  
  if (variant !== SudokuVariant.Classic) {
    return {
      error: 'Can only convert classic sudoku into grid string',
    }
  }
  const gridString = fixedNumbersToGridString(constraints.gridSize, constraints.fixedNumbers)

  return {
    constraints: gridString,
    ...gridStringEncoder(gridString)
  }
}

export const transformer: Transformer<string> = {
  transformToLisudoku,
  transformFromLisudoku,
}
