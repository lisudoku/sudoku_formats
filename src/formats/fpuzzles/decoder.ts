import { decompressFromBase64 } from 'lz-string'
import { Decoder, DecoderRunFn, MatchResult, SudokuDataFormat } from '../../types';
import { FpuzzlesConstraints } from './types';

const FPUZZLES_INLINE_DATA_REGEX = /^(?:https:\/\/)?(?:www\.)?f-puzzles\.com\/\?load=(.+)$/
const FPUZZLES_SHORT_URL_REGEX = /^(?:https:\/\/)?(?:www\.)?f-puzzles\.com\/\?id=(.+)$/

const URL_PATTERNS = [
  FPUZZLES_INLINE_DATA_REGEX,
  FPUZZLES_SHORT_URL_REGEX,
]

const decodeFpuzzlesInline = (dataString: string) => {
  let constraintsStr = undefined
  try {
    constraintsStr = decompressFromBase64(dataString)
  } finally {
    if (constraintsStr === undefined || constraintsStr === null || constraintsStr === '') {
      return {
        error: 'Error while parsing inline data',
      }
    }
  }

  let parsedConstraints: any
  try {
    parsedConstraints = JSON.parse(constraintsStr)
  } catch (e) {
    return {
      error: `Error while parsing constraint json`,
    }
  }

  // Schema sanity check. Could use something like zod.
  if (!('size' in parsedConstraints)) {
    return {
      error: 'Invalid constraints json schema: "size" not found',
    }
  }

  const constraints: FpuzzlesConstraints = parsedConstraints

  return {
    constraints,
  }
}

const matchStaticUrls = (input: string): MatchResult<SudokuDataFormat.Fpuzzles> => {
  const match = input.match(FPUZZLES_INLINE_DATA_REGEX)
  if (!match) {
    return {
      matched: false,
    }
  }
  const dataString = match[1]
  const result = decodeFpuzzlesInline(dataString)

  return {
    matched: true,
    dataString,
    ...result
  }
}

const matchDataString = (input: string): MatchResult<SudokuDataFormat.Fpuzzles> => {
  const result = decodeFpuzzlesInline(input)

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

const run: DecoderRunFn<SudokuDataFormat.Fpuzzles> = async (input: string) => {
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

export const decoder: Decoder<SudokuDataFormat.Fpuzzles> = {
  format: SudokuDataFormat.Fpuzzles,
  urlPatterns: URL_PATTERNS,
  run,
}
