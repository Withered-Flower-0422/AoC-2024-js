const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example2.txt'), 'utf8')

const programs = data.match(/(mul\(\d{1,3},\d{1,3}\))|(don't\(\))|(do\(\))/g)

let result = 0
let enabled = true
for (const program of programs) {
    switch (program) {
        case "don't()":
            enabled = false
            break
        case "do()":
            enabled = true
            break
        default:
            if (enabled) {
                const [a, b] = program.match(/\d{1,3}/g).map(Number)
                result += a * b
            }
    }
}

console.log(result)
