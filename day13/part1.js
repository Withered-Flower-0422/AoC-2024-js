const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

const isInt = (n, threshold = 1e-3) => Math.abs(n - Math.round(n)) < threshold

const machines = data.split('\r\n\r\n')

const calc = machine => {
    let [xa, ya, xb, yb, xp, yp] = machine.match(/\d+/g).map(Number)
    let a = (xp / xb - yp / yb) / (xa / xb - ya / yb)
    let b = (xp / xa - yp / ya) / (xb / xa - yb / ya)

    if (!(isInt(a) && isInt(b))) return 0

    a = Math.round(a); b = Math.round(b)
    if (a > 100 || b > 100) return 0
    return 3 * a + b
}

console.log(machines.map(calc).reduce((acc, curr) => acc + curr, 0)) 
