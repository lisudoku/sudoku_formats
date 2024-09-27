# sudoku-formats

Convert between different sudoku formats (lisudoku, fpuzzles, penpa).

See it in action on the [lisudoku solver](http://lisudoku.xyz/solver) page through the import button.

## Install

```
yarn add sudoku-formats
```

## Decoding and encoding puzzles

```
import { decodeSudoku, encodeSudoku, FORMATS, SudokuDataFormat } from 'sudoku-formats'

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
console.log(FORMATS) // [{ format: 'lisudoku', urlPatterns: ... }, ...]
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
penpa | `...://.../penpa-edit/#...&p=:data` | [example1](https://logicmastersindia.com/penpa-edit/?m=solve&p=zVZvb9u2E37vT0EQ6Dsu0X9LAoYhTdcB+61dN2coCsMIaJmJtciiJ1GN66D97H2OYn6xbGXDBgwYZJOnh8fnjjzeUW230nedyITviTAVnvDxhKknIj8VUdT/PfdclaZSOfMT9g37X6O3dyWb2fks22XiojNr3eTsR6UMm8nNVhqxNmbb5ufnlb4ti41sjWrasl6V8qzQm/Oq/KjOvyt0bVRrvp29Cbwg8iLxrpKFYpKtytvSsJtGb5jPjGYZK2t0ShZrpjZb84kVqqoAMrNW7LYpV6zVkKXpdfr5crtVsmmZ2snCVJ+YrkGOOVal0fcvgktW6Krb1EzWKxbuQqY7U5W1WrGl3p2xF8Er/C5Wv8Or2libLdvI5g4K96VZw9P7dWkUK8qmqNBhPRIG0Leq6AwW2bvSnrE/ZVli3XdHLK2bChOqUXDecbESI7pbQlPf2PVrNE0/eMauADiipTL3StXYQlpewApZA6NZCmYxBYvXXQPfsJdb3bYlkfaTWyZhtPfyTPz8+rW4kVWrJnO/PxGLyZz7XPAAf58vvvD+OPEvFs4Wk4f9r/nD/jqfLz6L/W9PYvokzvIHtG/zBx6kPJ/zCy4iwRO+EDxMCHj5CEDNt8ofHpWngssGMbye4eQZLoLHSWMDkUcjgeD92q5nM4f7wTgeToGnp3jsj+sn3jg+Jf4Rnmk0rp+S3VM89sJxPBv3P/HG/Un8eNSfxB/fnyTIxvHwGbvxuJ9JTHZH8OQZ/in5P+LnlEI/op8+w//c/mRj+jher+0hC2x7hUMq9qFtX9nWs21s25+szvd0HP1ABAEIwYdeBCGcJBlFNaADQ3LsiyBB0ElOIhFMEWiSp1MRZFgsyRnqMAUaMnoRUlBI9hMRUiBIxwc/nX9rC/yR44/AHzv+GPyJ40/Anzp+lPYg6/nRw5bj98Dv9/zoRUjBtZzE7+xGGfgdTwyew3XFTj/GPtABsHI49IcOgJXhf9zbRQ/Z+ZmSn25dKeymzm4Kuwf7E2TObga7FFwrw+7BuoLM2c1glwJtZdjNyC6C9t6G7tK2kW0TG9IpVaXJZI69PH7i/xZCxdddv291s5EVirB7v9RNrZqDd1w5jeKox7zV1XXbNTe4hnhuq7mwWN1tlpiSm6ZzSKX1lq7BgVp5W+tGjQ4RqFa3Y/pL3ayI/GDgXlbVAGj/6HDZDKA+MQeQacrBu63yA2QjzXoALKXBZ0u7LrdDJuzJ0AEjhy7KO3lkbfO05s8TvuMTjs+YLZ/MQ/pqousuy/cXYv8Drq2De1Hsf8F99ybff6Drbs45gkfFwyqhFKGC/F98b8dJuuxB34P8FnKCexDiB4jDSrZ/l8/3V4KToZd2Ool8oz/C2d4ReoerSyxnzg82pB9xt7azRyXwwvr7ODDidfjkNYm91yQde+2W9W97nS0+9xHx/tY3x+EnxT+r/H9ZSnYu6XQzmneAH1NviI7mmMNP0gz4SUKRwdOcAjqSVkCPMwvQaXIBPMkvYM+kGLEeZxl5dZxoZOok18jUYbrNFxMrfQU=&q=eyJwaWQiOiJLcm9wa2kgOXg5IiwicHRzIjoiOCBwb2ludHMiLCJjaWQiOiJTTTIwMjQwNCIsImlmcmFtZSI6ZmFsc2V9) <br> [example2](https://swaroopg92.github.io/penpa-edit/#m=solve&p=vVZNb9tGEL3rVwR7ngLcDy65vKVpnUvqNJWLwCAEg5aZWIhkppTUBDSc3543u0uZFBkUuRSUqJm3yzcf3JnR/njXfDqSw6VzSkji0nniv7nhjwTK+NXmsK2LF/TyeLhvWghEby8u6EO13deLkvfgWi1KIQUJha8Uq2/d8lspBMnV4rH7q3jsbopy9UTd389i/iwui0fcL4tHYbQoPJH0NCSMYQCsJyBlQPcAnpN4LneK4ReKdzJ4DVAmFqAmsd60621980aQAoOULsD7f45Ve4KtYYr8tHu57HH2aQ5nT9QMzlbPcbh04aNU/n5VlKXWpA3plIwjq1Yr6jTQTFGmKcMbyEgmyL/UvPQbMkVd4u+pv7/xRL9znLkl6RAUjCqpSCl4xrJKSek8yHjJKpVBTiUpi8SybA2pLAtylpFySZAdjkKCyCHL3JFKkB3GE/DLyC/BryK/Ar+J/Ab8aeRPwW8jvwV/HvlxzJQL/PiFLWTN87D/EVcacuRR4BnGpfr9FnLkV+Af+qNiThT819Guhl0d/bSchxiXhV0b7VrYHebHRrsWdm20a2F3GJeNdi3s2mjXwm4W7Mpc4x1hP96PgIAkwglWIITIvOJfGR73isbzKXzySspORYKQyZ4gB4HrCVyKXPYECaqYKyPYgccJogp24KZEKF4xyAnnLdhBIgycDnYQfdoTZBxyT5CDIIsEGucUQB8cvJacVRzP9/6QvgoVSrnjpxOKCkfmFQ2FqbxiyHHRB8VihWP2SgaFI/MKGpeJCvZDiQQQyPVs2EKOT71XcOxRUb0GbufYZ684XuJAvZZjKZLzE7wWneVdJxWhGR+gReHioKcp4cXgBHAPlVy2GTe4xaJEutFefZPlK51o4+v/RH6RicONpMEdbRwdW+yb7c3+2H6o1rUofKNHtwT2cNzd1u0I2jbN5+3mYbxv8/GhaevZJQbru49z+2+b9u6M/Uu13Y6A0LNHUOizI+jQbkZ61bbNlxGyqw73I+C2OmDM7e83n8dM9cNh7MChGrtYfarOrO2eY35aiK/CfzFwJBkeh67o3lH3Osy5fmBS9w7z8I+iu+RxGEYn93i/CWMFjf4kvvfrLL2KwzKBfMkyK5CvIY/HUvdnUXaYeWzpV/88i2LX/AtX/Tz1+rrZ3SKYUgzSEVbC/4V+OvM8exkcXs44rJ8dZjE4zNLE4eDcwF9MYyZid69+6C4n7ifcdaun8CKSn/o3Ev5bhD8T0/kd5vV/jea+GXZvh91w2DhOXeJrLLymna09wDPlB3S2zCI+qTTgk5pig9OyAjpTWUDPiwvQtL4ATkoM2A+qjFnPC429Oq81NjUpNzY1rDh0MC99Bw==)

## Contribute

Do you want another format supported? Open an issue or a pull request.

Consider joining the [discord server](https://discord.gg/SGV8TQVSeT).
