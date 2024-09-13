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
}

type GridCell = {
  region?: number
  value?: number
  given?: boolean
}

type Grid = GridCell[][]

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
}
