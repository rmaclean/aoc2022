const fs = require('fs').promises;

const main = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    const lines = inputDataRaw.toString().split("\n")

    const stackCount = 9

    const seperator = lines.indexOf("")
    const stacks = []
    for (let index = 0; index < stackCount; index++) {
        stacks.push([])
    }

    for (let row = seperator - 2; row >= 0; row--) {
        const line = lines[row];

        for (let stackPosition = 0; stackPosition < stackCount; stackPosition++) {
            const crateLetter = line[(4 * stackPosition) + 1]
            if (crateLetter.trim()) {
                stacks[stackPosition].push(crateLetter)
            }
        }
    }

    const instructionParser = /move\s(?<count>\d+)\sfrom\s(?<source>\d+)\sto\s(?<destination>\d+)/
    for (let line = seperator + 1; line < lines.length; line++) {
        const instruction = instructionParser.exec(lines[line])
        const source = stacks[instruction.groups.source-1]
        source.splice(source.length - instruction.groups.count)
            .forEach(item => stacks[instruction.groups.destination-1].push(item))
    }


    console.dir(stacks.map(stack => stack.pop()).join(''))
}

main()