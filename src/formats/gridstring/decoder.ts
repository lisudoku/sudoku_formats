import { uniq } from 'lodash-es';
import { Decoder, DecoderRunFn, SudokuDataFormat } from '../../types';

const run: DecoderRunFn<SudokuDataFormat.GridString> = async (rawInput: string) => {
  // If it only contains digits, it's probably a grid string.
  // We allow 1 non-digit character and assume it's the separator
  if (uniq([...rawInput].filter(c => c < '0' || c > '9')).length > 1) {
    return {
      matched: false,
    }
  }

  const input = [...rawInput].map(c => (c < '0' || c > '9') ? '0' : c).join('')

  // Check length
  const gridSize = Math.sqrt(input.length)
  if (Math.trunc(gridSize) !== gridSize) {
    return {
      matched: true,
      error: `Grid string has unsupported length ${input.length}`,
      dataString: input,
    }
  }

  // Check digits
  const invalidDigit = [...input].find(value => Number(value) > gridSize)
  if (invalidDigit !== undefined) {
    return {
      matched: true,
      error: `Grid of size ${gridSize} can't contain digit ${invalidDigit}`,
      dataString: input,
    }
  }

  return {
    matched: true,
    constraints: input,
    dataString: input,
  }
}

export const decoder: Decoder<SudokuDataFormat.GridString> = {
  format: SudokuDataFormat.GridString,
  urlPatterns: [],
  run,
}
