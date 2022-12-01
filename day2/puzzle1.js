const fs = require('fs').promises;

const main = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    const lines = inputDataRaw.toString().split("\n")
    
    const outcomes = [
        {input: "A X", score: 4}, // rock vs rock (1) = 4
        {input: "A Y", score: 8}, // rock vs paper (2) = 8
        {input: "A Z", score: 3}, // rock vs scissors (3) = 3

        {input: "B X", score: 1}, // paper vs rock (1) = 1
        {input: "B Y", score: 5}, // paper vs paper (2) = 5
        {input: "B Z", score: 9}, // paper vs scissors (3) = 9

        {input: "C X", score: 7}, // scissors vs rock (1) = 7
        {input: "C Y", score: 2}, // scissors vs paper (2) = 2
        {input: "C Z", score: 6}, // scissors vs scissors (3) = 6
    ]

    let score = 0
    lines.forEach(line => {
        score += outcomes.find(o => o.input === line).score
    })

    console.log(score)
}

main()