import { expect, test } from 'vitest'
import { decoder } from './decoder'
import { LisudokuConstraints } from './types';

export const LISUDOKU_DATA_STRING = 'N4Ig5gTglgJgylAXgUxALgJwBoQDMoAeyMAcgK4C2ARshAM7oDaoADgPZ1QAuUbAdulAQ2Ad3QBGHAGM2AG3QBWAL44AbgENZZVGgDsK1h268BaIaInS56AGwqQGrToAcBkO049%2BgkMLFpJEBl5PXtHbXQMJQBdHAhkMBMGNEZmXws0AAYrEMy3P3RsoOsA%2FIyi4PQAJjL%2FQMqs2stikPEmgJzq9vqSgGZ2qs7GrHN%2FQZaJGKw0gqyh%2FpH0%2FwqSgBZ2lZDlRdmekPWdjL3FAaGaw7H504m0A9HqoeVYmfKhuwvCof0PuZvXH%2BOaHe9w6N2%2BIMB%2FxB4wawKWDzB1warmeIN6QzyP3RNzaWLO7VWGIJQ1xIMJN3OIIURJ%2B1Jx7TpDRqqPhaGxDQWaKGd1Z7JK2zJVx%2B5IaPNmIv5DKFVO5UpuT2mXJucNmfJC4N5QyhrIlIRVGV16A14q1cthZpKxoyjJKKMVrJsNJBjvpPxdTPauidrK9rpBvo9P2c3tmwb9rLDHpZs3dfXasf28cenulPtlPwDkqDqdD6ZBkcl0YyCdsScRbtNGbeKfL%2Fsr%2Ber2drEdN0ViIGQBC4EHUACUEkkmC9%2FDbWhaQpSHSSy4G6%2BHZpmJzWOcu1u0CyF%2Bm2cFwABa0CgcIdK2c6%2FHCnPWy8j2XbkDqCB%2BZJpKRQCBSWTIADCyFksmfc7mlWiLtg%2Bfg%2Fn%2BAFpn8M62uO6DaiaMEXiBUzuNAFAPgAngAIlA6hgPwmjoN22g4HQyAyHwMDYXhBFESEpHIDg6h8DwADSfBQGAu5cCREBkfebFQOxUB8GA%2FGCWwMAwBB%2F5MBC07tsgqjIHwclQbsRLtvEfBUKxz7DgiDQCpqyrEuZKEmTE0RKEAA%3D%3D%3D'
export const LISUDOKU_SOLVER_URL = `https://lisudoku.xyz/solver?import=${LISUDOKU_DATA_STRING}`
export const LISUDOKU_CONSTRAINTS: LisudokuConstraints = {
  gridSize: 9,
  fixedNumbers: [
    { position: { row: 1, col: 5 }, value: 7 },
    { position: { row: 1, col: 6 }, value: 8 },
    { position: { row: 1, col: 7 }, value: 9 },
  ],
  regions: [
    [
      { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 },
      { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 },
      { row: 2, col: 0 }, { row: 2, col: 1 },
    ],
    [
      { row: 0, col: 3 }, { row: 0, col: 4 }, { row: 0, col: 5 },
      { row: 1, col: 4 }, { row: 1, col: 5 },
      { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }, { row: 2, col: 5 },
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
      { row: 5, col: 1 }, { row: 5, col: 2 },
      { row: 6, col: 1 }, { row: 6, col: 2 },
      { row: 7, col: 1 }, { row: 7, col: 2 }, { row: 7, col: 3 }, { row: 7, col: 4 },
      { row: 8, col: 3 },
    ],
  ],
  thermos: [
    [{ row: 3, col: 2 }, { row: 4, col: 2 }, { row: 4, col: 3 }, { row: 5, col: 3 }, { row: 5, col: 4 }],
  ],
  arrows: [
    {
      circleCells: [{ row: 7, col: 6 }, { row: 7, col: 7 }],
      arrowCells: [
        { row: 7, col: 8 }, { row: 6, col: 8 }, { row: 5, col: 8 },
        { row: 4, col: 8 }, { row: 4, col: 7 },
      ],
    },
  ],
  primaryDiagonal: true,
  secondaryDiagonal: true,
  antiKnight: true,
  antiKing: true,
  oddCells: [{ row: 1, col: 1 }],
  evenCells: [{ row: 1, col: 0 }],
  renbans: [
    [{ row: 2, col: 5 }, { row: 3, col: 6 }, { row: 4, col: 6 }, { row: 4, col: 5 }],
  ],
}
const LISUDOKU_SOLVER_INVALID_URL = 'https://lisudoku.xyz/solver?import=1234'
const GRID_STRING = '000000000000000010000000200000003000000040000000500000000000000000000000000000000'
const LISUDOKU_SOLVER_GRID_STRING = `https://lisudoku.xyz/solver?import=${GRID_STRING}`
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
const LISUDOKU_DB_PUZZLE_URL = 'https://lisudoku.xyz/p/uWwScbyWCyHXi2kbL3LY'

const LISUDOKU_MIN_URL = 'https://lisudoku.xyz/e?import=N4Ig5gTglgJgylAXgUxALgJwBoQAdoC2AhhAJ4AiURYA9gHZEA26ALhAK7IC%2BQA%3D'
const LISUDOKU_MIN_CONSTRAINTS: LisudokuConstraints = {
  gridSize: 9,
  primaryDiagonal: true,
}

test('detects lisudoku puzzle with solver url', async () => {
  const result = await decoder.run(LISUDOKU_SOLVER_URL)
  expect(result).toEqual({
    matched: true,
    dataString: LISUDOKU_DATA_STRING,
    constraints: LISUDOKU_CONSTRAINTS,
  })
})

test('detects lisudoku data string', async () => {
  const result = await decoder.run(LISUDOKU_DATA_STRING)
  expect(result).toEqual({
    matched: true,
    dataString: LISUDOKU_DATA_STRING,
    constraints: LISUDOKU_CONSTRAINTS,
  })
})

test('detects lisudoku solver url with grid string', async () => {
  const result = await decoder.run(LISUDOKU_SOLVER_GRID_STRING)
  expect(result).toEqual({
    matched: true,
    dataString: GRID_STRING,
    constraints: LISUDOKU_GRID_STRING_CONSTRAINTS,
  })
})

test('detects grid string', async () => {
  const result = await decoder.run(GRID_STRING)
  expect(result).toEqual({
    matched: true,
    dataString: GRID_STRING,
    constraints: LISUDOKU_GRID_STRING_CONSTRAINTS,
  })
})

test('detects lisudoku puzzle by id', async () => {
  const result = await decoder.run(LISUDOKU_DB_PUZZLE_URL)
  expect(result).toEqual({
    matched: true,
    dataString: '',
    constraints: expect.objectContaining({ gridSize: 9 }),
  })
})

test('handles invalid id gracefully', async () => {
  const result = await decoder.run(LISUDOKU_DB_PUZZLE_URL + 'invalid_id')
  expect(result).toEqual({
    matched: true,
    dataString: '',
    error: expect.stringContaining('not found'),
  })
})

test('invalid lisudoku data should return error', async () => {
  const result = await decoder.run(LISUDOKU_SOLVER_INVALID_URL)
  expect(result).toEqual({
    matched: true,
    dataString: '1234',
    error: expect.any(String),
  })
})

test('invalid lisudoku url should not match', async () => {
  const result = await decoder.run('https://abc.xyz/solver?import=1234')
  expect(result).toEqual({
    matched: false,
  })
})

test('invalid lisudoku constraints schema should return error', async () => {
  // data string contains the json {"x":3}
  const result = await decoder.run('https://lisudoku.xyz/solver?import=N4IgHiBcDMC+Q%3D%3D%3D')
  expect(result).toEqual({
    matched: true,
    dataString: 'N4IgHiBcDMC+Q%3D%3D%3D',
    error: expect.any(String),
  })
})

test('works without regions', async () => {
  const result = await decoder.run(LISUDOKU_MIN_URL)
  expect(result).toEqual({
    matched: true,
    constraints: LISUDOKU_MIN_CONSTRAINTS,
    dataString: expect.any(String),
  })
})
