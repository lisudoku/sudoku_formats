import { compact } from 'lodash-es'
import { transformers } from './formats'
import { FormatsToConstraints, SudokuDataFormat, TransformInput, TransformOutput } from './types'

/**
 * Function that transforms puzzle constraints from `fromFormat` to `toFormat`
 * @param {object} params - All parameters are passed as one big object
 * @param {object} params.constraints - Puzzle constraints. Assumes they are in the `fromFormat` format.
 * @param {SudokuDataFormat} params.fromFormat - Source format
 * @param {SudokuDataFormat} params.toFormat - Destination format
 * @returns {object} Puzzle constraints in the `toFormat` format
 */
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
