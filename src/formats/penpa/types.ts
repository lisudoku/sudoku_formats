type Thermo = number[]

type KillerCage = number[]

type Arrow = number[]

export type PenpaConstraints = {
  rowCount: number
  colCount: number
  cellSize: number
  canvasWidth: number
  canvasHeight: number
  centerCellIndex: number
  space: [number, number, number, number]
  sudoku: [number, number, number, number]
  thermo: Thermo[]
  killercages: KillerCage[]
  arrows: Arrow[]
  number: { [key in number]: [string, number, string] }
  numberS: { [key in number]: [string, number] }
  symbol: { [key in number]: [number, string, number] }
  centerlist: number[]
}
