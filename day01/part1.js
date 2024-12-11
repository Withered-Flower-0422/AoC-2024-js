const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

const list1 = [], list2 = []

for (const line of data.split('\r\n')) {
    const nums = line.split('   ')
    list1.push(+nums[0])
    list2.push(+nums[1])
}

list1.sort((a, b) => a - b)
list2.sort((a, b) => a - b)

let distance = 0
for (let i = 0; i < list1.length; i++) {
    distance += Math.abs(list1[i] - list2[i])
}

console.log(distance)
