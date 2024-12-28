type Cell = string

type ParityCell = {
  cell: Cell
}

type Region = {
  cells: Cell[]
}

type Thermo = {
  lines: Cell[][]
}

type Arrow = {
  cells: Cell[]
  lines: Cell[][]
}

type KropkiDot = {
  cells: [Cell, Cell]
  value?: number
}

type GridCell = {
  region?: number
  value?: number
  given?: boolean
}

export type Grid = GridCell[][]

type KillerCage = {
  cells: Cell[]
  value?: string
}

type Renban = {
  lines: Cell[][]
}

type Palindrome = {
  lines: Cell[][]
}

type CosmeticLine = {
  lines: Cell[][]
  outlineC: string
  width: number
  isNewConstraint: boolean
}

export type FpuzzlesConstraints = {
  size: number
  grid: Grid;
  extraregion?: Region[]
  thermometer?: Thermo[]
  arrow?: Arrow[]
  "diagonal+"?: boolean
  "diagonal-"?: boolean
  antiknight?: boolean
  antiking?: boolean
  difference?: KropkiDot[]
  ratio?: KropkiDot[]
  odd?: ParityCell[]
  even?: ParityCell[]
  killercage?: KillerCage[]
  nonconsecutive?: boolean
  negative?: string[] // could be further restricted if I figure out all the values :)
  disjointgroups?: boolean
  renban?: Renban[]
  palindrome?: Palindrome[]
  line?: CosmeticLine[]
}
