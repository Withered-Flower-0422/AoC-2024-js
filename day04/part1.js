const fs = require('fs')
const path = require('path')

const choice = 1
const file = ['example.txt', 'puzzle.txt'][choice]
const data = fs.readFileSync(path.join(__dirname, file), 'utf8')

const wordSearch = data.split('\r\n')

/**
 * 
 * @param {number} x 
 * @param {number} y 
 */
const search = (x, y) =>
    [
        [ // right
            [x, y],
            [x, y + 1],
            [x, y + 2],
            [x, y + 3],
        ],
        [ // left
            [x, y],
            [x, y - 1],
            [x, y - 2],
            [x, y - 3],
        ],
        [ // down
            [x, y],
            [x + 1, y],
            [x + 2, y],
            [x + 3, y],
        ],
        [ // up
            [x, y],
            [x - 1, y],
            [x - 2, y],
            [x - 3, y],
        ],
        [ // down-right
            [x, y],
            [x + 1, y + 1],
            [x + 2, y + 2],
            [x + 3, y + 3],
        ],
        [ // up-right
            [x, y],
            [x - 1, y + 1],
            [x - 2, y + 2],
            [x - 3, y + 3],
        ],
        [ // down-left
            [x, y],
            [x + 1, y - 1],
            [x + 2, y - 2],
            [x + 3, y - 3],
        ],
        [ // up-left
            [x, y],
            [x - 1, y - 1],
            [x - 2, y - 2],
            [x - 3, y - 3],
        ]
    ]
        .filter(coords => coords.every(coord => coord[0] >= 0 && coord[0] < wordSearch.length && coord[1] >= 0 && coord[1] < wordSearch[0].length))
        .map(coords => coords.map(coord => wordSearch[coord[0]][coord[1]]).join(''))
        .filter(word => word === 'XMAS').length

let cnt = 0

for (let i = 0; i < wordSearch.length; i++) {
    for (let j = 0; j < wordSearch[0].length; j++) {
        if (wordSearch[i][j] === 'X') cnt += search(i, j)
    }
}

console.log(cnt)
