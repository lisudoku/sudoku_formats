import { compressToBase64 } from 'lz-string';
import { Encoder, EncodeResult } from '../../types';
import { normalizeConstraints } from './utils';
import { LisudokuConstraints } from './types';
import { transformer as gridStringTransformer } from '../gridstring'

const encodeDataString = (constraints: LisudokuConstraints): string => {
  const gridStringTransformResult = gridStringTransformer.transformFromLisudoku(constraints)
  if (gridStringTransformResult.error === undefined) {
    return gridStringTransformResult.constraints
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
