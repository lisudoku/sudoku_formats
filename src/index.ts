export * from './types'

export { decodeSudoku } from './decodeSudoku'

// TODO: add fn to get all matchers? (url rule, source type)

// TODO: implement conversion between formats
// export const transformSudokuFormat: (input: TransformInput) => TransformOutput = ({ dataString, format, includeFullUrl }: TransformInput) => {
//   // only supports SudokuDataFormat.Lisudoku
//   // support other formats for classic sudokus
//   return {
//     dataString: '?!?!?!?',
//   }
// }
