const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

const map = data.split('\r\n').map(line => line.split('').map(Number))
const r = map.length, c = map[0].length

const getScore = pos => {
    const getAroundPos = (x, y) => [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
    ].filter(([x, y]) => x >= 0 && x < r && y >= 0 && y < c)

    const walk = (x, y, v) => {
        const res = []
        getAroundPos(x, y).forEach(([nx, ny]) => {
            if (map[nx][ny] === v + 1) res.push([nx, ny, v + 1])
        })
        return res
    }

    const ends = new Set()
    const queue = [[...pos, 0]]
    while (queue.length) {
        const [x, y, v] = queue.shift()
        if (v === 9) {
            ends.add(`${x},${y}`)
            continue
        }
        queue.push(...walk(x, y, v))
    }
    return ends.size
}

console.log((() => {
    const res = []
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            if (map[i][j] === 0) res.push([i, j])
        }
    }
    return res
})().map(getScore).reduce((acc, cur) => acc + cur, 0))
