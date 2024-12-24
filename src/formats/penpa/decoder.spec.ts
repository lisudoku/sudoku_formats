import { expect, test } from 'vitest'
import { decoder } from './decoder'
import { PenpaConstraints } from './types';

const PENPA_DATA_STRING = 'vVZNb9tGEL3rVwR7ngLcDy65vKVpnUvqNJWLwCAEg5aZWIhkppTUBDSc3543u0uZFBkUuRSUqJm3yzcf3JnR/njXfDqSw6VzSkji0nniv7nhjwTK+NXmsK2LF/TyeLhvWghEby8u6EO13deLkvfgWi1KIQUJha8Uq2/d8lspBMnV4rH7q3jsbopy9UTd389i/iwui0fcL4tHYbQoPJH0NCSMYQCsJyBlQPcAnpN4LneK4ReKdzJ4DVAmFqAmsd60621980aQAoOULsD7f45Ve4KtYYr8tHu57HH2aQ5nT9QMzlbPcbh04aNU/n5VlKXWpA3plIwjq1Yr6jTQTFGmKcMbyEgmyL/UvPQbMkVd4u+pv7/xRL9znLkl6RAUjCqpSCl4xrJKSek8yHjJKpVBTiUpi8SybA2pLAtylpFySZAdjkKCyCHL3JFKkB3GE/DLyC/BryK/Ar+J/Ab8aeRPwW8jvwV/HvlxzJQL/PiFLWTN87D/EVcacuRR4BnGpfr9FnLkV+Af+qNiThT819Guhl0d/bSchxiXhV0b7VrYHebHRrsWdm20a2F3GJeNdi3s2mjXwm4W7Mpc4x1hP96PgIAkwglWIITIvOJfGR73isbzKXzySspORYKQyZ4gB4HrCVyKXPYECaqYKyPYgccJogp24KZEKF4xyAnnLdhBIgycDnYQfdoTZBxyT5CDIIsEGucUQB8cvJacVRzP9/6QvgoVSrnjpxOKCkfmFQ2FqbxiyHHRB8VihWP2SgaFI/MKGpeJCvZDiQQQyPVs2EKOT71XcOxRUb0GbufYZ684XuJAvZZjKZLzE7wWneVdJxWhGR+gReHioKcp4cXgBHAPlVy2GTe4xaJEutFefZPlK51o4+v/RH6RicONpMEdbRwdW+yb7c3+2H6o1rUofKNHtwT2cNzd1u0I2jbN5+3mYbxv8/GhaevZJQbru49z+2+b9u6M/Uu13Y6A0LNHUOizI+jQbkZ61bbNlxGyqw73I+C2OmDM7e83n8dM9cNh7MChGrtYfarOrO2eY35aiK/CfzFwJBkeh67o3lH3Osy5fmBS9w7z8I+iu+RxGEYn93i/CWMFjf4kvvfrLL2KwzKBfMkyK5CvIY/HUvdnUXaYeWzpV/88i2LX/AtX/Tz1+rrZ3SKYUgzSEVbC/4V+OvM8exkcXs44rJ8dZjE4zNLE4eDcwF9MYyZid69+6C4n7ifcdaun8CKSn/o3Ev5bhD8T0/kd5vV/jea+GXZvh91w2DhOXeJrLLymna09wDPlB3S2zCI+qTTgk5pig9OyAjpTWUDPiwvQtL4ATkoM2A+qjFnPC429Oq81NjUpNzY1rDh0MC99Bw=='
const PENPA_URL = `https://swaroopg92.github.io/penpa-edit/#m=solve&p=${PENPA_DATA_STRING}`
export const PENPA_CONSTRAINTS: PenpaConstraints = {
  rowCount: 9,
  colCount: 9,
  cellSize: 38,
  canvasWidth: 380,
  canvasHeight: 380,
  centerCellIndex: 84,
  space: [0, 0, 0, 0],
  sudoku: [1, 0, 0, 1],
  thermo: [[33, 34, 35, 49, 62]],
  killercages: [[54, 55, 67, 68, 80, 81]],
  cage: {
    "892,894": 10,
    "892,893": 10,
    "893,896": 10,
    "894,944": 10,
    "896,897": 10,
    "897,899": 10,
    "899,949": 10,
    "944,946": 10,
    "946,996": 10,
    "949,951": 10,
    "951,1001": 10,
    "996,998": 10,
    "999,1002": 10,
    "998,999": 10,
    "1001,1003": 10,
    "1002,1003": 10,
  },
  arrows: [[72, 73, 74, 87, 100, 113]],
  number: {
    43: ["1", 1, "1"],
    44: ["2", 1, "1"],
    45: ["3", 1, "1"],
  },
  numberS: {
    892: [' 22', 1],
  },
  symbol: {
    106: [3, "circle_L", 2],
    119: [3, "square_L", 2],
    642: [8, "circle_SS", 2],
    643: [8, "circle_SS", 2],
    645: [2, "circle_SS", 2],
    646: [2, "circle_SS", 2],
  },
  centerlist: [28,1,3,1,1,1,1,5,1,3,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,-109,-1,14,-1],
  lineE: {
    // omitted grid lines from this map
    "183,197": 12,
    "197,211": 12,
    "211,225": 12,
    "225,239": 12,
    "239,253": 12,
    "253,267": 12,
    "267,281": 12,
    "281,295": 12,
    "295,309": 12,
    "204,192": 12,
    "216,204": 12,
    "228,216": 12,
    "240,228": 12,
    "252,240": 12,
    "264,252": 12,
    "276,264": 12,
    "288,276": 12,
    "300,288": 12,
  }
}
export const PENPA_INVALID_URL = 'https://swaroopg92.github.io/penpa-edit/#m=solve&p=1234'

test('detects penpa puzzle with url', async () => {
  const result = await decoder.run(PENPA_URL)
  expect(result).toEqual({
    matched: true,
    dataString: PENPA_DATA_STRING,
    constraints: {
      ...PENPA_CONSTRAINTS,
      lineE: expect.objectContaining(PENPA_CONSTRAINTS.lineE),
    },
  })
})
