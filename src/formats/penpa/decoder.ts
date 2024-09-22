import { Decoder, DecoderRunFn, MatchResult, SudokuDataFormat } from '../../types';
import { PenpaConstraints } from './types';
import { inflateRaw } from 'pako'
import { DATA_FIELDS, DATA_REPLACE } from './constants';
import { pick } from 'lodash-es';

const PENPA_INLINE_DATA_REGEX = /^.+:\/\/.+\/penpa-edit\/.+&p=([^&]+)$/

const URL_PATTERNS = [
  PENPA_INLINE_DATA_REGEX,
]

const processDataLine = (line: string) => {
  for (const [to, from] of DATA_REPLACE) {
    line = line.replaceAll(from, to)
  }
  return JSON.parse(line)
}

const decodePenpaInline = (dataString: string) => {
  let decoded = undefined
  try {
    const step1 = atob(dataString);
    const step2 = Uint8Array.from([...step1].map(c => c.charCodeAt(0)))
    const step3 = inflateRaw(step2)
    decoded = new TextDecoder().decode(step3);
  } catch (e) {
    return {
      error: 'Error while parsing inline data',
    }
  }

  // Note: debugging on penpa can be done via decrypt_data('zVVNbxM...')

  const lines = decoded.split("\n")
  if (lines.length < 19) {
    return {
      error: 'Invalid constraints schema: not enough lines',
    }
  }

  const line0 = lines[0].split(',')
  const gridType = line0[0]
  if (gridType !== 'sudoku' && gridType !== 'square') {
    return {
      error: 'Invalid grid type',
    }
  }

  const colCount = Number(line0[1])
  const rowCount = Number(line0[2])
  const cellSize = Number(line0[3])
  const canvasWidth = Number(line0[7])
  const canvasHeight = Number(line0[8])
  const centerCellIndex = Number(line0[9])

  const space: [number, number, number, number] = JSON.parse(lines[1])
  const data = processDataLine(lines[3])

  const centerlist = JSON.parse(lines[5])

  const sudoku: [number, number, number, number] = [
    Number(line0[11]),
    Number(line0[12]),
    Number(line0[13]),
    Number(line0[14]),
  ]

  const constraints: PenpaConstraints = {
    colCount,
    rowCount,
    cellSize,
    canvasWidth,
    canvasHeight,
    centerCellIndex,
    space,
    sudoku,
    centerlist,
    ...pick(data, DATA_FIELDS),
  }

  return {
    constraints,
  }
}

const matchStaticUrls = (input: string): MatchResult => {
  const match = input.match(PENPA_INLINE_DATA_REGEX)
  if (!match) {
    return {
      matched: false,
    }
  }
  const dataString = match[1]
  const result = decodePenpaInline(dataString)

  return {
    matched: true,
    dataString,
    ...result
  }
}

const matchDataString = (input: string): MatchResult => {
  const result = decodePenpaInline(input)

  if (result.error) {
    return {
      matched: false,
    }
  }

  return {
    matched: true,
    dataString: input,
    ...result
  }
}

const run: DecoderRunFn = async (input: string) => {
  let result = matchStaticUrls(input);
  if (result.matched) {
    return result
  }

  result = matchDataString(input);
  if (result.matched) {
    return result
  }

  return {
    matched: false,
  }
}

export const decoder: Decoder = {
  format: SudokuDataFormat.Penpa,
  urlPatterns: URL_PATTERNS,
  run,
}
