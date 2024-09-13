import { expect, test } from 'vitest'
import { matcher } from './matcher'
import { FpuzzlesConstraints } from './types';

export const FPUZZLES_DATA_STRING = 'N4IgzglgXgpiBcBOANCA5gJwgEwQbT2AF9ljSTQMY0IB7AOwQAYLXz3iBdZQty6uo3gBGVADcAhgBsArnBGoaYmEIAuGORRCTZ8gEyKIytRphadchAGZDxhOs0c+Rbryfuyn1q68fnTn39fYO8eEL8/QIjwryiYoNC3eOiXbhBsCAk0BmkAantTVAysnKkAWgK5VAl6VQgAa3oINAALVUqYatqGiHo0DtQYAA91CSoaBnxQAGMYKSkwfBAAJQBWAGE9EFQ19attlY2AFgPlgDY904uTnYB2S7v1m5X71dOADnW3zhdUWmxcPBCCBZvMEC91sIQL8QDA7ECZnMpODlp8oTDVC0YBgALa0HEwVTYqYgKS9GCLIF4FbCdZnU6024M9bvU56daIU5WDkgTg/NIZABmguxKlmJNBCyWy0QT1Osu+WkllOpMrp8q+vJhGAkdVoEqRKpWsqZO1lrJ+pBBhulss5ZpZWrSYwwtAA7iSyfQKfhVUd1Tt/aaVv7WTsNmGVhdI8t7ha0srpf63oH1fyiEA='
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
  arrow:[
    {
      lines: [["R4C6","R4C7","R4C8","R5C8","R6C8","R7C8"]],
      cells: ["R4C5","R4C6"]
    }
  ]
}
export const FPUZZLES_INVALID_URL = 'https://f-puzzles.com/?load=1234'

test('detects fpuzzles puzzle with url', async () => {
  const result = await matcher.run(FPUZZLES_URL)
  expect(result).toEqual({
    matched: true,
    dataString: FPUZZLES_DATA_STRING,
    constraints: FPUZZLES_CONSTRAINTS,
  })
})

test('detects fpuzzles data string', async () => {
  const result = await matcher.run(FPUZZLES_DATA_STRING)
  expect(result).toEqual({
    matched: true,
    dataString: FPUZZLES_DATA_STRING,
    constraints: FPUZZLES_CONSTRAINTS,
  })
})

test('invalid fpuzzles data should return error', async () => {
  const result = await matcher.run(FPUZZLES_INVALID_URL)
  expect(result).toEqual({
    matched: true,
    dataString: '1234',
    error: expect.any(String),
  })
})

test('invalid fpuzzles url should not match', async () => {
  const result = await matcher.run('https://fpuzzl3s.com/?load=1234')
  expect(result).toEqual({
    matched: false,
  })
})

test('invalid fpuzzles constraints schema should return error', async () => {
  // data string contains the json {"x":3}
  const result = await matcher.run('https://f-puzzles.com/?load=N4IgHiBcDMC+Q===')
  expect(result).toEqual({
    matched: true,
    dataString: 'N4IgHiBcDMC+Q===',
    error: expect.any(String),
  })
})
