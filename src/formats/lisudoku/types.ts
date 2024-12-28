// TODO: deduplicate copy-pasted code from lisudou_frontend

export type Grid = (number | null)[][]

export type CellPosition = {
  row: number
  col: number
}

export type FixedNumber = {
  position: CellPosition
  value: number
}

export type Region = CellPosition[]

export type Thermo = CellPosition[]

export type Arrow = {
  circleCells: CellPosition[]
  arrowCells: CellPosition[]
}

export type KillerCage = {
  sum: number | null
  region: Region
}

export type KropkiDot = {
  dotType: KropkiDotType
  cell1: CellPosition
  cell2: CellPosition
}

export enum KropkiDotType {
  Consecutive = 'Consecutive',
  Double = 'Double',
}

export type Renban = CellPosition[]

export type Palindrome = CellPosition[]

export type LisudokuConstraints = {
  gridSize: number
  regions?: Region[]
  fixedNumbers?: FixedNumber[]
  extraRegions?: Region[]
  thermos?: Thermo[]
  arrows?: Arrow[]
  primaryDiagonal?: boolean
  secondaryDiagonal?: boolean
  antiKnight?: boolean
  antiKing?: boolean
  killerCages?: KillerCage[]
  kropkiDots?: KropkiDot[]
  kropkiNegative?: boolean
  oddCells?: CellPosition[]
  evenCells?: CellPosition[]
  topBottom?: boolean
  renbans?: Renban[]
  palindromes?: Palindrome[]
}

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
