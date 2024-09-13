import { DecodeOutput, MatchResult } from './types'
import { matchers } from './formats'

/**
 * Function that parses a sudoku puzzle url into its object representation
 * @param {string} input - Either a url or a data string
 * @returns {Promise<DecodeOutput>} Promise object that represents the parsing operation result
 */
export const decodeSudoku = async (input: string, followRedirects = true): Promise<DecodeOutput> => {
  const processedInput = input.trim()

  let result: MatchResult | undefined
  let format
  for (const matcher of matchers) {
    result = await matcher.run(processedInput)
    if (result.matched) {
      format = matcher.format
      break
    }
  }

  if (result === undefined || result.error !== undefined || format === undefined) {
    // No matcheso on the input

    if (followRedirects) {
      // Maybe this url redirects to something that matches
      try {
        const url = new URL(processedInput)
        if (url.protocol === 'http:' || url.protocol === 'https:') {
          const response = await fetch(url)
          if (response.redirected) {
            return decodeSudoku(response.url, false)
          }
        }
      } catch (_) {
        // continue and return no match
      }
    }

    return {
      error: result?.error || 'Format not supported',
      format,
      dataString: result?.dataString,
    }
  }

  return {
    format,
    dataString: result.dataString!,
    constraints: result.constraints!,
  }
}
