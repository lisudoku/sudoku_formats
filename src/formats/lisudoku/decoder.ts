import { decompressFromBase64 } from 'lz-string'
import { Decoder, DecoderRunFn, MatchResult, SudokuDataFormat } from '../../types';
import { LisudokuConstraints } from './types';
import { camelCaseKeys, defaultConstraints, gridSizeFromString, gridStringToFixedNumbers, isGridString } from './utils';

const LISUDOKU_API_BASE_URL = 'https://api.lisudoku.xyz/api'

const LISUDOKU_EXTERNAL_PUZZLE_REGEX = /^(?:https:\/\/(?:www\.)?lisudoku\.xyz|http:\/\/localhost:\d+)\/e\?import=(.+)$/
const LISUDOKU_SOLVER_PUZZLE_REGEX = /^(?:https:\/\/(?:www\.)?lisudoku\.xyz|http:\/\/localhost:\d+)\/solver\?import=(.+)$/
const LISUDOKU_DB_PUZZLE_REGEX = /^(?:https:\/\/(?:www\.)?lisudoku\.xyz|http:\/\/localhost:\d+)\/p\/(.+)$/

const URL_PATTERNS = [
  LISUDOKU_EXTERNAL_PUZZLE_REGEX,
  LISUDOKU_SOLVER_PUZZLE_REGEX,
  LISUDOKU_DB_PUZZLE_REGEX,
]

const decodeLisudokuInline = (dataString: string) => {
  if (isGridString(dataString)) {
    const gridSize = gridSizeFromString(dataString)
    const constraints: LisudokuConstraints = {
      ...defaultConstraints(gridSize),
      fixedNumbers: gridStringToFixedNumbers(dataString),
    }
    return {
      constraints,
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
    constraints: filteredConstraints,
  }
}

const matchStaticUrls = (input: string): MatchResult => {
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
  const result = decodeLisudokuInline(dataString)

  return {
    matched: true,
    dataString,
    ...result,
  }
}

const matchDataString = (input: string): MatchResult => {
  const result = decodeLisudokuInline(input)

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

const matchDbUrl: DecoderRunFn = async (input: string) => {
  let match = input.match(LISUDOKU_DB_PUZZLE_REGEX)
  if (!match) {
    return {
      matched: false,
    }
  }
  const id = match[1]

  let puzzle: any
  let status

  // TODO: handle 404
  const response = await fetch(`${LISUDOKU_API_BASE_URL}/puzzles/${id}`)
  const data = await response.json()
  puzzle = camelCaseKeys(data)
  const dataString = '' // TODO: compute it?

  if (puzzle === undefined) {
    let error
    if (status === 404) {
      error = `[lisudoku] Puzzle with id ${id} not found.`
    } else {
      error = `[lisudoku] Request for puzzle with id ${id} failed.`
    }
    return {
      matched: true,
      dataString,
      error,
    }
  }

  return {
    matched: true,
    dataString,
    constraints: puzzle.constraints,
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

  return matchDbUrl(input);
}

export const decoder: Decoder = {
  format: SudokuDataFormat.Lisudoku,
  urlPatterns: URL_PATTERNS,
  run,
}
