const choice = 1
const data = require('fs').readFileSync(require('path').join(__dirname, choice ? 'puzzle.txt' : 'example.txt'), 'utf8')
const [tx, ty] = choice ? [101, 103] : [11, 7]
const hx = (tx - 1) / 2, hy = (ty - 1) / 2

Array.prototype.counts = function () {
    const res = {}
    for (const item of this) {
        res[item] = (res[item] || 0) + 1
    }
    return res
}

const robots = data.split('\r\n').map(line => line.match(/-?\d+/g).map(Number))

const getQuadrant = (robot, sceond = 100) => {
    let [x, y, dx, dy] = robot
    x += dx * sceond; y += dy * sceond
    x %= tx; y %= ty
    if (x < 0) x += tx; if (y < 0) y += ty

    let q = null
    if (x < hx && y < hy) {
        q = 1
    } else if (x > hx && y < hy) {
        q = 2
    } else if (x < hx && y > hy) {
        q = 3
    } else if (x > hx && y > hy) {
        q = 4
    }
    return q
}

console.log(
    Object.values(robots.map(robot => getQuadrant(robot)).filter(q => q !== null).counts()).reduce((a, b) => a * b, 1)
)
