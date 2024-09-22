import { pick } from 'lodash-es';
import { deflateRaw } from 'pako';
import { PenpaConstraints } from './types';
import { Encoder, EncodeResult } from '../../types';
import { DATA_FIELDS, DATA_REPLACE, DEFAULT_DATA } from './constants';

const buildDataLine = (constraints: PenpaConstraints) => {
  let line = JSON.stringify({
    ...DEFAULT_DATA,
    ...pick(constraints, DATA_FIELDS),
  })
  for (const [from, to] of DATA_REPLACE) {
    line = line.replaceAll(from, to)
  }
  return line
}

const buildConstraintsStr = (constraints: PenpaConstraints) => {

  let line0 = `sudoku,${constraints.colCount},${constraints.rowCount},` +
    `${constraints.cellSize},0,1,1,${constraints.canvasWidth},${constraints.canvasHeight},${constraints.centerCellIndex},${constraints.centerCellIndex},${constraints.sudoku.join(',')},` +
    'Title: ,Author: ,,,OFF,false'

  let lines = []
  lines.push(line0)
  lines.push(JSON.stringify(constraints.space))

  lines.push("[\"1\",\"2\",\"1\"]~\"sudoku\"~[\"1\",9]")

  lines.push(buildDataLine(constraints))

  lines.push('')
  lines.push(JSON.stringify(constraints.centerlist))
  lines.push(JSON.stringify([]))

  lines.push(JSON.stringify({}))

  lines.push("\"x\"")
  lines.push("\"x\"")
  lines.push(JSON.stringify([3,1,4]))

  lines.push("{z9:zQ,zG:[\"1\",\"2\",\"1\"],zQ:{zM:zS,zS:[\"\",1],zL:[\"1\",2],zE:[\"1\",2],zW:[\"\",2],zC:[\"1\",10],zN:[\"1\",1],zY:[\"circle_L\",1],zP:[zT,\"\"],zB:[\"\",\"\"],\"move\":[\"1\",\"\"],\"combi\":[\"battleship\",\"\"],\"sudoku\":[\"1\",1]},zA:{zM:zS,zS:[\"\",1],zL:[\"1\",3],zE:[\"1\",3],zW:[\"\",3],zC:[\"1\",10],zN:[\"1\",2],zY:[\"circle_L\",1],zP:[zT,\"\"],zB:[\"\",\"\"],\"move\":[\"1\",\"\"],\"combi\":[\"battleship\",\"\"],\"sudoku\":[\"1\",9]}}")

  lines.push("\"x\"")
  lines.push('0')

  lines.push('{zR:{z_:[]},zU:{z_:[]},z8:{z_:[]},zS:{},zN:{},z1:{},zY:{},zF:{},z2:{},zT:[],z3:[],zD:[],z0:[],z5:[],zL:{},zE:{},zW:{},zC:{},z4:{},z6:[],z7:[]}')

  lines.push('x')

  lines.push(JSON.stringify({}))

  lines.push(JSON.stringify([]))
  lines.push("false")

  return lines.join("\n")
}

export const encoder: Encoder<PenpaConstraints> = (constraints: PenpaConstraints): EncodeResult => {
  const constraintsStr = buildConstraintsStr(constraints)
  const step1 = new TextEncoder().encode(constraintsStr)
  const step2 = deflateRaw(step1)
  const step3 = String.fromCharCode(...step2)
  const dataString = btoa(step3)

  return {
    dataString,
    url: `https://swaroopg92.github.io/penpa-edit/#m=solve&p=${dataString}`,
  }
}
