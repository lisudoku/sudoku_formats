import { expect, test } from 'vitest'
import { decodeSudoku } from './decodeSudoku';
import { SudokuDataFormat } from './types';
import { LISUDOKU_CONSTRAINTS, LISUDOKU_DATA_STRING, LISUDOKU_SOLVER_URL } from './formats/lisudoku/decoder.spec';
import { FPUZZLES_CONSTRAINTS, FPUZZLES_DATA_STRING, FPUZZLES_URL } from './formats/fpuzzles/decoder.spec';
import { LisudokuConstraints } from './formats/lisudoku';

const LISUDOKU_SOLVER_INVALID_URL = 'https://lisudoku.xyz/solver?import=1234'
const GRID_STRING = '000000000000000010000000200000003000000040000000500000000000000000000000000000000'
const LISUDOKU_GRID_STRING_CONSTRAINTS: LisudokuConstraints = {
  gridSize: 9,
  fixedNumbers: [
    { position: { row: 1, col: 7 }, value: 1 },
    { position: { row: 2, col: 6 }, value: 2 },
    { position: { row: 3, col: 5 }, value: 3 },
    { position: { row: 4, col: 4 }, value: 4 },
    { position: { row: 5, col: 3 }, value: 5 },
  ],
}

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
