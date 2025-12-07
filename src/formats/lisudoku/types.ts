export type { SudokuConstraints as LisudokuConstraints } from 'lisudoku-solver'

export type Grid = (number | null)[][]

export enum SudokuVariant {
  Classic = 'classic',
  Thermo = 'thermo',
  Killer = 'killer',
  Arrow = 'arrow',
  Irregular = 'irregular',
  Kropki = 'kropki',
  TopBottom = 'topbot',
  Diagonal = 'diagonal',
  Mixed = 'mixed',
  AntiKnight = 'antiknight',
  AntiKing = 'antiking',
  ExtraRegions = 'extraregions',
  OddEven = 'oddeven',
  Renban = 'renban',
  Palindrome = 'palindrome',
}
