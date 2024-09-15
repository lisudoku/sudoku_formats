import { expect, test } from 'vitest'
import { decodeSudoku } from './decodeSudoku';
import { SudokuDataFormat } from './types';
import { GRID_STRING, LISUDOKU_CONSTRAINTS, LISUDOKU_DATA_STRING, LISUDOKU_GRID_STRING_CONSTRAINTS, LISUDOKU_SOLVER_INVALID_URL, LISUDOKU_SOLVER_URL } from './formats/lisudoku/decoder.spec';
import { FPUZZLES_CONSTRAINTS, FPUZZLES_DATA_STRING, FPUZZLES_URL } from './formats/fpuzzles/decoder.spec';

test('detects that it is a lisudoku puzzle', async () => {
  const result = await decodeSudoku(LISUDOKU_SOLVER_URL)
  expect(result).toEqual({
    format: SudokuDataFormat.Lisudoku,
    dataString: LISUDOKU_DATA_STRING,
    constraints: LISUDOKU_CONSTRAINTS,
  })
})

test('detects that it is an f-puzzles puzzle', async () => {
  const result = await decodeSudoku(FPUZZLES_URL)
  expect(result).toEqual({
    format: SudokuDataFormat.Fpuzzles,
    dataString: FPUZZLES_DATA_STRING,
    constraints: FPUZZLES_CONSTRAINTS,
  })
})

test('returns error if decoder returns error', async () => {
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

test('detects that it is an fpuzzles data string', async () => {
  const result = await decodeSudoku(FPUZZLES_DATA_STRING)
  expect(result).toEqual({
    format: SudokuDataFormat.Fpuzzles,
    dataString: FPUZZLES_DATA_STRING,
    constraints: FPUZZLES_CONSTRAINTS,
  })
})

test('detects that it is a grid string', async () => {
  const result = await decodeSudoku(GRID_STRING)
  expect(result).toEqual({
    format: SudokuDataFormat.Lisudoku,
    dataString: GRID_STRING,
    constraints: LISUDOKU_GRID_STRING_CONSTRAINTS,
  })
})

test('works with url redirects', async () => {
  // The below url redirects to https://f-puzzles.com/?load=N4Igzgl....
  const result = await decodeSudoku('http://tinyurl.com/29ky3dfn')
  expect(result).toEqual({
    format: SudokuDataFormat.Fpuzzles,
    dataString: expect.stringMatching(/^N4Igzgl/),
    constraints: expect.anything(),
  })
})
