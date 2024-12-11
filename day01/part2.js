const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

const list1 = [], list2 = []

for (const line of data.split('\r\n')) {
    const nums = line.split('   ')
    list1.push(+nums[0])
    list2.push(+nums[1])
}

Array.prototype.counts = function () {
    const counts = {}
    for (const elem of this) {
        counts[elem] = (counts[elem] || 0) + 1
    }
    return counts
}

const counts = list2.counts()

let similarityScore = 0

for (const num of list1) {
    if (counts[num]) {
        similarityScore += num * counts[num]
    }
}

console.log(similarityScore)
