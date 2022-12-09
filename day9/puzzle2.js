const fs = require('fs').promises;

const areTheyTouching = (head, tail) => {
    const colDistance = Math.abs(head.col - tail.col)
    const rowDistance = Math.abs(head.row - tail.row)
    return rowDistance <= 1 && colDistance <= 1
}

const move = (head, tail) => {
    const colDistance = head.col - tail.col
    const rowDistance = head.row - tail.row

    if (rowDistance > 0) {
        tail.row += 1
    }

    if (rowDistance < 0) {
        tail.row -= 1
    }

    if (colDistance > 0) {
        tail.col += 1
    }

    if (colDistance < 0) {
        tail.col -= 1
    }
}

const main = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    const parser = /(?<direction>R|U|L|D)\s(?<steps>\d+)/
    const instructions = inputDataRaw.toString().split("\n").map(line => {
        const parsed = parser.exec(line).groups
        return {
            direction: parsed.direction,
            steps: parsed.steps,
        }
    })

    let visited = [{ row: 0, col: 0 }]
    const knots = Array.from({length: 10}, () => ({ row: 0, col: 0 }))
    const head = knots[0]

    instructions.forEach(instruction => {
        for (let step = 0; step < instruction.steps; step++) {
            switch (instruction.direction) {
                case "R": {
                    head.col += 1
                    break
                }
                case "L": {
                    head.col -= 1
                    break
                }
                case "U": {
                    head.row += 1
                    break
                }
                case "D": {
                    head.row -= 1
                    break
                }
            }

            for (let knotIndex = 0; knotIndex < knots.length - 1; knotIndex++) {
                const knot1 = knots[knotIndex];
                const knot2 = knots[knotIndex + 1];

                if (!areTheyTouching(knot1, knot2)) {
                    move(knot1, knot2)
                }
            }

            if (!visited.find(spot => spot.col == knots[9].col && spot.row == knots[9].row)) {
                visited.push({ ...knots[9] })
            }
        }
    });

    console.dir(visited)
    console.log(visited.length)
}

main()