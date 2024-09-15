import { compact } from 'lodash-es'
import { transformers } from './formats'
import { FormatsToConstraints, SudokuDataFormat, TransformInput, TransformOutput } from './types'

// Assumes <constraints> is in <fromFormat> format
export const transformSudoku = <FFrom extends SudokuDataFormat, FTo extends SudokuDataFormat>(
  { constraints, fromFormat, toFormat }: TransformInput<FFrom, FTo>
): TransformOutput<FormatsToConstraints[FTo]> => {
  const transformer1 = transformers[fromFormat]
  const result1 = transformer1.transformToLisudoku(constraints)
  if (result1.error !== undefined) {
    return result1
  }
  const transformer2 = transformers[toFormat]
  const result2 = transformer2.transformFromLisudoku(result1.constraints)
  if (result2.error !== undefined) {
    return result2
  }

  return {
    ...result2,
    warning: compact([result1.warning, result2.warning]).join('. ') || undefined,
  }
}
