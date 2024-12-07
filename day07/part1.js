const fs = require('fs')
const path = require('path')

const choice = 1
const file = ['example.txt', 'puzzle.txt'][choice]
const data = fs.readFileSync(path.join(__dirname, file), 'utf8')

const equations = data.split('\r\n')

const canHoldTrue = e => {
    const [[target], nums] = e.split(': ').map(s => s.split(' ').map(Number))
    const _canHoldTrue = (n, t) => {
        if (n.length === 1) return n[0] === t
        const n0 = n.slice(2)
        const n1 = [n[0] + n[1], ...n0]
        const n2 = [n[0] * n[1], ...n0]
        return _canHoldTrue(n1, t) || _canHoldTrue(n2, t)
    }
    return _canHoldTrue(nums, target)
}

let cnt = 0
equations.forEach(e => {
    if (canHoldTrue(e)) cnt += +e.split(': ')[0]
})

console.log(cnt)
