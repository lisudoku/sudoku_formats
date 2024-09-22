import { expect, test } from 'vitest'
import { PenpaConstraints } from './types';
import { encoder } from './encoder';
import { decoder } from './decoder';

const PENPA_MIN_DATA_STRING = 'zVTJbtswEL3rKwqeeRBJiVpuaVr3ki6pXQSFIBiyrcRCZCvV0gQynG/PkJzEoaSgpxaFrPHTE/XecJlpuk1129EILhFSlzK4ROjqO/TUz8VrUbRlHr+jZ127rWoAlH6dzeh1Vja5k+Co1EkII5RwuBlJH/v5Y0IIZalz6L/Hh34ZJ+mR9j9OMDzBeXyA+EVHpuNPHWc6ch0XMJT2QscPOro6+jpe6DEf4wNhoaQsikjMIZEoopxxjeGfcu4bzH3KRWgwzJ77zGCfUS49g6VHeRAYHASUR67BEayRK4x+CPou6rugz1CfgT5HfQ76Hup7oO+jvg/6EvUl6IeoD+vPI4FeArwk6qj8kecCMOpwz54Xfx4vAaM+D+x8eIQY8hfoK8BXYJ5SrQPOS4KvRF8p7PWR6CvBV6KvlPa8JPpK8JXoK8E3UL6waVd668519HSUeksDdTYcJ4F82eDy/y8Gzj4cc9JU5bLp6utsnZNYVwfV3L7brfLaosqquiuLvT2uuNlXdT75SpH55mZq/KqqNwP1+6wsLaL51WW1/fG6qNelTbV1YT1ndV3dW8wua7cWscpa6A3NtrizlfJ9ayfQZnaK2W02cNud5nx0yAPRdyJgfT3VQ6K4v6T9p9jqMrS/hCbyOe7nqoeYfqN6gR7EU9UQXuCVfq/QuSGZm6qeY3CqWk5CzKosLwzzLU76BSXK573+WkGyq35DoiYP9byudqtCEa8Ww7xpdIslzxZwss/eTlec0hUv6YrpdPnfTzdKj2Yb3H/cwP/YER6w1Kp6stqAnig4YCcLC/lRbQE/qiJlOC4kYCdqCdhhOQE1riggR0UF3Bt1pVSHpaWyGlaXshoVmLJ6XWPQszR6Ag=='
const PENPA_MIN_URL = `https://swaroopg92.github.io/penpa-edit/#m=solve&p=${PENPA_MIN_DATA_STRING}`
const PENPA_MIN_CONSTRAINTS: PenpaConstraints = {
  rowCount: 9,
  colCount: 9,
  cellSize: 38,
  canvasWidth: 380,
  canvasHeight: 380,
  centerCellIndex: 84,
  space: [0, 0, 0, 0],
  sudoku: [0, 0, 0, 0],
  thermo: [],
  arrows: [],
  killercages: [],
  number: {},
  numberS: {},
  symbol: {},
  centerlist: [28,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1],
}
const PENPA_INVALID_URL = 'https://swaroopg92.github.io/penpa-edit/#m=solve&p=1234'

test('encodes minimal puzzle', async () => {
  const result = encoder(PENPA_MIN_CONSTRAINTS)
  expect((await decoder.run(result.dataString)).constraints).toEqual(PENPA_MIN_CONSTRAINTS)
})
