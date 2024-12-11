const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

const blocks = (() => {
    const res = []
    for (let i = 0; i < data.length; i++) {
        res.push(...new Array(+data[i]).fill(i % 2 ? null : i / 2))
    }
    return res
})()

let i = 0, j = blocks.length - 1
while (true) {
    while (blocks[i] !== null) i++
    while (blocks[j] === null) j--
    if (i >= j) break
    [blocks[i], blocks[j]] = [blocks[j], blocks[i]]
}
console.log(blocks.filter(x => x !== null).reduce((acc, x, i) => acc + x * i, 0))
