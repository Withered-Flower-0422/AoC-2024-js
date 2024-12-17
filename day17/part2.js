// This solution can finally get the answer maybe **years later**. (which means it's still unsolved)
// I'll redo this part with dinamic programming in the future.
const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example2.txt'), 'utf8')

const [_, iB, iC, ...programs] = data.match(/\d+/g).map(Number)
outer: for (let k = 5110000000; ; k++) { // last number to try: 5110000000, but the answer may be larger than 1e13
    let A = k, B = iB, C = iC, j = 0, flag = null, pointer = 0
    if (k % 10000000 === 0) console.log(k)
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
        i => {
            if (programs[j] === operands[i]() % 8) {
                j++
                if (j === programs.length) flag = true
            } else {
                flag = false
            }
        },
        i => B = A >> operands[i](),
        i => C = A >> operands[i](),
    ]

    while (pointer < programs.length) {
        instructions[programs[pointer]](programs[pointer + 1])
        if (programs[pointer] === 5) {
            if (flag === true) {
                console.log(k)
                break outer
            } else if (flag === false) {
                break
            }
        }
        pointer += 2
    }
}
