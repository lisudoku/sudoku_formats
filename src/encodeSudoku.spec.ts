import { expect, test } from 'vitest'
import { SudokuDataFormat } from './types';
import { encodeSudoku } from './encodeSudoku';
import { ensureDefaultRegions } from './formats/lisudoku/utils';
import { LisudokuConstraints } from './formats/lisudoku';
import { FpuzzlesConstraints } from './formats/fpuzzles';

const LISUDOKU_DATA_STRING = 'N4IghgdgLglg0jCBzEAuKAnArgUwDQgBmMAHjgCYByWAtgEY4YDOaA2qAA4D2TMsXENKADGXADZoADAQxcA7lIC%2BBAG5gxuNAEZFAXQJIMMcgGUYALxxoAnAS7lyAYRxixLVOxCiJqAKwz5bT0CDiMaMAwATwARGDAkAXU0TFxFIA%3D%3D%3D'
const LISUDOKU_SOLVER_URL = `https://lisudoku.xyz/solver?import=${LISUDOKU_DATA_STRING}`
const LISUDOKU_CONSTRAINTS: LisudokuConstraints = {
  gridSize: 9,
  fixedNumbers: [
    { position: { row: 0, col: 0 }, value: 1 },
  ],
  regions: ensureDefaultRegions(9),
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

test('encodes a lisudoku puzzle', () => {
  const result = encodeSudoku({ constraints: LISUDOKU_CONSTRAINTS, format: SudokuDataFormat.Lisudoku })
  expect(result).toEqual({
    dataString: LISUDOKU_DATA_STRING,
    url: LISUDOKU_SOLVER_URL,
  })
})

test('encodes an f-puzzles puzzle', () => {
  const result = encodeSudoku({ constraints: FPUZZLES_CONSTRAINTS, format: SudokuDataFormat.Fpuzzles })
  expect(result).toEqual({
    dataString: FPUZZLES_DATA_STRING,
    url: FPUZZLES_URL,
  })
})
