const fs = require('fs')

class Sonar {
  constructor (measurements) {
    this.measurements = measurements
  }

  increments () {
    let increases = 0

    for (let i = 0; i < measurements.length - 1; i++) {
      const current = parseInt(measurements[i], 10)
      const next = parseInt(measurements[i + 1], 10)
      const isIncreased = (next > current)

      if (isIncreased) { increases++ }
    }

    return increases
  }
}

const measurements = fs.readFileSync('input', 'utf8').toString().trim().split('\n')

const sonar = new Sonar(measurements)
const increases = sonar.increments()
console.info(increases)
