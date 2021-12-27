const fs = require('fs')
const _ = require('lodash')

class Diagnostic {
  #diagnostic 
  #epsilonRate
  #gammaRate
  #co2Scrubber
  #oxigenGenerator

  constructor (diagnostic) {
    this.#diagnostic = diagnostic
    this.#epsilonRate = this.#gammaRate = 0
    this.#co2Scrubber = this.#oxigenGenerator = []
    this.process()
  }

  process () {
    let mostCommonDiagnostic = [...this.#diagnostic]
    let lessCommonDiagnostic = [...this.#diagnostic]
    for (let i = 0; i < this.#diagnostic[0].length; i++) {
      if (mostCommonDiagnostic.length != 1) mostCommonDiagnostic = this.#processColumnByMostCommon(mostCommonDiagnostic, i)
      if (lessCommonDiagnostic.length != 1) lessCommonDiagnostic = this.#processColumnByLessCommon(lessCommonDiagnostic, i)

      this.#epsilonRate = (this.#epsilonRate << 1) + this.#findMostCommon(this.#diagnostic, i)
      this.#gammaRate = (this.#gammaRate << 1) + !this.#findMostCommon(this.#diagnostic, i)
    }

    this.#oxigenGenerator = parseInt(mostCommonDiagnostic[0], 2)
    this.#co2Scrubber = parseInt(lessCommonDiagnostic[0], 2)
  }

  #processColumnByMostCommon(array, position) {
    const mostCommon = this.#findMostCommon(array, position)
    array = array.filter( line => line[position] == mostCommon)
    return array
  }

  #processColumnByLessCommon(array, position) {
    const lessCommon = !this.#findMostCommon(array, position)
    array = array.filter( line => line[position] == lessCommon)
    return array
  }

  #findMostCommon(array, position) {
    let countOfOnes = 0
    for (let i = 0; i < array.length; i++) {
      countOfOnes += array[i][position] == 1
    }
    
    return countOfOnes >= (array.length / 2 )
  }

  powerConsumption () {
    return this.#gammaRate * this.#epsilonRate
  }

  lifeSupport () {
    return this.#oxigenGenerator * this.#co2Scrubber
  }
}

const input = fs.readFileSync('input').toString().split('\n')
const diagnostic = new Diagnostic(input)
const powerConsumption = diagnostic.powerConsumption()
const lifeSupport = diagnostic.lifeSupport()
console.info(powerConsumption)
console.info(lifeSupport)