import { expect, test } from 'vitest'
import { decodeSudoku } from './decodeSudoku';
import { SudokuDataFormat } from './types';
import { GRID_STRING, LISUDOKU_CONSTRAINTS, LISUDOKU_DATA_STRING, LISUDOKU_GRID_STRING_CONSTRAINTS, LISUDOKU_SOLVER_INVALID_URL, LISUDOKU_SOLVER_URL } from './formats/lisudoku/matcher.spec';

test('detects that it is a lisudoku puzzle', async () => {
  const result = await decodeSudoku(LISUDOKU_SOLVER_URL)
  expect(result).toEqual({
    format: SudokuDataFormat.Lisudoku,
    dataString: LISUDOKU_DATA_STRING,
    constraints: LISUDOKU_CONSTRAINTS,
  })
})

test.todo('detects that it is an f-puzzles puzzle', () => {
})

test('returns error if matcher returns error', async () => {
  const result = await decodeSudoku(LISUDOKU_SOLVER_INVALID_URL)
  expect(result).toEqual({
    error: expect.any(String),
    format: SudokuDataFormat.Lisudoku,
    dataString: '1234',
    constraints: undefined,
  })
})

test('returns error if no matches', async () => {
  const result = await decodeSudoku('foobar')
  expect(result).toEqual({
    error: expect.any(String),
  })
})

test('detects that it is a lisudoku data string', async () => {
  const result = await decodeSudoku(LISUDOKU_DATA_STRING)
  expect(result).toEqual({
    format: SudokuDataFormat.Lisudoku,
    dataString: LISUDOKU_DATA_STRING,
    constraints: LISUDOKU_CONSTRAINTS,
  })
})

test('ignores leading or trailing whitespace', async () => {
  const result = await decodeSudoku(` ${LISUDOKU_SOLVER_URL} `)
  expect(result).toEqual({
    format: SudokuDataFormat.Lisudoku,
    dataString: LISUDOKU_DATA_STRING,
    constraints: LISUDOKU_CONSTRAINTS,
  })
})

test.todo('detects that it is an fpuzzles data string', async () => {
})

test('detects that it is a grid string', async () => {
  const result = await decodeSudoku(GRID_STRING)
  expect(result).toEqual({
    format: SudokuDataFormat.Lisudoku,
    dataString: GRID_STRING,
    constraints: LISUDOKU_GRID_STRING_CONSTRAINTS,
  })
})

test.todo('works with url redirects', async () => {
  // fpuzzles id url
})
