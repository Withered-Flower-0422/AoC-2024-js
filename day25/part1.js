const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

const r = 7, c = 5

const keys = [], locks = []
for (const schematic of data.split('\r\n\r\n').map(s => s.split('\r\n'))) {
    const list = []
    if (schematic[0][0] === '#') { // lock
        for (let i = 0; i < r; i++) {
            for (let j = 0; j < c; j++) {
                if (list[j] === undefined && schematic[i][j] === '.') list[j] = i - 1
            }
        }
        locks.push(list)
    } else { // key
        for (let i = r - 1; i >= 0; i--) {
            for (let j = 0; j < c; j++) {
                if (list[j] === undefined && schematic[i][j] === '.') list[j] = r - i - 2
            }
        }
        keys.push(list)
    }
}

let cnt = 0
for (const key of keys) {
    for (const lock of locks) {
        if (lock.map((v, i) => v + key[i]).every(v => v <= r - 2)) cnt++
    }
}
console.log(cnt)
