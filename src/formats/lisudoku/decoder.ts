import { decompressFromBase64 } from 'lz-string'
import { Decoder, DecoderRunFn, MatchResult, SudokuDataFormat } from '../../types';
import { camelCaseKeys } from './utils';
import { decoder as gridStringDecoder, transformer as gridStringTransformer } from '../gridstring'
import { LisudokuConstraints } from './types';

const LISUDOKU_API_BASE_URL = 'https://api.lisudoku.xyz/api'

const LISUDOKU_EXTERNAL_PUZZLE_REGEX = /^(?:https:\/\/(?:www\.)?lisudoku\.xyz|http:\/\/localhost:\d+)\/e\?import=(.+)$/
const LISUDOKU_SOLVER_PUZZLE_REGEX = /^(?:https:\/\/(?:www\.)?lisudoku\.xyz|http:\/\/localhost:\d+)\/solver\?import=(.+)$/
const LISUDOKU_DB_PUZZLE_REGEX = /^(?:https:\/\/(?:www\.)?lisudoku\.xyz|http:\/\/localhost:\d+)\/p\/(.+)$/

const URL_PATTERNS = [
  LISUDOKU_EXTERNAL_PUZZLE_REGEX,
  LISUDOKU_SOLVER_PUZZLE_REGEX,
  LISUDOKU_DB_PUZZLE_REGEX,
]

const decodeLisudokuInline = async (dataString: string) => {
  const gridStringDecodeResult = await gridStringDecoder.run(dataString)
  if (gridStringDecodeResult.matched) {
    if (gridStringDecodeResult.error !== undefined) {
      return {
        error: gridStringDecodeResult.error,
      }
    }

    const lisudokuTransformResult = gridStringTransformer.transformToLisudoku(gridStringDecodeResult.constraints)
    if (lisudokuTransformResult.error !== undefined) {
      return {
        error: lisudokuTransformResult.error,
      }
    }

    return {
      constraints: lisudokuTransformResult.constraints,
    }
  }

  let constraintsStr = undefined
  try {
    constraintsStr = decompressFromBase64(decodeURIComponent(dataString))
  } finally {
    if (constraintsStr === undefined || constraintsStr === null || constraintsStr === '') {
      return {
        error: 'Error while parsing inline data',
      }
    }
  }

  let parsedConstraints = undefined
  try {
    parsedConstraints = JSON.parse(constraintsStr)
  } catch (e) {
    return {
      error: 'Error while parsing constraint json',
    }
  }
  const filteredConstraints = camelCaseKeys(parsedConstraints)

  // Schema sanity check. Could use something like zod.
  if (!('gridSize' in filteredConstraints)) {
    return {
      error: 'Invalid constraints json schema: "gridSize" not found',
    }
  }

  return {
    constraints: filteredConstraints as LisudokuConstraints,
  }
}

const matchStaticUrls = async (input: string): Promise<MatchResult<SudokuDataFormat.Lisudoku>> => {
  let match = input.match(LISUDOKU_EXTERNAL_PUZZLE_REGEX)
  if (!match) {
    match = input.match(LISUDOKU_SOLVER_PUZZLE_REGEX)
  }
  if (!match) {
    return {
      matched: false,
    }
  }
  const dataString = match[1]
  const result = await decodeLisudokuInline(dataString)

  return {
    matched: true,
    dataString,
    ...result,
  }
}

const matchDataString = async (input: string): Promise<MatchResult<SudokuDataFormat.Lisudoku>> => {
  const result = await decodeLisudokuInline(input)

  if (result.error) {
    return {
      matched: false,
    }
  }

  return {
    matched: true,
    dataString: input,
    ...result,
  }
}

const matchDbUrl: DecoderRunFn<SudokuDataFormat.Lisudoku> = async (input: string) => {
  let match = input.match(LISUDOKU_DB_PUZZLE_REGEX)
  if (!match) {
    return {
      matched: false,
    }
  }

  const id = match[1]
  const response = await fetch(`${LISUDOKU_API_BASE_URL}/puzzles/${id}`)
  if (response.status !== 200) {
    let error
    if (response.status === 404) {
      error = `[lisudoku] Puzzle with id ${id} not found.`
    } else {
      error = `[lisudoku] Request for puzzle with id ${id} failed.`
    }
    return {
      matched: true,
      dataString: '',
      error,
    }
  }

  const data = await response.json()
  const puzzle = camelCaseKeys(data)

  return {
    matched: true,
    dataString: '', // TODO: compute it?
    constraints: puzzle.constraints,
  }
}

const run: DecoderRunFn<SudokuDataFormat.Lisudoku> = async (input: string) => {
  let result = await matchStaticUrls(input);
  if (result.matched) {
    return result
  }

  result = await matchDataString(input);
  if (result.matched) {
    return result
  }

  return matchDbUrl(input);
}

export const decoder: Decoder<SudokuDataFormat.Lisudoku> = {
  format: SudokuDataFormat.Lisudoku,
  urlPatterns: URL_PATTERNS,
  run,
}
