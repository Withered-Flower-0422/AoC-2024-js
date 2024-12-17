// unsolved
const data = require('fs').readFileSync(require('path').join(__dirname, ['example1.txt', 'example2.txt', 'puzzle.txt'][0]), 'utf8')
const maze = data.split('\r\n')
const r = maze.length, c = maze[0].length
// const Heap = require("D:\\nodejs\\node_global\\node_modules\\heap-js").Heap

// const pq = new Heap((a, b) => a[0] - b[0])
// const seen = new Set()
// pq.push([0, r - 2, 1, 0, 1])

// while (pq.length) {
//     const [cost, r, c, dr, dc] = pq.pop()
//     seen.add([r, c, dr, dc].join(','))
//     if (maze[r][c] === 'E') {
//         console.log(cost)
//         break
//     }
//     for (const [newCost, nr, nc, ndr, ndc] of [
//         [cost + 1, r + dr, c + dc, dr, dc],
//         [cost + 1000, r, c, dc, -dr],
//         [cost + 1000, r, c, -dc, dr],
//     ]) {
//         if (maze[nr][nc] === '#' || seen.has([nr, nc, ndr, ndc].join(','))) continue
//         pq.push([newCost, nr, nc, ndr, ndc])
//     }
// }
