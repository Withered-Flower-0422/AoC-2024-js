const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

const grid = data.split('\r\n')
const [r, c] = [grid.length, grid[0].length]
const dir = [[-1, 0], [0, 1], [1, 0], [0, -1]] // up, right, down, left
const startPosition = (() => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '^') return [i, j]
        }
    }
})()

const isLoop = (g = grid) => {
    let loop = false

    let curPosition = startPosition
    let curFace = 0
    const reachedAreasWithFace = new Set()

    const _walk = () => { // return false if it is out of map or loop, true otherwise
        const curState = curPosition.toString() + curFace
        if (reachedAreasWithFace.has(curState)) {
            loop = true
            return false // loop
        } else {
            reachedAreasWithFace.add(curState)
        }

        while (true) {
            const [x, y] = [curPosition[0] + dir[curFace][0], curPosition[1] + dir[curFace][1]]
            if (x < 0 || x >= r || y < 0 || y >= c) return false // out of map
            if (g[x][y] === '#') {
                curFace = (curFace + 1) % 4
            } else {
                curPosition = [x, y]
                return true
            }
        }
    }

    let isInMapAndNotLoop = true
    while (isInMapAndNotLoop) {
        isInMapAndNotLoop = _walk()
    }

    return loop
}

let cnt = 0;
(() => { // return a set of all reached areas in the original grid
    const reachedAreas = new Set()

    let curPosition = startPosition
    let curFace = 0

    const _walk = () => { // reurn false if it is out of map, true otherwise
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
    while (isInMap) {
        isInMap = _walk()
    }

    return reachedAreas
})().forEach(area => {
    const [x, y] = area.split(',').map(Number)
    if (grid[x][y] === '^') return // ignore the starting point
    const newGrid = [...grid]
    newGrid[x] = newGrid[x].slice(0, y) + '#' + newGrid[x].slice(y + 1)
    if (isLoop(newGrid)) cnt++
})

console.log(cnt)
