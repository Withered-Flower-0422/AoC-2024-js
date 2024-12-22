const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

console.log(
    Number(data.split('\r\n').map(BigInt).map(num => ((num, i) => {
        while (i--) {
            num = (num * 64n ^ num) % 16777216n
            num = (num / 32n ^ num) % 16777216n
            num = (num * 2048n ^ num) % 16777216n
        }
        return num
    })(num, 2000)).reduce((acc, cur) => acc + cur, 0n))
)
