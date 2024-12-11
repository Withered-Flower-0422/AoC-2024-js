const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

const wordSearch = data.split('\r\n')

const isX_MAS = (x, y) =>
    [
        [ // down-right
            [x - 1, y - 1],
            [x, y],
            [x + 1, y + 1],
        ],
        [ // up-right
            [x + 1, y - 1],
            [x, y],
            [x - 1, y + 1],
        ],
        [ // down-left
            [x - 1, y + 1],
            [x, y],
            [x + 1, y - 1],
        ],
        [ // up-left
            [x + 1, y + 1],
            [x, y],
            [x - 1, y - 1],
        ]
    ]
        .filter(coords => coords.every(coord => coord[0] >= 0 && coord[0] < wordSearch.length && coord[1] >= 0 && coord[1] < wordSearch[0].length))
        .map(coords => coords.map(coord => wordSearch[coord[0]][coord[1]]).join(''))
        .filter(word => word === 'MAS').length === 2

let cnt = 0

for (let i = 0; i < wordSearch.length; i++) {
    for (let j = 0; j < wordSearch[0].length; j++) {
        if (wordSearch[i][j] === 'A') cnt += +isX_MAS(i, j)
    }
}

console.log(cnt)
