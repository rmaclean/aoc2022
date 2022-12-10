const fs = require('fs').promises;

const main = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    const addParser = /add(?<register>\w)\s(?<amount>\-?\d+)/

    let activatesAtCycle = -1
    const instructions = inputDataRaw.toString().split("\n").map(line => {
        if (line == "noop") {
            activatesAtCycle += 1
            return { cycle: activatesAtCycle, increment: 0 }
        } else {
            const parsed = addParser.exec(line)
            activatesAtCycle += 2
            return { cycle: activatesAtCycle, increment: +parsed.groups.amount }
        }
    })

    let x = 1
    let waitingForSignal = 0

    let screen = Array.from({ length: 6 }, () => {
        return Array.from({ length: 40 }, () => '.')
    })

    for (let cycle = 0; cycle < 240; cycle++) {
        const line = Math.floor(cycle / 40)
        const position = cycle % 40

        if (position == x -1 || position == x || position == x + 1) {
            screen[line][position] = "#"
        } 

        const instruction = instructions.find(i => i.cycle == cycle)
        if (instruction) {
            x += instruction.increment
        }
    }

    screen.forEach(line => console.log(line.join('')))
}

main()