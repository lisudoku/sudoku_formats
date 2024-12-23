import { expect, test } from 'vitest'
import { decoder } from './decoder'
import { FpuzzlesConstraints } from './types';

export const FPUZZLES_DATA_STRING = 'N4IgzglgXgpiBcBOANCA5gJwgEwQbT2AF9ljSTQMY0IB7AOwQAYLXz3iBdZQty6uo3gBGVADcAhgBsArnBGoaYmEIAuGORRCTZ8gEyKIytRphadchAGZDxhOs0c+Rbryfuyn1q68fnTn39fYO8eEL8/QIjwryiYoNC3eOiXbhAYAA91CSoaBnxQAGMYKSkwfBAAJQBWAGE9EFQa2qtGqrqAFjbKgDYW7r6upoB2fpHaoarR6u6ADlqZzhdUVQALGAwAW1pNmFUNgpApCHoYcvgCKuFanu7r4bva2e69WsRuqzeQTiW0nIxaAB3Q7FUrnPBVDoLbpQ25pY6ncEQyqwmG1B5NKHPJp1bFVPp4yqjZ4/ZYgbAQCRoBjSADU9lMqApVJpUgAtAy5KgJPRVBAANb0CBoVaqTkwbm8gUnNDipkQABmCo2KmKIJKZQqlUQE26OsWWlBmouVR1tya+u+ZIwEj5tHVYK1OoxpqeVtIICN4Nd7wtbt+qFo2FwFyKGoQU1qwhAZJgdlDnvD8Cq82jZP5EFKG0KVPkhETjpNlU+0aanwamKjaIr7SrOPq33E0ksyb0DWtKgARjzDgizvhkaNS5Ga70xrXJs0ZpXzbWXc1CX13qT4Sc86A+0jI8OiQ2mn1WvXJ3Vp5Cbt06vPcQMvj9AzJVH3ahHMBIAJ5tQE4NbMAB0BhACAwAAORgQFagYMBshOMV4AcMwliAA='
export const FPUZZLES_URL = `https://f-puzzles.com/?load=${FPUZZLES_DATA_STRING}`
export const FPUZZLES_CONSTRAINTS: FpuzzlesConstraints = {
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
  killercage: [
    {
      cells: ["R3C1", "R3C2", "R4C1", "R4C2", "R5C1", "R5C2"],
      value: "22",
    },
  ],
  arrow:[
    {
      lines: [["R4C6","R4C7","R4C8","R5C8","R6C8","R7C8"]],
      cells: ["R4C5","R4C6"]
    }
  ],
  renban: [{"lines":[["R7C1","R7C2","R6C3","R5C4","R5C5","R4C6","R5C7","R5C8","R6C9"]]}],
  line: [
    {
      lines: [["R7C1","R7C2","R6C3","R5C4","R5C5","R4C6","R5C7","R5C8","R6C9"]],
      outlineC: 'gray',
      width: 0.2,
      isNewConstraint: true,
    },
  ],
}
export const FPUZZLES_INVALID_URL = 'https://f-puzzles.com/?load=1234'

test('detects fpuzzles puzzle with url', async () => {
  const result = await decoder.run(FPUZZLES_URL)
  expect(result).toEqual({
    matched: true,
    dataString: FPUZZLES_DATA_STRING,
    constraints: FPUZZLES_CONSTRAINTS,
  })
})

test('detects fpuzzles data string', async () => {
  const result = await decoder.run(FPUZZLES_DATA_STRING)
  expect(result).toEqual({
    matched: true,
    dataString: FPUZZLES_DATA_STRING,
    constraints: FPUZZLES_CONSTRAINTS,
  })
})

test('invalid fpuzzles data should return error', async () => {
  const result = await decoder.run(FPUZZLES_INVALID_URL)
  expect(result).toEqual({
    matched: true,
    dataString: '1234',
    error: expect.any(String),
  })
})

test('invalid fpuzzles url should not match', async () => {
  const result = await decoder.run('https://fpuzzl3s.com/?load=1234')
  expect(result).toEqual({
    matched: false,
  })
})

test('invalid fpuzzles constraints schema should return error', async () => {
  // data string contains the json {"x":3}
  const result = await decoder.run('https://f-puzzles.com/?load=N4IgHiBcDMC+Q===')
  expect(result).toEqual({
    matched: true,
    dataString: 'N4IgHiBcDMC+Q===',
    error: expect.any(String),
  })
})
