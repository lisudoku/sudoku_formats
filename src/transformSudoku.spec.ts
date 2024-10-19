import { expect, test } from 'vitest'
import { SudokuDataFormat } from './types';
import { LisudokuConstraints } from './formats/lisudoku';
import { FpuzzlesConstraints } from './formats/fpuzzles';
import { transformSudoku } from './transformSudoku';

const GRID_STRING = '000000000000000010000000200000003000000040000000500000000000000000000000000000000'
const LISUDOKU_GRID_STRING_SOLVER_URL = `https://lisudoku.xyz/solver?import=${GRID_STRING}`
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

const LISUDOKU_DATA_STRING = 'N4Ig5gTglgJgylAXgUxALgJwBoQDMoAeyMAcgK4C2ARshAM7oDaoADgPZ1QAuUbAdulAQ2Ad3QAGHAGM2AGwkBfHADcAhrLKo0ARgUBdHC2gVVEAJ4ARKKrD916LhE05VfHgGkofMA6fIcbDAwAMLIsrIMaMwgwmI60nLoAKz6CkA%3D%3D%3D'
const LISUDOKU_SOLVER_URL = `https://lisudoku.xyz/solver?import=${LISUDOKU_DATA_STRING}`
const LISUDOKU_CONSTRAINTS: LisudokuConstraints = {
  gridSize: 9,
  fixedNumbers: [
    { position: { row: 0, col: 0 }, value: 1 },
  ],
  primaryDiagonal: true,
  antiKing: true,
  oddCells: [{ row: 1, col: 5 }],
}

const FPUZZLES_DATA_STRING = 'N4IgzglgXgpiBcBOANCA5gJwgEwQbT1ADcBDAGwFc54BGVNCImAOwQBcMqBfZYHv3vyGCRfALrJCwgTOlyJU0XKVKFsles1c1yrRu2S9R+Yd1nVp/Vdk7r58RJDYIJNAHtm5ALTtOMVCTMbBAA1hDMaL5UqG7YuPCEIADGMGRkCCAASgBMAMIAbCDaXEA==='
const FPUZZLES_URL = `https://f-puzzles.com/?load=${FPUZZLES_DATA_STRING}`
export const FPUZZLES_CONSTRAINTS: FpuzzlesConstraints = {
  size: 9,
  grid: [
    [{value: 1, given: true},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{}],
  ],
  "diagonal-":true,
  antiking:true,
  odd:[{"cell":"R2C6"}],
}

test('gridstring->lisudoku', () => {
  const result = transformSudoku({
    constraints: GRID_STRING,
    fromFormat: SudokuDataFormat.GridString,
    toFormat: SudokuDataFormat.Lisudoku,
  })
  expect(result).toEqual({
    constraints: LISUDOKU_GRID_STRING_CONSTRAINTS,
    dataString: GRID_STRING,
    url: LISUDOKU_GRID_STRING_SOLVER_URL,
  })
})

test('lisudoku->gridstring', () => {
  const result = transformSudoku({
    constraints: LISUDOKU_GRID_STRING_CONSTRAINTS,
    fromFormat: SudokuDataFormat.Lisudoku,
    toFormat: SudokuDataFormat.GridString,
  })
  expect(result).toEqual({
    constraints: GRID_STRING,
    dataString: GRID_STRING,
    url: LISUDOKU_GRID_STRING_SOLVER_URL,
  })
})

test('fpuzzles->lisudoku without warning', () => {
  const result = transformSudoku({
    constraints: FPUZZLES_CONSTRAINTS,
    fromFormat: SudokuDataFormat.Fpuzzles,
    toFormat: SudokuDataFormat.Lisudoku,
  })
  expect(result).toEqual({
    constraints: LISUDOKU_CONSTRAINTS,
    dataString: LISUDOKU_DATA_STRING,
    url: LISUDOKU_SOLVER_URL,
  })
})

test('fpuzzles->lisudoku with warning', () => {
  const fpuzzlesConstraintsWithUnimplemented = {
    ...FPUZZLES_CONSTRAINTS,
    disjointgroups: true,
  }
  const result = transformSudoku({
    constraints: fpuzzlesConstraintsWithUnimplemented,
    fromFormat: SudokuDataFormat.Fpuzzles,
    toFormat: SudokuDataFormat.Lisudoku,
  })
  expect(result).toEqual({
    constraints: LISUDOKU_CONSTRAINTS,
    warning: expect.stringContaining('disjointgroups'),
    dataString: LISUDOKU_DATA_STRING,
    url: LISUDOKU_SOLVER_URL,
  })
})
