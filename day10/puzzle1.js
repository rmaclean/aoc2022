const fs = require('fs').promises;

const main = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    const addParser = /add(?<register>\w)\s(?<amount>\-?\d+)/

    const instructions = inputDataRaw.toString().split("\n").map(line => {
        if (line == "noop") {
            return {cycle: 1, increment: 0}
        } else {
            const parsed = addParser.exec(line)
            return {cycle: 2, increment: +parsed.groups.amount}
        }
    })

    let x = 1
    let cycle = 0
    const signalPoints = [20, 60, 100, 140, 180, 220]
    let waitingForSignal = 0
    let signals = []

    instructions.forEach(instruction => {
        cycle += instruction.cycle
        if (cycle >= signalPoints[waitingForSignal]) {
            signals.push(x * signalPoints[waitingForSignal])
            waitingForSignal++
        }

        x += instruction.increment
    });

    console.dir(signals)
    console.log(signals.reduce((prev, curr) => curr += prev))
}

main()