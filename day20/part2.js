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
        for (let radius = 2; radius < 21; radius++) {
            for (let dr = 0; dr <= radius; dr++) {
                const dc = radius - dr
                for (const [nr, nc] of
                    [...new Set(
                        [
                            [i + dr, j + dc],
                            [i + dr, j - dc],
                            [i - dr, j + dc],
                            [i - dr, j - dc],
                        ].map(([x, y]) => `${x},${y}`)
                    )].map(str => str.split(',').map(Number))
                ) {
                    if (nr < 0 || nr >= r || nc < 0 || nc >= c) continue
                    if (dists[nr][nc] - dists[i][j] >= 100 + radius) cnt++
                }
            }
        }
    }
}
console.log(cnt)
