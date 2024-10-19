import { Decoder, DecoderRunFn, SudokuDataFormat } from '../../types';

const run: DecoderRunFn<SudokuDataFormat.GridString> = async (input: string) => {
  // If it only contains digits, it's probably a grid string.
  if ([...input].some(c => c < '0' || c > '9')) {
    return {
      matched: false,
    }
  }

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
