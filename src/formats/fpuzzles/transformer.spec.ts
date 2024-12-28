import { expect, test } from 'vitest'
import { FpuzzlesConstraints } from './types';
import { transformer } from './transformer';
import { LisudokuConstraints } from '../lisudoku';
import { KropkiDotType } from '../lisudoku/types';
import { decodeSudoku } from '../../decodeSudoku';

const FPUZZLES_CONSTRAINTS: FpuzzlesConstraints = {
  size: 9,
  grid: [
    [{},{},{},{region:0},{},{},{},{},{}],
    [{},{},{"region":1,"value":1,"given":true},{"value":2,"given":true},{"value":3,"given":true},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{}],
  ],
  "diagonal+":true,
  "diagonal-":true,
  antiknight:true,
  antiking:true,
  extraregion:[{"cells":["R5C2","R5C3","R5C4","R6C3","R6C4","R7C3","R7C4","R7C5","R8C5"]}],
  odd:[{"cell":"R7C1"}],
  even:[{"cell":"R8C1"}],
  thermometer:[{"lines":[["R1C6","R1C7","R1C8","R2C9","R3C9"]]}],
  difference:[{"cells":["R9C4","R9C5"]},{"cells":["R9C6","R9C5"]}],
  ratio:[{"cells":["R9C7","R9C8"]},{"cells":["R9C9","R9C8"]}],
  arrow:[
    {
      lines: [["R4C6","R4C7","R4C8","R5C8","R6C8","R7C8"]],
      cells: ["R4C5","R4C6"]
    }
  ],
  killercage:[{"cells":["R3C1","R3C2","R4C1","R4C2","R5C1","R5C2"],"value":"22"}],
  renban: [{"lines":[["R7C1","R7C2","R6C3","R5C4","R5C5","R4C6","R5C7","R5C8","R6C9"]]}],
  palindrome: [{"lines":[["R1C5","R2C6","R3C7","R3C8"]]}],
  line: [
    {
      lines: [["R7C1","R7C2","R6C3","R5C4","R5C5","R4C6","R5C7","R5C8","R6C9"]],
      outlineC: 'gray',
      width: 0.2,
      isNewConstraint: true,
    },
  ],
}

const LISUDOKU_DATA_STRING = 'N4IghgdgLglg0jCBzEAuKAnArgUwDTjTwQxIAWUamuBYGGA9gO4DOaA2qHY0wMI4AbAW1ScQAYwYC0ANgI80AZgC%2BeUJOmoA7POZLV6qWh0gFqACwGJR7bqZoArFY3G7s5QF0C4mBnECcfiERMRcLN1QVNWtNBwiVD08CHAA3HAgg4Q5DTQAGCK0kkBwAD0wwACUcJBgGCBDQmwBGCMtosIAmVucbRW72my7TPVQnAc0%2B4ftRns0hsxlZpQjF8bRzFaXwqeNPLxAAMxgSnAATADksAFsAIxwMENAABwYWGFg6tBy0eZGm1RAKTAAlwaH%2B0Rebw%2BEC%2BMWWO1Q4MBwNBqA6Vkh71qMNQ322ZiRQJBOH0%2ByQGBgpwAyjAAF4k1AATgIAGsYEJ7rwwEgcI9TNVsdk4ah8gj0WtERFxXjRWYoniWgj5cLZSM2gruvsWNcfuj9izGE82QARBhQPniQQCJqwsKTMwADgBlqEHVtNg2CKdBFOZoAKgBPJ4MkC8OosHDiLCwNIgZxWm244VxL3Oq1upNhT2OgG%2BqCB4NoUPhyPRmCx%2BNCRN4uSp7zp92aEw5n3%2BoMh01YG4BOPtBONtAOiLeiQNzM2ZsjEd5gsdhhdntFBinU6ZC02VXTRb7J7AxCnRhXXkcRqabMjXJbFMEra1szS4WT6Z6ncUq50APGmDcurAqjYfB%2BRqcMTxlCJLwlRUzAgvFfmmGDhXtC8tk3MEtigv4UKldDsIlOCfiSU91nAq8SLwiJwTxJDpko4Vzxo0iEVou1cLxeiCIla8Rj1PAiNQO9kIlJ80AQsIhwRUSbAEhihIorZxJvCVpI4vFhLReTsK8PjUMiHClS2fDdIlHT1WFDDplMzp%2BjAhExg1WyDIiJwtKo%2BItnYoy8S46ZlRYhFLI9azkyCvyzDsuinMYsLCJrNzZP0iUFJGXypJCic0s0JKLNvSL4uixLIpclVNkgkrYLK4qEUKUqqsc2rjOHPSW3K1MitCkZVjYiqwm89wJWo3YJQ86qvIKLYBtQb0urrUbWt42KEU6x9upsLK%2BoWswRuW%2Bq8TW7Qcpm7bmuFPanQ8fYMHSG5IAaGyFiajq6vy1z%2FPcjLHDija1S2NSAsywqtUjOpTg%2FL8fwgP90AAggoDIe4rleUDgokg7oJ%2BsjdrkgqxT2ZQgA'
const LISUDOKU_SOLVER_URL = `https://lisudoku.xyz/solver?import=${LISUDOKU_DATA_STRING}`
const LISUDOKU_CONSTRAINTS: LisudokuConstraints = {
  gridSize: 9,
  fixedNumbers: [
    { position: { row: 1, col: 2 }, value: 1 },
    { position: { row: 1, col: 3 }, value: 2 },
    { position: { row: 1, col: 4 }, value: 3 },
  ],
  regions: [
    [
      { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 },
      { row: 1, col: 0 }, { row: 1, col: 1 },
      { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 },
    ],
    [
      { row: 0, col: 4 }, { row: 0, col: 5 },
      { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }, { row: 1, col: 5 },
      { row: 2, col: 3 }, { row: 2, col: 4 }, { row: 2, col: 5 },
    ],
    [
      { row: 0, col: 6 }, { row: 0, col: 7 }, { row: 0, col: 8 },
      { row: 1, col: 6 }, { row: 1, col: 7 }, { row: 1, col: 8 },
      { row: 2, col: 6 }, { row: 2, col: 7 }, { row: 2, col: 8 },
    ],
    [
      { row: 3, col: 0 }, { row: 3, col: 1 }, { row: 3, col: 2 },
      { row: 4, col: 0 }, { row: 4, col: 1 }, { row: 4, col: 2 },
      { row: 5, col: 0 }, { row: 5, col: 1 }, { row: 5, col: 2 },
    ],
    [
      { row: 3, col: 3 }, { row: 3, col: 4 }, { row: 3, col: 5 },
      { row: 4, col: 3 }, { row: 4, col: 4 }, { row: 4, col: 5 },
      { row: 5, col: 3 }, { row: 5, col: 4 }, { row: 5, col: 5 },
    ],
    [
      { row: 3, col: 6 }, { row: 3, col: 7 }, { row: 3, col: 8 },
      { row: 4, col: 6 }, { row: 4, col: 7 }, { row: 4, col: 8 },
      { row: 5, col: 6 }, { row: 5, col: 7 }, { row: 5, col: 8 },
    ],
    [
      { row: 6, col: 0 }, { row: 6, col: 1 }, { row: 6, col: 2 },
      { row: 7, col: 0 }, { row: 7, col: 1 }, { row: 7, col: 2 },
      { row: 8, col: 0 }, { row: 8, col: 1 }, { row: 8, col: 2 },
    ],
    [
      { row: 6, col: 3 }, { row: 6, col: 4 }, { row: 6, col: 5 },
      { row: 7, col: 3 }, { row: 7, col: 4 }, { row: 7, col: 5 },
      { row: 8, col: 3 }, { row: 8, col: 4 }, { row: 8, col: 5 },
    ],
    [
      { row: 6, col: 6 }, { row: 6, col: 7 }, { row: 6, col: 8 },
      { row: 7, col: 6 }, { row: 7, col: 7 }, { row: 7, col: 8 },
      { row: 8, col: 6 }, { row: 8, col: 7 }, { row: 8, col: 8 },
    ],
  ],
  extraRegions: [
    [
      { row: 4, col: 1 }, { row: 4, col: 2 }, { row: 4, col: 3 },
      { row: 5, col: 2 }, { row: 5, col: 3 },
      { row: 6, col: 2 }, { row: 6, col: 3 }, { row: 6, col: 4 }, { row: 7, col: 4 },
    ],
  ],
  thermos: [
    [{ row: 0, col: 5 }, { row: 0, col: 6 }, { row: 0, col: 7 }, { row: 1, col: 8 }, { row: 2, col: 8 }],
  ],
  arrows: [
    {
      circleCells: [{ row: 3, col: 4 }, { row: 3, col: 5 }],
      arrowCells: [
        { row: 3, col: 6 }, { row: 3, col: 7 }, { row: 4, col: 7 },
        { row: 5, col: 7 }, { row: 6, col: 7 },
      ],
    },
  ],
  killerCages: [{"sum":22,"region":[{"row":2,"col":0},{"row":2,"col":1},{"row":3,"col":0},{"row":3,"col":1},{"row":4,"col":0},{"row":4,"col":1}]}],
  kropkiDots:[
    {dotType: KropkiDotType.Consecutive, cell1:{"row":8,"col":3},cell2:{"row":8,"col":4}},
    {dotType: KropkiDotType.Consecutive, cell1:{"row":8,"col":5},cell2:{"row":8,"col":4}},
    {dotType: KropkiDotType.Double, cell1:{"row":8,"col":6},cell2:{"row":8,"col":7}},
    {dotType: KropkiDotType.Double, cell1:{"row":8,"col":8},"cell2":{"row":8,"col":7}},
  ],
  primaryDiagonal: true,
  secondaryDiagonal: true,
  antiKnight: true,
  antiKing: true,
  oddCells: [{ row: 6, col: 0 }],
  evenCells: [{ row: 7, col: 0 }],
  renbans: [[
    { row: 6, col: 0 }, { row: 6, col: 1 }, { row: 5, col: 2 },
    { row: 4, col: 3 }, { row: 4, col: 4 }, { row: 3, col: 5 },
    { row: 4, col: 6 }, { row: 4, col: 7 }, { row: 5, col: 8 },
  ]],
  palindromes: [
    [{ row: 0, col: 4 }, { row: 1, col: 5 }, { row: 2, col: 6 }, { row: 2, col: 7 }],
  ],
}

test('transformToLisudoku', () => {
  const fpuzzlesConstraintsWithUnimplemented = {
    ...FPUZZLES_CONSTRAINTS,
    disjointgroups: true,
  }
  const result = transformer.transformToLisudoku(fpuzzlesConstraintsWithUnimplemented)
  expect(result).toEqual({
    constraints: LISUDOKU_CONSTRAINTS,
    dataString: LISUDOKU_DATA_STRING,
    url: LISUDOKU_SOLVER_URL,
    warning: 'Ignored some constraints: disjointgroups',
  })
})

test('transformFromLisudoku', async () => {
  const result = transformer.transformFromLisudoku(LISUDOKU_CONSTRAINTS)
  expect(result).toEqual({
    constraints: FPUZZLES_CONSTRAINTS,
    dataString: expect.any(String),
    url: expect.stringContaining(result.dataString!),
  })
  expect((await decodeSudoku(result.dataString!)).constraints).toEqual(FPUZZLES_CONSTRAINTS)
})
