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
}

const LISUDOKU_DATA_STRING = 'N4Ig5gTglgJgylAXgUxALgJwBoQDMoAeyMAcgK4C2ARshAM7oDaoADgPZ1QAuUbAdulAQ2Ad3QBGHAGM2AG3QAmAL44AbgENZZVGnErWHbrwFohoidLnoAzCpAatO5VgOce%2FQSGFjdl%2BWgAWOwdtGyUAXRwIZDBjBjRGZi9zNAAGP3RU%2FWSfdJAZfz0XHMyMtGczXLLbYu8LfKs07LrfBsLmlIUyrNrOsqLKxTLlSKSWvIL0IN6qtvQAVg6fSTnypfrJtBrB1s3pnZXNxZmh1e2S8rL9i67VxdGdicaANnW0soB2N6f%2FAA43w4vAGfYGrf4nS6rV4Q26bL4wsr%2FB4XazdN6o1YDFHDN4BNEQvGY3E4iHzfE7MlE0k45EtDGbc50q7osrHHaEhnE1bXFocxpsi6UznU7lvIX8iJYMYpelAiGy%2FzwnYK9Dg9llaHq1ZKi58v5ijUG7VGzZIqU7Z7ki6WqkWkk7D5WlqO20XF2bCoXX5OlLe10tP0eyXSnw24V20UQsMSiHuxqMlJx%2Fw8xOst6B%2BPp5kQjP%2Be7m62GqMg4tgt5J9Cat0lh2IrNQ%2BtwxuNJGREDIAhcCDqABKMTiTBDU36XKDBOqJsanpa4v8CdD9sLZze0eT5eZ4TbXAAFrQKBxB480xCfpXvjWLoD9Qiy5ucOoIN54kkpFAIFJZMgAMLIWSyZ%2FKtmgF3JKIAPt4P5%2FgB2INvKF68vBKSzugOotKuKERKBLDQBQD4AJ4ACJQOoYD8Jo6BdtoOB0MgMh8DA%2BFESRZH%2BJRyD3nwPAANJ8FAYDblwFEQFRYGcVAXFQHwYBCSJADWUB%2FrQX4kcg0F0JQii3NEsQeAkOywo0PT6SOcGrEZMGbFiCFmaOjR6OEoGycILDyQRbBcNBMDuQAKnhLA6CAX78DRUhkDwqioNIv6yOIngBhOUV%2FgocW%2Bsy2ReVwvn%2BeggXBbRYVQBFICJTFKU%2BLmCx2FI0XJaYXppcUGVZQFblkFQn7Ffk0WxXV8WwV1SVlaqILpT5fktWwbUdSVPU7BVaDggNsi1XNI1tmwMAwJB%2F5MBGmxZG2yARXw23Qc6aIOUAA%3D%3D%3D'
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
  kropkiNegative: false,
  primaryDiagonal: true,
  secondaryDiagonal: true,
  antiKnight: true,
  antiKing: true,
  oddCells: [{ row: 6, col: 0 }],
  evenCells: [{ row: 7, col: 0 }],
  topBottom: false,
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
