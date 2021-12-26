const fs = require('fs')

class LanternFish {
  static REPRODUCTION_CYCLE = 7
  static NEW_BORN_CYCLE = 8
  #cacheDescendants = {}

  constructor (school, days) {
    this.school = school
    this.days = days
  }

  simulate () {
    for (let i = 0; i < this.days; i++) {
      const length = this.school.length
      for (let j = 0; j < length; j++) {
        this.school[j]--
        if (parseInt(this.school[j]) < 0) {
          this.school.push(LanternFish.NEW_BORN_CYCLE)
          this.school[j] = LanternFish.REPRODUCTION_CYCLE - 1
        }
      }
    }

    return this.school.length
  }

  calculate() {
    let totalLanternFishes = this.school.length

    this.school.forEach(element => {
      totalLanternFishes += this.#calculateDescendants(this.days, parseInt(element))
    })

    return totalLanternFishes
  }

  #calculateDescendants(daysLeft, reproductionDays) {
    if (reproductionDays >= daysLeft) return 0
    if ( (daysLeft - reproductionDays) < LanternFish.REPRODUCTION_CYCLE) return 1
    if (daysLeft in this.#cacheDescendants)
      return this.#cacheDescendants[daysLeft]

    let descendants = Math.floor( (daysLeft - reproductionDays - 1) / LanternFish.REPRODUCTION_CYCLE) + 1
    let acc = descendants
    for(let i = 0; i < descendants; i++) {
      let newBornDaysLeft = (daysLeft - reproductionDays) - (i * LanternFish.REPRODUCTION_CYCLE) - 1
      const descendants = this.#calculateDescendants(newBornDaysLeft , LanternFish.NEW_BORN_CYCLE)

      if (!newBornDaysLeft in this.#cacheDescendants) this.#cacheDescendants[newBornDaysLeft] = {}
      this.#cacheDescendants[newBornDaysLeft] = descendants
      acc += descendants
    }

    return acc
  }
}

const school = fs.readFileSync('input').toString().split(',')
let lanternFish = new LanternFish([...school], 80)
console.info(lanternFish.simulate())

lanternFish = new LanternFish(school, 256)
console.info(lanternFish.calculate())
