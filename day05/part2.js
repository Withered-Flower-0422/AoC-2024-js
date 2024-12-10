const fs = require('fs')
const path = require('path')

const choice = 1
const file = ['example.txt', 'puzzle.txt'][choice]
const data = fs.readFileSync(path.join(__dirname, file), 'utf8')

/**
 * 
 * @param  {...number} arrays 
 * @returns {number[][]}
 */
const zip = (...arrays) => {
    const result = []
    for (let i = 0; i < arrays[0].length; i++) {
        result.push(arrays.map(array => array[i]))
    }
    return result
}

/**
 * 
 * @param {number[]} value 
 * @returns {number[]}
 */
Array.prototype.findAllValueIndexes = function (value) {
    const indexes = []
    for (let i = 0; i < this.length; i++) {
        if (this[i] === value) {
            indexes.push(i)
        }
    }
    return indexes
}

const [rules, updates] =
    data.replace(/\|/g, ',')
        .split('\r\n\r\n')
        .map(x => x.split('\r\n').map(y => y.split(',')).map(z => z.map(Number)))

const [former, latter] = zip(...rules)

/**
 * 
 * @param {number[]} update
 */
const isRightOrder = (update, f = former, l = latter) => {
    for (let i = 1; i < update.length; i++) {
        if (f.findAllValueIndexes(update[i]).map(index => l[index]).some(x => update.slice(0, i).includes(x)))
            return false
    }
    return true
}

/**
 * 
 * @param {number[]} update
 */
const fixOrder = (update, f = former, l = latter) => {
    do {
        for (let i = 1; i < update.length; i++) {
            const aheahNumbers = update.slice(0, i)
            const latterNumbers = f.findAllValueIndexes(update[i]).map(index => l[index])
            outer: for (let j = 0; j < latterNumbers.length; j++) {
                for (let k = 0; k < aheahNumbers.length; k++) {
                    if (latterNumbers[j] === aheahNumbers[k]) {
                        [update[i], update[k]] = [update[k], update[i]]
                        break outer
                    }
                }
            }
        }
    } while (!isRightOrder(update, f, l))
}

let sumMiddle = 0
for (const update of updates) {
    if (!isRightOrder(update)) {
        fixOrder(update)
        sumMiddle += update[(update.length - 1) / 2]
    }
}
console.log(sumMiddle)
