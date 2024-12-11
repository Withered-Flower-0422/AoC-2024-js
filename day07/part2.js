const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

console.log(data.replace(/:/g, '').split('\r\n').map(e => e.split(' ').map(Number)).map(
    function $(e) {
        const t = e[0], n = e.slice(1)
        if (t < n[0]) return 0
        if (n.length === 1) return n[0] === t ? t : 0
        const _ = n.slice(2)
        return $([t, n[0] + n[1], ..._])
            || $([t, n[0] * n[1], ..._])
            || $([t, +`${n[0]}${n[1]}`, ..._])
    }
).reduce((acc, e) => acc + e, 0))
