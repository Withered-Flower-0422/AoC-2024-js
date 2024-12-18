const choice = 1
const data = require('fs').readFileSync(require('path').join(__dirname, choice ? 'puzzle.txt' : 'example.txt'), 'utf8')
const [r, c] = choice ? [70, 70] : [6, 6]

const corrupted = new Set(data.split('\r\n').slice(0, choice ? 1024 : 12))
const seen = new Set(['0,0'])
const q = [[0, 0, 0]]
while (q.length) {
    const [x, y, step] = q.shift()
    if (x === r && y === c) { console.log(step); break }
    [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]
        .filter(([nx, ny]) => nx >= 0 && nx <= r && ny >= 0 && ny <= c && !corrupted.has(`${nx},${ny}`) && !seen.has(`${nx},${ny}`))
        .forEach(([nx, ny]) => { seen.add(`${nx},${ny}`); q.push([nx, ny, step + 1]) })
}
