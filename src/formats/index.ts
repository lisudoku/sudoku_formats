import { Encoder, FormatsToConstraints, SudokuDataFormat, Transformer } from '../types'
import * as gridString from './gridstring'
import * as lisudoku from './lisudoku'
import * as fpuzzles from './fpuzzles'
import * as penpa from './penpa'

export const decoders = [
  gridString.decoder,
  lisudoku.decoder,
  fpuzzles.decoder,
  penpa.decoder,
]

export const transformers: { [F in SudokuDataFormat]: Transformer<FormatsToConstraints[F]> } = {
  [SudokuDataFormat.GridString]: gridString.transformer,
  [SudokuDataFormat.Lisudoku]: lisudoku.transformer,
  [SudokuDataFormat.Fpuzzles]: fpuzzles.transformer,
  [SudokuDataFormat.Penpa]: penpa.transformer,
}

export const encoders: { [F in SudokuDataFormat]: Encoder<FormatsToConstraints[F]> } = {
  [SudokuDataFormat.GridString]: gridString.encoder,
  [SudokuDataFormat.Lisudoku]: lisudoku.encoder,
  [SudokuDataFormat.Fpuzzles]: fpuzzles.encoder,
  [SudokuDataFormat.Penpa]: penpa.encoder,
}

export const FORMATS = decoders.map(({ format, urlPatterns }) => ({
  format,
  urlPatterns,
}))
