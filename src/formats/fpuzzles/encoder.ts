import { compressToBase64 } from 'lz-string';
import { FpuzzlesConstraints } from './types';
import { Encoder, EncodeResult } from '../../types';

export const encoder: Encoder<FpuzzlesConstraints> = (constraints: FpuzzlesConstraints): EncodeResult => {
  const constraintsStr = JSON.stringify(constraints)
  const dataString = compressToBase64(constraintsStr)
  return {
    dataString,
    url: `https://f-puzzles.com/?load=${dataString}`,
  }
}
