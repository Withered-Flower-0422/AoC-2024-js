const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

const count = (n, times) => {
    const cache = {}
    const _count = (n, times) => {
        if (`${n}_${times}` in cache) return cache[`${n}_${times}`]
        let res
        if (times === 0) {
            res = 1
        } else if (n === '0') {
            res = _count('1', times - 1)
        } else if (n.length % 2 === 0) {
            res = _count(n.slice(0, n.length / 2), times - 1) + _count((+n.slice(n.length / 2)).toString(), times - 1)
        } else {
            res = _count((+n * 2024).toString(), times - 1)
        }
        return cache[`${n}_${times}`] = res
    }
    return _count(n, times)
}

console.log(data.split(' ').map(s => count(s, 75)).reduce((acc, cur) => acc + cur, 0))
