import { expect, test } from 'vitest'
import { LisudokuConstraints } from './types';
import { transformer } from './transformer';

export const LISUDOKU_DATA_STRING = 'N4IghgdgLglg0jCBzEAuKAnArgUwDTjTwQxIAWUamuBYGGA9gO4DOaA2qHY0wMI4AbAW1ScQAYwYC0ADgI80AdgC%2BeUJOmo5IBagBsq9VNnzmaAKyGJxraaZoALFY1K7j5QF0C4mBnECcfiERMRd9N1QVNWtNRQiVD08CHAA3HAgg4Q4jTQAGCIBGJJAcAA9MMAAlHCQYBggQ0JsCiMtosIAmVudmiIN2my6dM30ezRbh%2B0ixtCHdKJy0AGZ4mdQHVYHNFcnZTy8QADMYUpwAEwA5LABbACMcDBDQAAcGFhhYerRF1HNC1RAKTAAlwSisr3enwg3xiaD0%2FwIQJBOD20QhHzq0NQPziu1QRURwNBqAAnMUkBgYGcAMowABeKNJBAYZzOmSesPx%2FwOz0p1zoAE8ACIwMBIerAqjYfA6GqYxo%2FfJ43JrCa6FVbWYRDWKhE%2FNUjAk%2FOaGtY7XRGzlK3QdVURW1eJrbbVrDbKtZ%2Fd2a9Z6zmei1rE1TW3e80jEM%2FN02j32pJOuEu7249VrbQp73wvGWsLJ03etN5n6Z6NJ2P52OO3V4pZ26uBiI173WkZOb0Gqat40RTtW7ptvtdvGWSucsNTRuRhsxuuh7uuufe%2F0ts0DzlRkZtH5LqbDvDx8IznFT8uHznF5elvE9sIFjtrc87ta5x8n3S7%2FfNqb9fV9et47%2B9niCycu2YLekGYFVroMi1tBf5wSOYRjnC87%2FtOugAUhmyTkB6EjMBWF4jB3rrlMxFbhEMGITYD4oZeGGpr%2BGbYZyz6QZyt7sWEtFaE%2BlGMUR%2BzyOktyQAqfplkWx5SVeeF3h4BwsDgkgQGcgoimKEqaNQMpQGQDzXG8HD7hBqATpypnXjYyHrCuQ6oW%2B%2BzKEAA'
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
  killerCages: [],
  kropkiDots: [],
  kropkiNegative: false,
  primaryDiagonal: true,
  secondaryDiagonal: true,
  antiKnight: true,
  antiKing: true,
  oddCells: [{ row: 1, col: 1 }],
  evenCells: [{ row: 1, col: 0 }],
  topBottom: false,
  renbans: [
    [{ row: 2, col: 5 }, { row: 3, col: 6 }, { row: 4, col: 6 }, { row: 4, col: 5 }],
  ],
}
export const LISUDOKU_SOLVER_INVALID_URL = 'https://lisudoku.xyz/solver?import=1234'
export const GRID_STRING = '000000000000000010000000200000003000000040000000500000000000000000000000000000000'
export const LISUDOKU_SOLVER_GRID_STRING = `https://lisudoku.xyz/solver?import=${GRID_STRING}`
export const LISUDOKU_GRID_STRING_CONSTRAINTS: LisudokuConstraints = {
  gridSize: 9,
  fixedNumbers: [
    { position: { row: 1, col: 7 }, value: 1 },
    { position: { row: 2, col: 6 }, value: 2 },
    { position: { row: 3, col: 5 }, value: 3 },
    { position: { row: 4, col: 4 }, value: 4 },
    { position: { row: 5, col: 3 }, value: 5 },
  ],
  regions: [
    [
      { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 },
      { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 },
      { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 },
    ],
    [
      { row: 0, col: 3 }, { row: 0, col: 4 }, { row: 0, col: 5 },
      { row: 1, col: 3 }, { row: 1, col: 4 }, { row: 1, col: 5 },
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
  extraRegions: [],
  thermos: [],
  arrows: [],
  killerCages: [],
  kropkiDots: [],
  kropkiNegative: false,
  primaryDiagonal: false,
  secondaryDiagonal: false,
  antiKnight: false,
  antiKing: false,
  oddCells: [],
  evenCells: [],
  topBottom: false,
  renbans: [],
}

test('transformToLisudoku returns the same object', () => {
  const result = transformer.transformToLisudoku(LISUDOKU_CONSTRAINTS)
  expect(result).toEqual({
    constraints: LISUDOKU_CONSTRAINTS,
    dataString: LISUDOKU_DATA_STRING,
    url: LISUDOKU_SOLVER_URL,
  })
})

test('transformFromLisudoku returns the same object', () => {
  const result = transformer.transformFromLisudoku(LISUDOKU_CONSTRAINTS)
  expect(result).toEqual({
    constraints: LISUDOKU_CONSTRAINTS,
    dataString: LISUDOKU_DATA_STRING,
    url: LISUDOKU_SOLVER_URL,
  })
})
