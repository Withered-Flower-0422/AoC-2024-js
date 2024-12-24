// unsolved
const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

const [initialValues, conn] = data.split('\r\n\r\n').map(s => s.split('\r\n'))
const connects = conn.map(c => c.split(' '))
const values = initialValues.reduce((acc, v) => {
    const [k, n] = v.split(': ')
    acc[k] = Number(n)
    return acc
}, {})
for (const [a, _, b, __, c] of connects) {
    if (!(a in values)) values[a] = null
    if (!(b in values)) values[b] = null
    if (!(c in values)) values[c] = null
}

// outer: while (true) {
//     for (const [a, o, b, _, c] of connects) {
//         if (values[c] !== null) continue
//         if (values[a] === null || values[b] === null) continue
//         switch (o) {
//             case 'AND':
//                 values[c] = values[a] & values[b]
//                 break
//             case 'OR':
//                 values[c] = values[a] | values[b]
//                 break
//             case 'XOR':
//                 values[c] = values[a] ^ values[b]
//                 break
//         }
//     }
//     for (const k in values) {
//         if (k[0] === 'z' && values[k] === null) continue outer
//     }
//     break
// }

// let res = 0
// for (const k in values) {
//     if (k[0] === 'z' && values[k]) res += 2 ** Number(k.slice(1))
// }
// console.log(res)
