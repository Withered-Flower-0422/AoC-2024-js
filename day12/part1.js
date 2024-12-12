const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

const farm = data.split('\r\n')
const r = farm.length, c = farm[0].length

const getNeighbors = (x, y) => [[-1, 0], [1, 0], [0, -1], [0, 1]].map(([dx, dy]) => {
    const nx = x + dx, ny = y + dy
    if (nx < 0 || nx >= r || ny < 0 || ny >= c) return null
    return farm[nx][ny] === farm[x][y] ? [nx, ny] : null
}).filter(n => n !== null)

const sidesCount = (x, y) => 4 - getNeighbors(x, y).length

const allCoords = new Set()
for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
        allCoords.add([i, j].toString())
    }
}

const groupOfRegions = []
while (allCoords.size) {
    const [x, y] = allCoords.values().next().value.split(',').map(Number)

    const s = new Set()
    const q = [[x, y]]
    while (q.length) {
        const [cx, cy] = q.shift()
        if (!allCoords.delete([cx, cy].toString())) continue
        s.add([cx, cy].toString())
        for (const [nx, ny] of getNeighbors(cx, cy)) {
            if (!s.has([nx, ny].toString())) q.push([nx, ny])
        }
    }
    groupOfRegions.push(s)
}

console.log(
    groupOfRegions
        .map(s => s.size * [...s].map(c => c.split(',').map(Number)).map(([x, y]) => sidesCount(x, y)).reduce((a, b) => a + b, 0))
        .reduce((a, b) => a + b, 0)
)