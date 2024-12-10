const fs = require('fs')
const path = require('path')

const choice = 1
const file = ['example.txt', 'puzzle.txt'][choice]
const data = fs.readFileSync(path.join(__dirname, file), 'utf8')

const grid = data.split('\r\n')
const [r, c] = [grid.length, grid[0].length]
const dir = [[-1, 0], [0, 1], [1, 0], [0, -1]] // up, right, down, left

const getStartPosition = () => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '^') return [i, j]
        }
    }
}

let curPosition = getStartPosition()
let curFace = 0
const reachedAreas = new Set()

const walk = () => { // reurn false if it is out of map, true otherwise
    reachedAreas.add(curPosition.toString())
    while (true) {
        const [x, y] = [curPosition[0] + dir[curFace][0], curPosition[1] + dir[curFace][1]]
        if (x < 0 || x >= r || y < 0 || y >= c) return false // out of map
        if (grid[x][y] === '#') {
            curFace = (curFace + 1) % 4
        } else {
            curPosition = [x, y]
            return true
        }
    }
}

let isInMap = true
while (isInMap) { // The puzzle ensures that the loop will terminate
    isInMap = walk()
}

console.log(reachedAreas.size)
