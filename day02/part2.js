const data = require('fs').readFileSync(require('path').join(__dirname, 1 ? 'puzzle.txt' : 'example.txt'), 'utf8')

const reports = data.split('\r\n').map(report => report.split(' ').map(Number))

const isSafe = report => {
    const diff = report[1] - report[0]
    if (diff === 0) return false
    const sign = diff > 0 ? 1 : -1
    for (let i = 1; i < report.length; i++) {
        const step = (report[i] - report[i - 1]) * sign
        if (!(step >= 1 && step <= 3)) return false
    }
    return true
}

const caculate = reports => {
    let cnt = 0
    reports.forEach(report => {
        if (isSafe(report)) {
            cnt++
        } else {
            for (let i = 0; i < report.length; i++) {
                const newReport = [...report.slice(0, i), ...report.slice(i + 1)]
                if (isSafe(newReport)) {
                    cnt++
                    break
                }
            }
        }
    })
    return cnt
}

console.log(caculate(reports))
