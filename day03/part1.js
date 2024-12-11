const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example1.txt'), 'utf8')

const programs = data.match(/mul\(\d{1,3},\d{1,3}\)/g)

let result = 0
for (const program of programs) {
    const [a, b] = program.match(/\d{1,3}/g).map(Number)
    result += a * b
}

console.log(result)
