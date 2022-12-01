const fs = require('fs').promises;

const main = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    const lines = inputDataRaw.toString().split("\n")
    
    const outcomes = [
        // x is lose
        // y is draw
        // z is win
        {input: "A X", score: 3}, 
        {input: "A Y", score: 4}, 
        {input: "A Z", score: 8}, 

        {input: "B X", score: 1}, 
        {input: "B Y", score: 5}, 
        {input: "B Z", score: 9}, 

        {input: "C X", score: 2}, 
        {input: "C Y", score: 6}, 
        {input: "C Z", score: 7}, 
    ]

    let score = 0
    lines.forEach(line => {
        score += outcomes.find(o => o.input === line).score
    })

    console.log(score)
}

main()