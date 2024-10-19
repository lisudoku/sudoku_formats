import { FpuzzlesConstraints } from '../formats/fpuzzles'
import { LisudokuConstraints } from '../formats/lisudoku'
import { PenpaConstraints } from '../formats/penpa'

export enum SudokuDataFormat {
  GridString = 'gridstring',
  Lisudoku = 'lisudoku',
  Fpuzzles = 'fpuzzles',
  Penpa = 'penpa',
}

export type Constraints = string | LisudokuConstraints | FpuzzlesConstraints | PenpaConstraints

export type FormatsToConstraints = {
  [SudokuDataFormat.GridString]: string,
  [SudokuDataFormat.Lisudoku]: LisudokuConstraints,
  [SudokuDataFormat.Fpuzzles]: FpuzzlesConstraints,
  [SudokuDataFormat.Penpa]: PenpaConstraints,
}

interface DecodeOutputSuccess {
  format: SudokuDataFormat
  dataString: string
  constraints: Constraints
  error?: never
}

interface DecodeOutputError {
  format?: SudokuDataFormat
  dataString?: string
  constraints?: never
  error: string
}

export type DecodeOutput = DecodeOutputSuccess | DecodeOutputError

export interface TransformInput<FFrom extends SudokuDataFormat, FTo extends SudokuDataFormat> {
  constraints: FormatsToConstraints[FFrom]
  fromFormat: FFrom
  toFormat: FTo
}

type TransformOutputSuccess<C> = {
  constraints: C
  dataString: string
  url: string
  warning?: string
  error?: never
}

type TransformOutputError = {
  constraints?: never
  dataString?: never
  url?: never
  warning?: never
  error: string
}

export type TransformOutput<C> = TransformOutputSuccess<C> | TransformOutputError

interface MatchResultSuccess<F extends SudokuDataFormat> {
  matched: true
  dataString: string
  constraints: FormatsToConstraints[F]
  error?: never
}

interface MatchResultError {
  matched: true
  dataString: string
  constraints?: never
  error: string
}

interface MatchResultNoMatch {
  matched: false
  dataString?: never
  constraints?: never
  error?: never
}

export type MatchResult<F extends SudokuDataFormat> = MatchResultSuccess<F> | MatchResultError | MatchResultNoMatch

export type DecoderRunFn<F extends SudokuDataFormat> = (input: string) => Promise<MatchResult<F>>

export interface Decoder<F extends SudokuDataFormat> {
  format: F
  urlPatterns: RegExp[]
  run: DecoderRunFn<F>
}

export interface Transformer<C> {
  transformToLisudoku: (constraints: C) => TransformOutput<LisudokuConstraints>
  transformFromLisudoku: (constraints: LisudokuConstraints) => TransformOutput<C>
}

export interface EncodeInput<F extends SudokuDataFormat> {
  constraints: FormatsToConstraints[F]
  format: F
}

export interface EncodeResult {
  dataString: string
  url: string
}

export type Encoder<C> = (constraints: C) => EncodeResult
