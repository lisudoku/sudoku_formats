import { expect, test } from 'vitest'
import { decoder } from './decoder'

const GRID_STRING = '000000000000000010000000200000003000000040000000500000000000000000000000000000000'
const GRID_STRING_LETTERS = '00000000000x0000'
const GRID_STRING_INVALID_LENGTH = '000000'
const GRID_STRING_INVALID_DIGIT = '0000000000000005'

test('invalid grid string with letters', async () => {
  const result = await decoder.run(GRID_STRING_LETTERS)
  expect(result).toEqual({
    matched: false,
  })
})

test('detects grid string', async () => {
  const result = await decoder.run(GRID_STRING)
  expect(result).toEqual({
    matched: true,
    dataString: GRID_STRING,
    constraints: GRID_STRING,
  })
})

test('invalid grid string length', async () => {
  const result = await decoder.run(GRID_STRING_INVALID_LENGTH)
  expect(result).toEqual({
    matched: true,
    dataString: GRID_STRING_INVALID_LENGTH,
    error: expect.stringContaining('length'),
  })
})

test('invalid grid string with high digits', async () => {
  const result = await decoder.run(GRID_STRING_INVALID_DIGIT)
  expect(result).toEqual({
    matched: true,
    dataString: GRID_STRING_INVALID_DIGIT,
    error: expect.stringContaining('invalid digit'),
  })
})
