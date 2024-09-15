import { FpuzzlesConstraints } from '../formats/fpuzzles'
import { LisudokuConstraints } from '../formats/lisudoku'

export enum SudokuDataFormat {
  Lisudoku = 'lisudoku',
  Fpuzzles = 'fpuzzles',
}

export type Constraints = LisudokuConstraints | FpuzzlesConstraints

export type FormatsToConstraints = {
  [SudokuDataFormat.Lisudoku]: LisudokuConstraints,
  [SudokuDataFormat.Fpuzzles]: FpuzzlesConstraints,
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

interface MatchResultSuccess {
  matched: true
  dataString: string
  constraints: Constraints
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

export type MatchResult = MatchResultSuccess | MatchResultError | MatchResultNoMatch

export type MatcherRunFn = (input: string) => Promise<MatchResult>

export interface Matcher {
  format: SudokuDataFormat
  urlPatterns: RegExp[]
  run: MatcherRunFn
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
