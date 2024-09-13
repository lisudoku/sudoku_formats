export * from './types'

export { decodeSudoku } from './decodeSudoku'
export { getAllFormats } from './getAllFormats'

// TODO: implement conversion between formats
// export const transformSudokuFormat: (input: TransformInput) => TransformOutput = ({ dataString, format, includeFullUrl }: TransformInput) => {
//   // only supports SudokuDataFormat.Lisudoku
//   // support other formats for classic sudokus
//   return {
//     dataString: '?!?!?!?',
//   }
// }
