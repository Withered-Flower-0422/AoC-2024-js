const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

const computers = {}
data.split('\r\n').forEach(line => {
    const [a, b] = line.split('-')
    if (!computers[a]) computers[a] = []
    if (!computers[b]) computers[b] = []
    computers[a].push(b)
    computers[b].push(a)
})

let cnt = 0
const seen = new Set()
for (const computer in computers) {
    if (computer[0] !== 't') continue

    for (let i = 0; i < computers[computer].length - 1; i++) {
        for (let j = i + 1; j < computers[computer].length; j++) {
            if (computers[computers[computer][i]].includes(computers[computer][j])) {
                const key = [computer, computers[computer][i], computers[computer][j]].sort().join()
                if (seen.has(key)) continue
                seen.add(key)
                cnt++
            }
        }
    }
}
console.log(cnt)
