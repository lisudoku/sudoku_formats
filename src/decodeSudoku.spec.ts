import { expect, test } from 'vitest'
import { decodeSudoku } from './decodeSudoku';
import { SudokuDataFormat } from './types';
import { LISUDOKU_CONSTRAINTS, LISUDOKU_DATA_STRING, LISUDOKU_SOLVER_URL } from './formats/lisudoku/decoder.spec';
import { FPUZZLES_CONSTRAINTS, FPUZZLES_DATA_STRING, FPUZZLES_URL } from './formats/fpuzzles/decoder.spec';

const LISUDOKU_SOLVER_INVALID_URL = 'https://lisudoku.xyz/solver?import=1234'
const GRID_STRING = '000000000000000010000000200000003000000040000000500000000000000000000000000000000'

const PENPA_URL = 'https://logicmastersindia.com/penpa-edit/?m=solve&p=zVZvb9u2E37vT0EQ6Dv+ElHUf2AY0rTdi1+bdU2HojCMgLHVRKj+eJLcpg7az97njnItyx6GDRgw2CaPD8m75468o7vNqvm4Udqjr0kUenwCnfDPTyL+aeA087boyzwTififeFbYu6a2pbhmDSJ9SNXFpr9v2ky8ORP/31S2zTtbq/u+X3fZ+XnZ3BXLynZ93nZFvSrs2bKpzsviU37+87Kp+7zrf7p+5Xt+4Gn1urTLXFixKu6KXnxom0po0TciFUWNLrfLe5FX6/6LWOZlCVD097m4a4uV6BrItndr3H67Xue27UT+YJd9+UU0NZRjDy9pm89P/EuxbMpNVQtbr4R5MKLZ9GVR5ytx2zycPfGf4fucVlcW+0De+U68AUDz3tiI7Jn69cUL9cGWXT6bUwzxW8zmUkslffy0XHyT7gTkN4bTxexx+yZ73N5k88VXtf19LyZ78Tp7RHuVPUoTyGwun0oVKBnJhZJBRICRMEXqAaQERHsg1ASkI4BXBHsg4hXxCAgJAOMdELPZkY7Em+hIWMeIh/b8CRHtmckm7bHeZIywP+EYiY80JxN6WrOei31YtM9OjvUYpoyY7xG2NfJKB1PH9VE4tYvnmLML6FiPi+hYT8QMf1jHcWo+1Pe7Q42VtC3u5s01UqrHuh9+hUcz2PeCd/vcvsUtUVvD7TNuPW5Dbl/ymuew4/up8gMcgo/rGBjlhwgtyWGs/BiUSY41KgDCQHISKj+FcySnqTLa7UWvjO/2olcmcHvRKxMOe40PWwgw20JViRB+kiMPtuAW2wpgC4fJthJl6MqQHs+HLbcXvTJ0dCQblKzA7UUPW8PeCJUrGnhG8DEebMVka+RX7PSjhzzEIUYcxnzigX8M3+OBfwz+8eAvlU09+Kvhrx44a+I8ig8dHcvgqZ1O9Id+6Z1OxFA7X9BDHnzxYZdiC90IIhwIsZkHITHazfCR7WZQvY03zEBwBnnAkdzNGMzQ8fAA52Poyjo7CKYBYR5EUB2AmbOD8PxYltCdgY/ODgKdwBlnB957OAEewAUOizOKO+TvjIYImIGj2sf1fMeX9JLbgNuIL29MBXA2mwchv1PjD71S/yGE6vzwNF41bWVL1PthfNm0dd6Oxnndt7lE6ZddU950m/YDXj+Z8cOhGKs31S22jKGyadb0RB2AxV3dtPnJKQLz1d2p9bdNu5po/2zL8gDo/tjgQT+AlkW7LA+hvi0OxlyoDpDK9vcHwK3t8aeiuy/Wh5oQlEMCvT2kaD/aibVq7/PXmXyQM4m/GGs5mxuciKGnNc22F2r7iyu9uzdYbX/D2/oq217R0zqXXGxRJ3mRD/H5XnzH8yRdDvXbg3zl3oQA4nuI08K9fZ3Nt2+VJFNPWQGJsmo+ga6jQmOQvYVDczkKiZsZ/iMMFqneXzDj3cQJ3mbPm0THm6Qp78Ex4u0O9Oblv0A6XXx1R+L9rT8443fxn71yf1lMHoa0a9qTmQf4RPIBPZlkA36UZ8CPMooMHicV0BN5BXSaWoCOswvgUYIB+5McI63TNCNW00wjU0fJRqbG+TZfzFj6Dg==&q=eyJwaWQiOiJEaWFnb25hbCA5eDkiLCJwdHMiOiI3IC8gNyIsImNpZCI6IlNNMjAyNDAxIiwiaWZyYW1lIjp0cnVlfQ=='

test('detects that it is a lisudoku puzzle', async () => {
  const result = await decodeSudoku(LISUDOKU_SOLVER_URL)
  expect(result).toEqual({
    format: SudokuDataFormat.Lisudoku,
    dataString: LISUDOKU_DATA_STRING,
    constraints: LISUDOKU_CONSTRAINTS,
  })
})

test('detects that it is an f-puzzles puzzle', async () => {
  const result = await decodeSudoku(FPUZZLES_URL)
  expect(result).toEqual({
    format: SudokuDataFormat.Fpuzzles,
    dataString: FPUZZLES_DATA_STRING,
    constraints: FPUZZLES_CONSTRAINTS,
  })
})

test('returns error if decoder returns error', async () => {
  const result = await decodeSudoku(LISUDOKU_SOLVER_INVALID_URL)
  expect(result).toEqual({
    error: expect.any(String),
    format: SudokuDataFormat.Lisudoku,
    dataString: '1234',
    constraints: undefined,
  })
})

test('returns error if no matches', async () => {
  const result = await decodeSudoku('foobar')
  expect(result).toEqual({
    error: expect.any(String),
  })
})

test('returns specific error if empty input', async () => {
  const result = await decodeSudoku('')
  expect(result).toEqual({
    error: expect.stringContaining('empty'),
  })
})

test('detects that it is a lisudoku data string', async () => {
  const result = await decodeSudoku(LISUDOKU_DATA_STRING)
  expect(result).toEqual({
    format: SudokuDataFormat.Lisudoku,
    dataString: LISUDOKU_DATA_STRING,
    constraints: LISUDOKU_CONSTRAINTS,
  })
})

test('ignores leading or trailing whitespace', async () => {
  const result = await decodeSudoku(` ${LISUDOKU_SOLVER_URL} `)
  expect(result).toEqual({
    format: SudokuDataFormat.Lisudoku,
    dataString: LISUDOKU_DATA_STRING,
    constraints: LISUDOKU_CONSTRAINTS,
  })
})

test('detects that it is an fpuzzles data string', async () => {
  const result = await decodeSudoku(FPUZZLES_DATA_STRING)
  expect(result).toEqual({
    format: SudokuDataFormat.Fpuzzles,
    dataString: FPUZZLES_DATA_STRING,
    constraints: FPUZZLES_CONSTRAINTS,
  })
})

test('detects that it is a grid string', async () => {
  const result = await decodeSudoku(GRID_STRING)
  expect(result).toEqual({
    format: SudokuDataFormat.GridString,
    dataString: GRID_STRING,
    constraints: GRID_STRING,
  })
})

test('ignores any whitespace', async () => {
  const result = await decodeSudoku(` ${[...GRID_STRING].join(' ')} `)
  expect(result).toEqual({
    format: SudokuDataFormat.GridString,
    dataString: GRID_STRING,
    constraints: GRID_STRING,
  })
})

test('works with url redirects', async () => {
  // The below url redirects to https://f-puzzles.com/?load=N4Igzgl....
  const result = await decodeSudoku('http://tinyurl.com/29ky3dfn')
  expect(result).toEqual({
    format: SudokuDataFormat.Fpuzzles,
    dataString: expect.stringMatching(/^N4Igzgl/),
    constraints: expect.anything(),
  })
})

test('detects penpa puzzle', async () => {
  const result = await decodeSudoku(PENPA_URL)
  expect(result).toEqual({
    format: SudokuDataFormat.Penpa,
    dataString: expect.stringMatching(/^zVZvb9u2E37vT0EQ6/),
    constraints: expect.anything(),
  })
})
