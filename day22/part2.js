const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example2.txt'), 'utf8')

const seq = {}
data.split('\r\n').map(BigInt).map(num => ((num, i) => {
    const n = [num % 10n], c = []
    while (i--) {
        num = (num * 64n ^ num) % 16777216n
        num = (num / 32n ^ num) % 16777216n
        num = (num * 2048n ^ num) % 16777216n
        n.push(num % 10n)
    }
    for (let j = 1; j < n.length; j++) {
        c.push(n[j] - n[j - 1])
    }
    return { n, c }
})(num, 2000)).forEach(buyer => {
    const seen = new Set()
    for (let i = 0; i < buyer.c.length - 3; i++) {
        const seqStr = buyer.c.slice(i, i + 4).join()
        if (seen.has(seqStr)) continue
        seen.add(seqStr)
        if (!(seqStr in seq)) seq[seqStr] = 0n
        seq[seqStr] += buyer.n[i + 4]
    }
})
console.log(Math.max(...Object.values(seq).map(Number)))
