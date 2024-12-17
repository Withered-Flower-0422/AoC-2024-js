const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example1.txt'), 'utf8')

let [A, B, C, ...programs] = data.match(/\d+/g).map(Number)
let pointer = 0
const outputs = []

const operands = [
    () => 0,
    () => 1,
    () => 2,
    () => 3,
    () => A,
    () => B,
    () => C,
    () => -1,
]

const instructions = [
    i => A = A >> operands[i](),
    i => B ^= i,
    i => B = operands[i]() % 8,
    i => {
        if (A === 0) return
        pointer = i - 2
    },
    i => B ^= C,
    i => outputs.push(operands[i]() % 8),
    i => B = A >> operands[i](),
    i => C = A >> operands[i](),
]

while (pointer < programs.length) {
    instructions[programs[pointer]](programs[pointer + 1])
    pointer += 2
}

console.log(outputs.join(','))
