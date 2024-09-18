import { Encoder, FormatsToConstraints, SudokuDataFormat, Transformer } from '../types'
import { decoder as lisudokuDecoder, transformer as lisudokuTransformer, encoder as lisudokuEncoder } from './lisudoku'
import { decoder as fpuzzlesDecoder, transformer as fpuzzlesTransformer, encoder as fpuzzlesEncoder } from './fpuzzles'

export const decoders = [
  lisudokuDecoder,
  fpuzzlesDecoder,
]

export const transformers: { [F in SudokuDataFormat]: Transformer<FormatsToConstraints[F]> } = {
  [SudokuDataFormat.Lisudoku]: lisudokuTransformer,
  [SudokuDataFormat.Fpuzzles]: fpuzzlesTransformer,
}

export const encoders: { [F in SudokuDataFormat]: Encoder<FormatsToConstraints[F]> } = {
  [SudokuDataFormat.Lisudoku]: lisudokuEncoder,
  [SudokuDataFormat.Fpuzzles]: fpuzzlesEncoder,
}

export const FORMATS = decoders.map(({ format, urlPatterns }) => ({
  format,
  urlPatterns,
}))
