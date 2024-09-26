import { encoders } from './formats';
import { EncodeInput, EncodeResult, SudokuDataFormat } from './types';

/**
 * Function that encodes puzzle constraints into a data string. The opposite of `decodeSudoku`.
 * @param {object} params - All parameters are passed as one big object
 * @param {object} params.constraints - Puzzle constraints. Assumes they are in the `format` format.
 * @param {SudokuDataFormat} params.format - Constraints format
 * @returns {EncodeResult} Data string and generated URL
 */
export const encodeSudoku = <F extends SudokuDataFormat>({ format, constraints }: EncodeInput<F>): EncodeResult => {
  const encoder = encoders[format]
  return encoder(constraints)
}
