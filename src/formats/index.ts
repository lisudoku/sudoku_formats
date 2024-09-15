import { Encoder, FormatsToConstraints, SudokuDataFormat, Transformer } from '../types'
import { matcher as lisudokuMatcher, transformer as lisudokuTransformer, encoder as lisudokuEncoder } from './lisudoku'
import { matcher as fpuzzlesMatcher, transformer as fpuzzlesTransformer, encoder as fpuzzlesEncoder } from './fpuzzles'

export const matchers = [
  lisudokuMatcher,
  fpuzzlesMatcher,
]

export const transformers: { [F in SudokuDataFormat]: Transformer<FormatsToConstraints[F]> } = {
  [SudokuDataFormat.Lisudoku]: lisudokuTransformer,
  [SudokuDataFormat.Fpuzzles]: fpuzzlesTransformer,
}

export const encoders: { [F in SudokuDataFormat]: Encoder<FormatsToConstraints[F]> } = {
  [SudokuDataFormat.Lisudoku]: lisudokuEncoder,
  [SudokuDataFormat.Fpuzzles]: fpuzzlesEncoder,
}
