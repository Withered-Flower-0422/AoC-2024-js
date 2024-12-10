const fs = require('fs')
const path = require('path')

const choice = 1
const file = ['example.txt', 'puzzle.txt'][choice]
const data = fs.readFileSync(path.join(__dirname, file), 'utf8')

const list1 = []
const list2 = []

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
