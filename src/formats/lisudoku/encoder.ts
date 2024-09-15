import { compressToBase64 } from 'lz-string';
import { Encoder, EncodeResult } from '../../types';
import { detectVariant, fixedNumbersToGridString, normalizeConstraints } from './utils';
import { LisudokuConstraints, SudokuVariant } from './types';

const encodeDataString = (constraints: LisudokuConstraints): string => {
  const variant = detectVariant(constraints)
  if (variant === SudokuVariant.Classic) {
    return fixedNumbersToGridString(constraints.gridSize, constraints.fixedNumbers)
  }
  const filteredConstraints = normalizeConstraints(constraints)
  const constraintsStr = JSON.stringify(filteredConstraints)
  const encodedData = encodeURIComponent(compressToBase64(constraintsStr))
  return encodedData
}

export const encoder: Encoder<LisudokuConstraints> = (constraints: LisudokuConstraints): EncodeResult => {
  const dataString = encodeDataString(constraints)
  return {
    dataString,
    url: `https://lisudoku.xyz/solver?import=${dataString}`,
  }
}
