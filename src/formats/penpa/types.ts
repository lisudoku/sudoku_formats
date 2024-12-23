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
  cage: Record<string, number> // cosmetic
  arrows: Arrow[]
  number: Record<number, [string, number, string]>
  numberS: Record<number, [string, number]>
  symbol: Record<number, [number, string, number]>
  centerlist: number[]
}
