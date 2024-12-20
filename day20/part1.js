const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

const grid = data.split('\r\n')
const r = grid.length, c = grid[0].length

let [cr, cc] = (() => {
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            if (grid[i][j] === 'S') {
                return [i, j]
            }
        }
    }
})()

const dists = new Array(r).fill().map(() => new Array(c).fill(-1))
dists[cr][cc] = 0

while (grid[cr][cc] !== 'E') {
    for (const [nr, nc] of [[cr - 1, cc], [cr + 1, cc], [cr, cc - 1], [cr, cc + 1]]) {
        if (nr < 0 || nr >= r || nc < 0 || nc >= c) continue
        if (grid[nr][nc] === '#') continue
        if (dists[nr][nc] !== -1) continue
        dists[nr][nc] = dists[cr][cc] + 1
        cr = nr
        cc = nc
    }
}

let cnt = 0
for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
        if (dists[i][j] === -1) continue
        for (const [nr, nc] of [[i - 2, j], [i + 2, j], [i, j - 2], [i, j + 2]]) {
            if (nr < 0 || nr >= r || nc < 0 || nc >= c) continue
            if (dists[nr][nc] - dists[i][j] >= 102) cnt++
        }
    }
}
console.log(cnt)
