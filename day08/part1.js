const fs = require('fs')
const path = require('path')

const choice = 1
const file = ['example.txt', 'puzzle.txt'][choice]
const data = fs.readFileSync(path.join(__dirname, file), 'utf8')

const grid = data.split('\r\n')
const r = grid.length, c = grid[0].length

const uniqueLocs = new Set()
Object.values((() => {
    const res = {}
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            if (grid[i][j] !== '.') res[grid[i][j]] ? res[grid[i][j]].push([i, j]) : res[grid[i][j]] = [[i, j]]
        }
    }
    return res
})()).forEach(antennas => antennas.forEach((antenna, i, arr) => arr.filter((_, j) => i !== j).forEach(other => {
    const x = 2 * antenna[0] - other[0], y = 2 * antenna[1] - other[1]
    if (x < 0 || x >= r || y < 0 || y >= c) return // out of bounds
    uniqueLocs.add(`${x},${y}`)
})))
console.log(uniqueLocs.size)
