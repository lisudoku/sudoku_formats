# sudoku-formats

Convert between different sudoku formats (lisudoku, fpuzzles etc).

See it in action on the [lisudoku solver](http://lisudoku.xyz/solver) page through the import button.

## Decoding and encoding puzzles

```
import { decodeSudoku, encodeSudoku, getAllFormats, SudokuDataFormat } from 'sudoku-formats'

// Parse grid string
decodeSudoku('1000003002000004').then(({ constraints }) => {
  console.log(constraints)
})

// Parse lisudoku puzzle
const LISUDOKU_URL = 'https://lisudoku.xyz/solver?import=1000003002000004'
const { format, dataString, constraints, error } = await decodeSudoku(LISUDOKU_URL)
console.log(constraints) // { gridSize: 4, regions: [...], ... }
console.log(dataString) // '1000003002000004'
console.log(format) // 'lisudoku'
console.log(error) // undefined

console.log(encodeSudoku({ constraints: constraints, format: SudokuDataFormat.Lisudoku }))
// { dataString: '1000003002000004', url: 'https://lisudoku.xyz/solver?import=1000003002000004' }

// Parse f-puzzles puzzle
const FPUZZLES_URL = 'https://f-puzzles.com/?load=N4IgzglgXgpiBcBOANCA5gJwgEwQbT1ADcBDAGwFc54BGVNCImAOwQBcMqBfZYHv3vyGCRfALrJCwgTOlyJU0XKVKFsles1c1yrRu2S9R+Yd1nVp/Vdk7r58WK5A'
const { format, dataString, constraints, error } = await decodeSudoku(FPUZZLES_URL)
console.log(constraints) // { size: 9, grid: [...], ... }
console.log(dataString) // 'N4IgzglgXgpiBcBOAN...'
console.log(format) // 'fpuzzles'
console.log(error) // undefined

// Handling errors
const { error } = await decodeSudoku('123');
console.log(error) // 'Error while parsing inline data'

// Get all formats
console.log(getAllFormats()) // [{ format: 'lisudoku', urlPatterns: ... }, ...]
```

## Converting between formats

```
import { decodeSudoku, transformSudoku, SudokuDataFormat } from 'sudoku-formats'

const LISUDOKU_URL = 'https://lisudoku.xyz/solver?import=1000003002000004'
const { format, constraints } = await decodeSudoku(LISUDOKU_URL)

// lisudoku -> fpuzzles
const result = transformSudoku({
  constraints,
  fromFormat: format,
  toFormat: SudokuDataFormat.Fpuzzles,
})
console.log(result.constraints) // { size: 4, ... }
console.log(result.url) // 'https://f-puzzles.com/?load=...'
console.log(result.error) // undefined

```

## Supported formats

Format   | URL patterns            | Example
-------- | ----------------------- | -------
lisudoku | `https://lisudoku.xyz/e?import=:data` <br> `https://lisudoku.xyz/solver?import=:data` <br> `https://lisudoku.xyz/p/:id` | [example1](https://lisudoku.xyz/solver?import=N4Ig5gTglgJgylAXgUxALgJwBoQDMoAeyMAcgK4C2ARshAM7oDaoADgPZ1QAuUbAdulAQ2Ad3QBGHAGM2AG3QBWAL44AbgENZZVGgDsK1h268BaIaInS56AGwqQGrToAcBkO049%2BgkMLFpJEBl5PXtHbXQMJQBdHAhkMBMGNEZmXws0AAYrEMy3P3RsoOsA%2FIyi4PQAJjL%2FQMqs2stikPEmgJzq9vqSgGZ2qs7GrHN%2FQZaJGKw0gqyh%2FpH0%2FwqSgBZ2lZDlRdmekPWdjL3FAaGaw7H504m0A9HqoeVYmfKhuwvCof0PuZvXH%2BOaHe9w6N2%2BIMB%2FxB4wawKWDzB1warmeIN6QzyP3RNzaWLO7VWGIJQ1xIMJN3OIIURJ%2B1Jx7TpDRqqPhaGxDQWaKGd1Z7JK2zJVx%2B5IaPNmIv5DKFVO5UpuT2mXJucNmfJC4N5QyhrIlIRVGV16A14q1cthZpKxoyjJKKMVrJsNJBjvpPxdTPauidrK9rpBvo9P2c3tmwb9rLDHpZs3dfXasf28cenulPtlPwDkqDqdD6ZBkcl0YyCdsScRbtNGbeKfL%2Fsr%2Ber2drEdN0ViIGQBC4EHUACUEkkmC9%2FDbWhaQpSHSSy4G6%2BHZpmJzWOcu1u0CyF%2Bm2cFwABa0CgcIdK2c6%2FHCnPWy8j2XbkDqCB%2BZJpKRQCBSWTIADCyFksmfc7mlWiLtg%2Bfg%2Fn%2BAFpn8M62uO6DaiaMEXiBUzuNAFAPgAngAIlA6hgPwmjoN22g4HQyAyHwMDYXhBFESEpHIDg6h8DwADSfBQGAu5cCREBkfebFQOxUB8GA%2FGCWwMAwBB%2F5MBC07tsgqjIHwclQbsRLtvEfBUKxz7DgiDQCpqyrEuZKEmTE0RKEAA%3D%3D%3D) <br> [example2](https://lisudoku.xyz/p/uWwScbyWCyHXi2kbL3LY)
fpuzzles | `https://f-puzzles.com/?load=:data` | [example1](https://f-puzzles.com/?load=N4IgzglgXgpiBcBOANCA5gJwgEwQbT2AF9ljSTQMY0IB7AOwQAYLXz3iBdZQty6uo3gBGVADcAhgBsArnBGoaYmEIAuGORRCTZ8gEyKIytRphadchAGZDxhOs0c+Rbryfuyn1q68fnTn39fYO8eEL8/QIjwryiYoNC3eOiXbhBsCAk0BmkAantTVAysnKkAWgK5VAl6VQgAa3oINAALVUqYatqGiHo0DtQYAA91CSoaBnxQAGMYKSkwfBAAJQBWAGE9EFQ19attlY2AFgPlgDY904uTnYB2S7v1m5X71dOADnW3zhdUWmxcPBCCBZvMEC91sIQL8QDA7ECZnMpODlp8oTDVC0YBgALa0HEwVTYqYgKS9GCLIF4FbCdZnU6024M9bvU56daIU5WDkgTg/NIZABmguxKlmJNBCyWy0QT1Osu+WkllOpMrp8q+vJhGAkdVoEqRKpWsqZO1lrJ+pBBhulss5ZpZWrSYwwtAA7iSyfQKfhVUd1Tt/aaVv7WTsNmGVhdI8t7ha0srpf63oH1fyiEA=)

## Contribute

Do you want another format supported? Open an issue or a pull request.

Consider joining the [discord server](https://discord.gg/SGV8TQVSeT).
