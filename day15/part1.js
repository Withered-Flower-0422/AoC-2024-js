const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

const [grid, movements] = data.split('\r\n\r\n').map((s, i) => i ? s.replace(/\r\n/g, '') : s.split('\r\n').map(row => row.split('')))
const r = grid.length; const c = grid[0].length
const curPos = (() => { // This will also replace '@' with '.' in the grid
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            if (grid[i][j] === '@') {
                grid[i][j] = '.'
                return [i, j]
            }
        }
    }
})()
const dir = { '^': [-1, 0], 'v': [1, 0], '<': [0, -1], '>': [0, 1] }

const move = d => {
    const nx = curPos[0] + dir[d][0], ny = curPos[1] + dir[d][1]
    let _nx = nx, _ny = ny

    const q = []
    while (true) {
        if (grid[_nx][_ny] === '#') return
        if (grid[_nx][_ny] === '.') break
        _nx += dir[d][0]
        _ny += dir[d][1]
        q.push([_nx, _ny])
    }

    curPos[0] = nx; curPos[1] = ny
    for (const [x, y] of q) grid[x][y] = 'O'
    grid[nx][ny] = '.'
}

for (const m of movements) move(m)

let res = 0
for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
        if (grid[i][j] === 'O') res += 100 * i + j
    }
}
console.log(res)
