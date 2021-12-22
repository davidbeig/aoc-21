const fs = require('fs')

class Sonar {
  constructor (measurements) {
    this.measurements = measurements
  }

  increments () {
    let increases = 0

    for (let i = 0; i < this.measurements.length - 1; i++) {
      const current = parseInt(measurements[i])
      const next = parseInt(measurements[i + 1])
      const isIncreased = (next > current)

      if (isIncreased) { increases++ }
    }

    return increases
  }

  windowIncreases () {
    let increases = 0

    for (let i = 0; i < this.measurements.length - 3; i++) {
      const current = parseInt(measurements[i])
      const next = parseInt(measurements[i + 3])
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

const windowIncreases = sonar.windowIncreases()
console.info(windowIncreases)
