const fs = require('fs')
const path = require('path')

const choice = 1
const file = ['example1.txt', 'puzzle.txt'][choice]
const data = fs.readFileSync(path.join(__dirname, file), 'utf8')

const programs = data.match(/mul\(\d{1,3},\d{1,3}\)/g)

let result = 0
for (const program of programs) {
    const [a, b] = program.match(/\d{1,3}/g).map(Number)
    result += a * b
}

console.log(result)
