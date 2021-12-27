const fs = require('fs')
const _ = require('lodash')

class Diagnostic {
  #diagnostic 
  #epsilonRate
  #gammaRate

  constructor (diagnostic) {
    this.#diagnostic = diagnostic
    this.#epsilonRate = this.#gammaRate = 0
    this.process()
  }

  process () {
    
    for (let i = 0; i < this.#diagnostic[0].length; i++) {
      this.#epsilonRate = (this.#epsilonRate << 1) + this.#processColumnByMostCommon(i)
      this.#gammaRate = (this.#gammaRate << 1) + !this.#processColumnByMostCommon(i)
    }
  }

  #processColumnByMostCommon(position) {
    const mostCommon = this.#findMostCommon(position)
    return mostCommon
  }

  #processColumnByLessCommon(position) {
    const lessCommon = !this.#findMostCommon(position)
    return lessCommon
  }

  #findMostCommon(position) {
    let countOfOnes = 0
    for (let i = 0; i < this.#diagnostic.length; i++) {
      countOfOnes += this.#diagnostic[i][position] == 1
    }
    
    return countOfOnes >= (this.#diagnostic.length / 2 )
  }

  powerConsumption () {
    return this.#gammaRate * this.#epsilonRate
  }
}

const input = fs.readFileSync('input').toString().split('\n')
const diagnostic = new Diagnostic(input)
const powerConsumption = diagnostic.powerConsumption()
console.info(powerConsumption)