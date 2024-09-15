import { isBoolean, isEmpty, isEqual, isNumber, omitBy } from 'lodash-es';
import { compressToBase64 } from 'lz-string';
import { Encoder, EncodeResult } from '../../types';
import { detectVariant, ensureDefaultRegions, fixedNumbersToGridString } from './utils';
import { LisudokuConstraints, SudokuVariant } from './types';

const encodeDataString = (constraints: LisudokuConstraints): string => {
  const variant = detectVariant(constraints)
  if (variant === SudokuVariant.Classic) {
    return fixedNumbersToGridString(constraints.gridSize, constraints.fixedNumbers)
  }
  const filteredConstraints = omitBy(
    constraints,
    value => !isNumber(value) &&
             (value === false || (!isBoolean(value) && isEmpty(value)))
  )
  if (isEqual(filteredConstraints.regions, ensureDefaultRegions(constraints.gridSize))) {
    delete filteredConstraints.regions
  }
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
