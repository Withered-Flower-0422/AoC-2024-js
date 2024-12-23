const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

const computers = {}
data.split('\r\n').forEach(line => {
    const [a, b] = line.split('-')
    if (!computers[a]) computers[a] = []
    if (!computers[b]) computers[b] = []
    computers[a].push(b)
    computers[b].push(a)
})

let max = 0
let maxKey = ''
const seen = new Set()
for (const computer in computers) {
    let cnt = 1
    const keys = []
    for (let i = 0; i < computers[computer].length - 1; i++) {
        for (let j = i + 1; j < computers[computer].length; j++) {
            if (computers[computers[computer][i]].includes(computers[computer][j])) {
                const key = [computer, computers[computer][i], computers[computer][j]]
                const keyStr = key.sort().join()
                if (seen.has(keyStr)) continue
                seen.add(keyStr)
                keys.push(...key)
                cnt++
            }
        }
    }
    if (cnt > max) {
        max = cnt
        maxKey = [...new Set(keys)].sort().join()
    }
}
console.log(maxKey)
