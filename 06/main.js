const fs = require('fs')

class LanternFish {
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
          this.school.push(8)
          this.school[j] = 6
        }
      }
    }

    return this.school.length
  }
}

const school = fs.readFileSync('input').toString().split(',')
const lanternFish = new LanternFish(school, 80)
console.info(lanternFish.simulate())
