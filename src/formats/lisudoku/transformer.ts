import { Transformer, TransformOutput } from '../../types'
import { encoder } from './encoder'
import { LisudokuConstraints } from './types'

const transformToLisudoku = (constraints: LisudokuConstraints): TransformOutput<LisudokuConstraints> => {
  return {
    constraints,
    ...encoder(constraints),
  }
}

const transformFromLisudoku = (constraints: LisudokuConstraints): TransformOutput<LisudokuConstraints> => {
  return {
    constraints,
    ...encoder(constraints),
  }
}

export const transformer: Transformer<LisudokuConstraints> = {
  transformToLisudoku,
  transformFromLisudoku,
}
