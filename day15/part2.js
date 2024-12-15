const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

const [grid, movements] = data.split('\r\n\r\n').map((s, i) => {
    if (i === 0) {
        const res = s.split('\r\n')
        for (let i = 0; i < res.length; i++) {
            res[i] = res[i].replace(/#/g, '##')
            res[i] = res[i].replace(/O/g, '[]')
            res[i] = res[i].replace(/\./g, '..')
            res[i] = res[i].replace(/@/g, '@.')
        }
        return res.map(s => s.split(''))
    }
    return s.replace(/\r\n/g, '')
})
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

Array.prototype.has = function (v) {
    for (const i of this) if (i[0] === v[0] && i[1] === v[1]) return true
    return false
}

const move = d => {
    const [cx, cy] = curPos

    const q = [[cx, cy]]
    for (let [cx, cy] of q) {
        let nx = cx + dir[d][0], ny = cy + dir[d][1]
        if (q.has([nx, ny])) continue
        if (grid[nx][ny] === '#') return
        if (grid[nx][ny] === '[') {
            q.push([nx, ny])
            q.push([nx, ny + 1])
        } else if (grid[nx][ny] === ']') {
            q.push([nx, ny])
            q.push([nx, ny - 1])
        }
    }
    const copy = grid.map(row => row.slice())
    for (const [x, y] of q) grid[x][y] = '.'
    for (const [x, y] of q) grid[x + dir[d][0]][y + dir[d][1]] = copy[x][y]
    curPos[0] += dir[d][0]; curPos[1] += dir[d][1]
}

for (const m of movements) move(m)

let res = 0
for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
        if (grid[i][j] === '[') res += 100 * i + j
    }
}
console.log(res)
