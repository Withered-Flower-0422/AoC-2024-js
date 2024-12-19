const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

const [materials, productions] = data.replace(/\, /g, '\r\n').split('\r\n\r\n').map(g => g.split('\r\n'))

const canBeProduced = p => {
    const l = []
    for (const m of materials) {
        if (p === m) return true
        if (p.endsWith(m)) l.push(p.slice(0, -m.length))
    }
    for (const r of l) {
        if (canBeProduced(r)) return true
    }
    return false
}

console.log(productions.filter(p => canBeProduced(p)).length)
