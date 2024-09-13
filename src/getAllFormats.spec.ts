import { expect, test } from 'vitest'
import { getAllFormats } from './getAllFormats';
import { SudokuDataFormat } from './types';

test('returns all formats', async () => {
  const formats = getAllFormats()
  expect(formats).toHaveLength(2)
  expect(formats[0]).toEqual({
    format: SudokuDataFormat.Lisudoku,
    urlPatterns: expect.anything(),
  })
})
