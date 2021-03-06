const fs = require('fs')

class Control {
  static FORWARD = 'forward'
  static UP = 'up'
  static DOWN = 'down'
  #position = {}
  #aim = 0

  constructor(commands) {
    this.commands = commands
    this.#position.x = 0
    this.#position.y = 0
  }

  move () {
    this.commands.map( command => {
      const [instruction, movement] = command.split(' ')

      switch (instruction) {
        case Control.FORWARD:
          this.#moveForward(parseInt(movement))
          break;
        case Control.UP:
          this.#moveUp(parseInt(movement))
          break;

        case Control.DOWN:
          this.#moveDown(parseInt(movement))
          break

        default:
      }
    })

    return this.#position.x * this.#position.y
  }

  #moveForward(movement) {
    this.#position.x += movement
    this.#position.y += this.#aim * movement
  }

  #moveDown(movement) {
    this.#aim += movement
  }

  #moveUp(movement) {
    this.#aim -= movement
  }
}

const commands = fs.readFileSync('input').toString().split('\n')

const control = new Control(commands)
const finalPosition = control.move()
console.info(finalPosition)
