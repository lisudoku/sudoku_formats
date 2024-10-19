import { expect, test } from 'vitest'
import { transformer } from './transformer';
import { LisudokuConstraints } from '../lisudoku';

const GRID_STRING = '000000000000000010000000200000003000000040000000500000000000000000000000000000000'
const GRID_STRING_INVALID_SIZE = '0000'

const LISUDOKU_SOLVER_URL = `https://lisudoku.xyz/solver?import=${GRID_STRING}`
const LISUDOKU_CONSTRAINTS: LisudokuConstraints = {
  gridSize: 9,
  fixedNumbers: [
    { position: { row: 1, col: 7 }, value: 1 },
    { position: { row: 2, col: 6 }, value: 2 },
    { position: { row: 3, col: 5 }, value: 3 },
    { position: { row: 4, col: 4 }, value: 4 },
    { position: { row: 5, col: 3 }, value: 5 },
  ],
}

test('transformToLisudoku', () => {
  const result = transformer.transformToLisudoku(GRID_STRING)
  expect(result).toEqual({
    constraints: LISUDOKU_CONSTRAINTS,
    dataString: GRID_STRING,
    url: LISUDOKU_SOLVER_URL,
  })
})

test('transformToLisudoku invalid grid size', () => {
  const result = transformer.transformToLisudoku(GRID_STRING_INVALID_SIZE)
  expect(result).toEqual({
    error: expect.stringContaining('Invalid'),
  })
})

test('transformFromLisudoku', async () => {
  const result = transformer.transformFromLisudoku(LISUDOKU_CONSTRAINTS)
  expect(result).toEqual({
    constraints: GRID_STRING,
    dataString: GRID_STRING,
    url: expect.stringContaining(GRID_STRING),
  })
})
