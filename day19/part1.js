const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

const [materials, productions] = data.replace(/\, /g, '\r\n').split('\r\n\r\n').map(g => g.split('\r\n'))

const canBeProduced = p => {
    for (const m of materials) {
        if (p === m) return true
        if (p.endsWith(m) && canBeProduced(p.slice(0, -m.length))) return true
    }
    return false
}

console.log(productions.filter(p => canBeProduced(p)).length)
