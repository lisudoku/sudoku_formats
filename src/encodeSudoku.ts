import { encoders } from './formats';
import { EncodeInput, EncodeResult, SudokuDataFormat } from './types';

// Assumes <constraints> is in <format> format
export const encodeSudoku = <F extends SudokuDataFormat>({ format, constraints }: EncodeInput<F>): EncodeResult => {
  const encoder = encoders[format]
  return encoder(constraints)
}
