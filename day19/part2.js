const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

const [materials, productions] = data.replace(/\, /g, '\r\n').split('\r\n\r\n').map(g => g.split('\r\n'))

const ways2Produce = p => {
    const cache = {}
    const _ways2Produce = p => {
        if (p in cache) return cache[p]
        let cnt = 0
        const l = []
        for (const m of materials) {
            if (p === m) cnt++
            if (p.endsWith(m)) cnt += _ways2Produce(p.slice(0, -m.length))
        }
        return cache[p] = cnt
    }
    return _ways2Produce(p)
}

console.log(productions.map(p => ways2Produce(p)).reduce((a, b) => a + b))
