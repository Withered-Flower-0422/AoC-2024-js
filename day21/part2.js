// unsolved
const data = require('fs').readFileSync(require('path').join(__dirname, 0 ? 'puzzle.txt' : 'example.txt'), 'utf8')

const codes = data.split('\r\n')

// const nPos = {
//     '7': [0, 0],
//     '8': [0, 1],
//     '9': [0, 2],
//     '4': [1, 0],
//     '5': [1, 1],
//     '6': [1, 2],
//     '1': [2, 0],
//     '2': [2, 1],
//     '3': [2, 2],
//     'gap': [3, 0],
//     '0': [3, 1],
//     'A': [3, 2]
// }
// const dPos = {
//     'gap': [0, 0],
//     '^': [0, 1],
//     'A': [0, 2],
//     '<': [1, 0],
//     'v': [1, 1],
//     '>': [1, 2],
// }

// const findWays = (s, e, board) => {
//     const f = (ex, ey, sx, sy, d, gx, gy) => {
//         const dx = ex - sx > 0 ? 1 : -1, dy = ey - sy > 0 ? 1 : -1
//         const signX = dx === 1 ? 'v' : '^', signY = dy === 1 ? '>' : '<'

//         const allPath = []
//         const _f = (x, y, d) => {
//             if (x === ex && y === ey) {
//                 allPath.push(d + 'A')
//                 return
//             }
//             if (x === gx && y === gy) return
//             if ((dy === 1 && y < ey) || (dy === -1 && y > ey)) _f(x, y + dy, d + signY)
//             if ((dx === 1 && x < ex) || (dx === -1 && x > ex)) _f(x + dx, y, d + signX)
//         }
//         _f(sx, sy, d)
//         return allPath
//     }

//     const [[sx, sy], [ex, ey], [gx, gy]] = board === 'n' ? [nPos[s], nPos[e], nPos['gap']] : [dPos[s], dPos[e], dPos['gap']]
//     return f(ex, ey, sx, sy, "", gx, gy)
// }

// const toD = (code, board) => {
//     const g = (ways, r = '') => {
//         const res = []
//         const _g = (ways, r) => {
//             if (ways.length === 0) {
//                 res.push(r)
//                 return
//             }
//             for (const w of ways[0]) {
//                 _g(ways.slice(1), r + w)
//             }
//         }
//         _g(ways, r)
//         return res
//     }

//     code = 'A' + code
//     const ways = []
//     for (let i = 1; i < code.length; i++) {
//         ways.push(findWays(code[i - 1], code[i], board))
//     }
//     return g(ways)
// }

// let res = 0
// for (const code of codes) {
//     let d = toD(code, 'n')
//     for (let i = 0; i < 25; i++) {
//         let nd = d.map(d => toD(d, 'd'))
//         let min = Infinity
//         for (const d of nd) {
//             if (d[0].length < min) min = d[0].length
//         }
//         d = nd.filter(d => d[0].length === min).flat()
//     }
//     res += d[0].length * Number(code.slice(0, -1))
// }
// console.log(res)
