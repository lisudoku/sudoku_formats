import { FpuzzlesConstraints } from '../formats/fpuzzles';
import { LisudokuConstraints } from '../formats/lisudoku';

export enum SudokuDataFormat {
  Lisudoku = 'lisudoku',
  Fpuzzles = 'fpuzzles',
}

type Constraints = LisudokuConstraints | FpuzzlesConstraints

interface DecodeOutputSuccess {
  format: SudokuDataFormat;
  dataString: string;
  constraints: Constraints;
  error?: never;
}

interface DecodeOutputError {
  format?: SudokuDataFormat;
  dataString?: string;
  constraints?: never;
  error: string;
}

export type DecodeOutput = DecodeOutputSuccess | DecodeOutputError

export interface TransformInput {
  dataString: string;
  format: SudokuDataFormat;
  includeFullUrl: boolean;
}

export interface TransformOutput {
  dataString: string;
}

interface MatchResultSuccess {
  matched: true;
  dataString: string;
  constraints: Constraints;
  error?: never;
}

interface MatchResultError {
  matched: true;
  dataString: string;
  constraints?: never;
  error: string;
}

interface MatchResultNoMatch {
  matched: false;
  dataString?: never;
  constraints?: never;
  error?: never;
}

export type MatchResult = MatchResultSuccess | MatchResultError | MatchResultNoMatch;

export type MatcherRunFn = (input: string) => Promise<MatchResult>;

export interface Matcher {
  format: SudokuDataFormat;
  urlPatterns: RegExp[];
  run: MatcherRunFn;
}
