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

// https://logicmastersindia.com/penpa-edit/?m=solve&p=zVZvb9u2E37vT0EQ6Dv+ElHUf2AY0rTdi1+bdU2HojCMgLHVRKj+eJLcpg7az97njnItyx6GDRgw2CaPD8m75468o7vNqvm4Udqjr0kUenwCnfDPTyL+aeA087boyzwTififeFbYu6a2pbhmDSJ9SNXFpr9v2ky8ORP/31S2zTtbq/u+X3fZ+XnZ3BXLynZ93nZFvSrs2bKpzsviU37+87Kp+7zrf7p+5Xt+4Gn1urTLXFixKu6KXnxom0po0TciFUWNLrfLe5FX6/6LWOZlCVD097m4a4uV6BrItndr3H67Xue27UT+YJd9+UU0NZRjDy9pm89P/EuxbMpNVQtbr4R5MKLZ9GVR5ytx2zycPfGf4fucVlcW+0De+U68AUDz3tiI7Jn69cUL9cGWXT6bUwzxW8zmUkslffy0XHyT7gTkN4bTxexx+yZ73N5k88VXtf19LyZ78Tp7RHuVPUoTyGwun0oVKBnJhZJBRICRMEXqAaQERHsg1ASkI4BXBHsg4hXxCAgJAOMdELPZkY7Em+hIWMeIh/b8CRHtmckm7bHeZIywP+EYiY80JxN6WrOei31YtM9OjvUYpoyY7xG2NfJKB1PH9VE4tYvnmLML6FiPi+hYT8QMf1jHcWo+1Pe7Q42VtC3u5s01UqrHuh9+hUcz2PeCd/vcvsUtUVvD7TNuPW5Dbl/ymuew4/up8gMcgo/rGBjlhwgtyWGs/BiUSY41KgDCQHISKj+FcySnqTLa7UWvjO/2olcmcHvRKxMOe40PWwgw20JViRB+kiMPtuAW2wpgC4fJthJl6MqQHs+HLbcXvTJ0dCQblKzA7UUPW8PeCJUrGnhG8DEebMVka+RX7PSjhzzEIUYcxnzigX8M3+OBfwz+8eAvlU09+Kvhrx44a+I8ig8dHcvgqZ1O9Id+6Z1OxFA7X9BDHnzxYZdiC90IIhwIsZkHITHazfCR7WZQvY03zEBwBnnAkdzNGMzQ8fAA52Poyjo7CKYBYR5EUB2AmbOD8PxYltCdgY/ODgKdwBlnB957OAEewAUOizOKO+TvjIYImIGj2sf1fMeX9JLbgNuIL29MBXA2mwchv1PjD71S/yGE6vzwNF41bWVL1PthfNm0dd6Oxnndt7lE6ZddU950m/YDXj+Z8cOhGKs31S22jKGyadb0RB2AxV3dtPnJKQLz1d2p9bdNu5po/2zL8gDo/tjgQT+AlkW7LA+hvi0OxlyoDpDK9vcHwK3t8aeiuy/Wh5oQlEMCvT2kaD/aibVq7/PXmXyQM4m/GGs5mxuciKGnNc22F2r7iyu9uzdYbX/D2/oq217R0zqXXGxRJ3mRD/H5XnzH8yRdDvXbg3zl3oQA4nuI08K9fZ3Nt2+VJFNPWQGJsmo+ga6jQmOQvYVDczkKiZsZ/iMMFqneXzDj3cQJ3mbPm0THm6Qp78Ex4u0O9Oblv0A6XXx1R+L9rT8443fxn71yf1lMHoa0a9qTmQf4RPIBPZlkA36UZ8CPMooMHicV0BN5BXSaWoCOswvgUYIB+5McI63TNCNW00wjU0fJRqbG+TZfzFj6Dg==&q=eyJwaWQiOiJEaWFnb25hbCA5eDkiLCJwdHMiOiI3IC8gNyIsImNpZCI6IlNNMjAyNDAxIiwiaWZyYW1lIjp0cnVlfQ==
const PENPA_CONSTRAINTS_2: PenpaConstraints = {
  rowCount: 10,
  colCount: 10,
  cellSize: 38,
  canvasWidth: 418,
  canvasHeight: 418,
  centerCellIndex: 286,
  space: [1, 0, 1, 0],
  sudoku: [1, 0, 0, 1],
  thermo: [],
  killercages: [],
  arrows: [],
  number: {
    46: ["3", 1, "1"],
    49: ["6", 1, "1"],
    51: ["9", 1, "1"],
    59: ["4", 1, "1"],
    // ... (skipping most)
    151: ["8", 1, "1"],
    159: ["9", 1, "1"],
    161: ["2", 1, "1"],
    164: ["1", 1, "1"],
  },
  numberS: {},
  symbol: {},
  centerlist: [], // skipped, doesn't matter
}

const LISUDOKU_CONSTRAINTS_2: LisudokuConstraints = {
  gridSize: 9,
  fixedNumbers: [
    { position: { row: 0, col: 1 }, value: 3 },
    { position: { row: 0, col: 4 }, value: 6 },
    { position: { row: 0, col: 6 }, value: 9 },
    { position: { row: 1, col: 0 }, value: 4 },
    // ...
    { position: { row: 7, col: 8 }, value: 8 },
    { position: { row: 8, col: 2 }, value: 9 },
    { position: { row: 8, col: 4 }, value: 2 },
    { position: { row: 8, col: 7 }, value: 1 },
  ],
  primaryDiagonal: true,
  secondaryDiagonal: true,
}

// https://logicmastersindia.com/penpa-edit/?m=solve&p=zVZvb9u2E37vT0EQ6Dsu0X9LAoYhTdcB+61dN2coCsMIaJmJtciiJ1GN66D97H2OYn6xbGXDBgwYZJOnh8fnjjzeUW230nedyITviTAVnvDxhKknIj8VUdT/PfdclaZSOfMT9g37X6O3dyWb2fks22XiojNr3eTsR6UMm8nNVhqxNmbb5ufnlb4ti41sjWrasl6V8qzQm/Oq/KjOvyt0bVRrvp29Cbwg8iLxrpKFYpKtytvSsJtGb5jPjGYZK2t0ShZrpjZb84kVqqoAMrNW7LYpV6zVkKXpdfr5crtVsmmZ2snCVJ+YrkGOOVal0fcvgktW6Krb1EzWKxbuQqY7U5W1WrGl3p2xF8Er/C5Wv8Or2libLdvI5g4K96VZw9P7dWkUK8qmqNBhPRIG0Leq6AwW2bvSnrE/ZVli3XdHLK2bChOqUXDecbESI7pbQlPf2PVrNE0/eMauADiipTL3StXYQlpewApZA6NZCmYxBYvXXQPfsJdb3bYlkfaTWyZhtPfyTPz8+rW4kVWrJnO/PxGLyZz7XPAAf58vvvD+OPEvFs4Wk4f9r/nD/jqfLz6L/W9PYvokzvIHtG/zBx6kPJ/zCy4iwRO+EDxMCHj5CEDNt8ofHpWngssGMbye4eQZLoLHSWMDkUcjgeD92q5nM4f7wTgeToGnp3jsj+sn3jg+Jf4Rnmk0rp+S3VM89sJxPBv3P/HG/Un8eNSfxB/fnyTIxvHwGbvxuJ9JTHZH8OQZ/in5P+LnlEI/op8+w//c/mRj+jher+0hC2x7hUMq9qFtX9nWs21s25+szvd0HP1ABAEIwYdeBCGcJBlFNaADQ3LsiyBB0ElOIhFMEWiSp1MRZFgsyRnqMAUaMnoRUlBI9hMRUiBIxwc/nX9rC/yR44/AHzv+GPyJ40/Anzp+lPYg6/nRw5bj98Dv9/zoRUjBtZzE7+xGGfgdTwyew3XFTj/GPtABsHI49IcOgJXhf9zbRQ/Z+ZmSn25dKeymzm4Kuwf7E2TObga7FFwrw+7BuoLM2c1glwJtZdjNyC6C9t6G7tK2kW0TG9IpVaXJZI69PH7i/xZCxdddv291s5EVirB7v9RNrZqDd1w5jeKox7zV1XXbNTe4hnhuq7mwWN1tlpiSm6ZzSKX1lq7BgVp5W+tGjQ4RqFa3Y/pL3ayI/GDgXlbVAGj/6HDZDKA+MQeQacrBu63yA2QjzXoALKXBZ0u7LrdDJuzJ0AEjhy7KO3lkbfO05s8TvuMTjs+YLZ/MQ/pqousuy/cXYv8Drq2De1Hsf8F99ybff6Drbs45gkfFwyqhFKGC/F98b8dJuuxB34P8FnKCexDiB4jDSrZ/l8/3V4KToZd2Ool8oz/C2d4ReoerSyxnzg82pB9xt7azRyXwwvr7ODDidfjkNYm91yQde+2W9W97nS0+9xHx/tY3x+EnxT+r/H9ZSnYu6XQzmneAH1NviI7mmMNP0gz4SUKRwdOcAjqSVkCPMwvQaXIBPMkvYM+kGLEeZxl5dZxoZOok18jUYbrNFxMrfQU=&q=eyJwaWQiOiJLcm9wa2kgOXg5IiwicHRzIjoiOCBwb2ludHMiLCJjaWQiOiJTTTIwMjQwNCIsImlmcmFtZSI6ZmFsc2V9
const PENPA_CONSTRAINTS_3: PenpaConstraints = {
  rowCount: 10,
  colCount: 9,
  cellSize: 38,
  canvasWidth: 418,
  canvasHeight: 418,
  centerCellIndex: 448,
  space: [1, 0, 0, 0],
  sudoku: [0, 0, 0, 0],
  thermo: [],
  killercages: [],
  arrows: [],
  number: {},
  numberS: {},
  symbol: {
    // Only entered Consecutive kropki dots
    437: [8, "circle_SS", 2],
    472: [8, "circle_SS", 2],
    615: [8, "circle_SS", 2],
    670: [8, "circle_SS", 2],
  },
  centerlist: [], // skipped, doesn't matter
}

const LISUDOKU_CONSTRAINTS_3: LisudokuConstraints = {
  gridSize: 9,
  kropkiDots: [
    {
      cell1: { row: 2, col: 6 },
      cell2: { row: 3, col: 6 },
      dotType: KropkiDotType.Consecutive,
    },
    {
      cell1: { row: 5, col: 2 },
      cell2: { row: 6, col: 2 },
      dotType: KropkiDotType.Consecutive,
    },
    {
      cell1: { row: 2, col: 2 },
      cell2: { row: 2, col: 3 },
      dotType: KropkiDotType.Consecutive,
    },
    {
      cell1: { row: 6, col: 5 },
      cell2: { row: 6, col: 6 },
      dotType: KropkiDotType.Consecutive,
    },
  ],
}

test('transformToLisudoku', async () => {
  const penpaConstraintsWithUnimplemented: PenpaConstraints = {
    ...PENPA_CONSTRAINTS,
    thermo: [
      ...PENPA_CONSTRAINTS.thermo,
      [], // empty thermo should be ignored
    ],
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

test('transformToLisudoku - with offsets', async () => {
  const result = transformer.transformToLisudoku(PENPA_CONSTRAINTS_2)

  expect(result.dataString).toEqual(expect.any(String))
  expect(result.url).toContain(result.dataString)

  const decodedConstraints = (await decodeSudoku(result.dataString!)).constraints as LisudokuConstraints
  expect(decodedConstraints).toEqual(LISUDOKU_CONSTRAINTS_2)
})

test('transformToLisudoku - with offset only in 1 dimension', async () => {
  const result = transformer.transformToLisudoku(PENPA_CONSTRAINTS_3)

  expect(result.dataString).toEqual(expect.any(String))
  expect(result.url).toContain(result.dataString)

  const decodedConstraints = (await decodeSudoku(result.dataString!)).constraints as LisudokuConstraints
  expect(decodedConstraints).toEqual(LISUDOKU_CONSTRAINTS_3)
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
