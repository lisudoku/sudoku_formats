import { expect, test } from 'vitest'
import { PenpaConstraints } from './types';
import { transformer } from './transformer';
import { LisudokuConstraints } from '../lisudoku';
import { KropkiDotType } from '../lisudoku/types';
import { decodeSudoku } from '../../decodeSudoku';

// https://swaroopg92.github.io/penpa-edit/#m=solve&p=vVZLb9tGEL7rVwR7ngLcB5dc3tL0cUmdpnIRGIRg0DYTC6HMlJKagIbz2/PN7lImRQZFLgUlaubb5TcP7sxof7xrPx7J4dI5JSRx6Tzx39zwRwJl/HJ7aOriBb08Hu7bDgLRmwt6XzX7elXyFlybVSmkIKHwlWLztV9/LYUguVk99n8Vj/11UW6eqP/7WcyfxXXxiPtF8SiMFoUnkp6GhDEMgPUEpAzoAcBzEs/lTjH8QvFOBq8AysQC1CRut91tU1+/FqTAIKUL8P6fY9WdYGMTwPlp93odcGuYeglnX5dw9lAt4OzNOQ5Xf/PRK3+/LMpSa9KGdErGkVWbDfUaaKYo05ThxWQkE7wWqXnpF2SQ+sTfU39/7Yl+5fhzS9IhWBhVUpFS8IxllZLSeZDx7lUqg5xKUhYJZ9kaUlkW5Cwj5ZAdlh1OSILIIcvckUqQHcYT8MvIL8GvIr8Cv4n8Bvxp5E/BbyO/BX8e+XH6lAv8+IUtZM3zsP8RVxpy5FHgGcelhv0WcuRX4B/7o2JOFPzX0a6GXR39tJyHGJeFXRvtWtgd58dGuxZ2bbRrYXccl412LezaaNfCbhbsylzjHWE/3o+AgCTCCVYghMi84l8ZHveKxvMpfPJKyk5FgpDJgSAHgRsIXIpcDgQJipsrJtiBxwmiCnbgpkQoXjHICect2EEiDJwOdhB9OhBkHPJAkIMgiwQa5xTAEBy8lpxVHM93/pC+CpVLueOnE4oKR+YVDYWpvGLIcTMIisUKx+yVDApH5hX0MxMV7IcSCSCQG9iwhRyfeq/g2KOiBg3czrHPXnG8xIF6LcdSJOcneC06y7tOKkIzPkCLwsVBT1PCi8EJ4NYquWwzbnyrVYl0o+v63stXOtOm1/+J/CQThxtJgzvaOzq52LfN9f7Yva9ua1H4AYAuCuzhuLupuwnUtO2nZvsw3bf98NB29eISg/Xdh6X9N213d8b+uWqaCRB6+QQKfXYCHbrtRK+6rv08QXbV4X4C3FQHTL/9/fbTlKl+OEwdOFRTF6uP1Zm13XPMTyvxRfgvBpEkw2PSFf1b6n8P828YpNS/xZz8o+iveEyGkco93m/CWEGjP4nv/DpLr+IQTSBfsMwK5CvI07HU/1mUPWYhW/rZP8+i2LX/wlU/Z71+2+5uEEwpRukIK+FvxDC1eZ69DA6vFxzWzw6zGBxmaeZwcG7kL6Y0E7G7l991lxP3A+66zVN4EckP/UsJ/znCn4z5/A7z+r9G89AM+zfjbjhuHKcu8SUWXtst1h7ghfIDulhmEZ9VGvBZTbHBeVkBXagsoOfFBWheXwBnJQbsO1XGrOeFxl6d1xqbmpUbmxpXHDqYl74B
const PENPA_CONSTRAINTS: PenpaConstraints = {
  rowCount: 9,
  colCount: 9,
  cellSize: 38,
  canvasWidth: 380,
  canvasHeight: 380,
  centerCellIndex: 84,
  space: [0, 0, 0, 0],
  sudoku: [1, 0, 0, 1],
  thermo: [[33, 34, 35, 49, 62]],
  // Commented until killer cage is fixed
  // killercages: [[54, 55, 67, 68, 80, 81]],
  killercages: [],
  arrows: [[72, 73, 74, 87, 100, 113]],
  number: {
    43: ["1", 1, "1"],
    44: ["2", 1, "1"],
    45: ["3", 1, "1"],
  },
  numberS: {
    // Commented until killer cage is fixed
    // 892: [" 22", 1],
  },
  symbol: {
    106: [3, "circle_L", 2],
    119: [3, "square_L", 2],
    460: [8, "circle_SS", 2],
    642: [8, "circle_SS", 2],
    643: [8, "circle_SS", 2],
    645: [2, "circle_SS", 2],
    646: [2, "circle_SS", 2],
  },
  centerlist: [28,1,3,1,1,1,1,5,1,3,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,-109,-1,14,-1],
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
  thermos: [
    [{ row: 0, col: 5 }, { row: 0, col: 6 }, { row: 0, col: 7 }, { row: 1, col: 8 }, { row: 2, col: 8 }],
  ],
  arrows: [
    {
      circleCells: [{ row: 3, col: 5 }],
      arrowCells: [
        { row: 3, col: 6 }, { row: 3, col: 7 }, { row: 4, col: 7 },
        { row: 5, col: 7 }, { row: 6, col: 7 },
      ],
    },
  ],
  // Commented until killer cages are fixed
  // killerCages: [{"sum":22,"region":[{"row":2,"col":0},{"row":2,"col":1},{"row":3,"col":0},{"row":3,"col":1},{"row":4,"col":0},{"row":4,"col":1}]}],
  kropkiDots:[
    {dotType: KropkiDotType.Consecutive, cell1:{"row":7,"col":3},cell2:{"row":8,"col":3}},
    {dotType: KropkiDotType.Consecutive, cell1:{"row":8,"col":3},cell2:{"row":8,"col":4}},
    {dotType: KropkiDotType.Consecutive, cell1:{"row":8,"col":5},cell2:{"row":8,"col":4}},
    {dotType: KropkiDotType.Double, cell1:{"row":8,"col":6},cell2:{"row":8,"col":7}},
    {dotType: KropkiDotType.Double, cell1:{"row":8,"col":8},"cell2":{"row":8,"col":7}},
  ],
  primaryDiagonal: true,
  secondaryDiagonal: true,
  oddCells: [{ row: 6, col: 0 }],
  evenCells: [{ row: 7, col: 0 }],
}

test('transformToLisudoku', async () => {
  const penpaConstraintsWithUnimplemented = {
    ...PENPA_CONSTRAINTS,
    killercages: [[123]],
  }
  const result = transformer.transformToLisudoku(penpaConstraintsWithUnimplemented)

  expect(result.dataString).toEqual(expect.any(String))
  expect(result.url).toContain(result.dataString)
  expect(result.warning).toContain('killercages')

  const decodedConstraints = (await decodeSudoku(result.dataString!)).constraints as LisudokuConstraints
  expect(decodedConstraints).toEqual({
    ...LISUDOKU_CONSTRAINTS,
    kropkiDots: expect.any(Array),
  })
  expect(decodedConstraints.kropkiDots).toHaveLength(LISUDOKU_CONSTRAINTS.kropkiDots!.length)
  expect(decodedConstraints.kropkiDots![0]).toEqual(LISUDOKU_CONSTRAINTS.kropkiDots![0])
  expect(decodedConstraints.kropkiDots![3]).toEqual(LISUDOKU_CONSTRAINTS.kropkiDots![3])
})

test('transformFromLisudoku', async () => {
  const lisudokuConstraintsWithUnimplemented: LisudokuConstraints = {
    ...LISUDOKU_CONSTRAINTS,
    killerCages: [{ sum: 3, region: [{ row: 0, col: 0 }] }],
  }
  const result = transformer.transformFromLisudoku(lisudokuConstraintsWithUnimplemented)

  expect(result.constraints).toEqual({
    ...PENPA_CONSTRAINTS,
    centerlist: expect.any(Array), // could check that the numbers are the same, but meh
  })

  expect(result.dataString).toEqual(expect.any(String))
  expect(result.url).toContain(result.dataString)
  expect(result.warning).toContain('killerCages')

  const decodedConstraints = (await decodeSudoku(result.dataString!)).constraints
  expect(decodedConstraints).toEqual({
    ...PENPA_CONSTRAINTS,
    centerlist: expect.any(Array),
  })
})
