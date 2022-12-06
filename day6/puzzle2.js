const fs = require('fs').promises;

const main = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    const line = inputDataRaw.toString().split("\n")[0]

    let unique = []
    for (let index = 0; index < line.length; index++) {
        const letter = line[index];
        const letterInUnique = unique.indexOf(letter)

        if (letterInUnique == -1) {
            if (unique.length < 14) {
                unique.push(letter)

                if (unique.length == 14) {
                    console.log(index + 1)
                    break    
                }
            } else {
                console.log(index)
                break
            }
        } else {
            unique = unique.slice(letterInUnique + 1)
            unique.push(letter)
        }
    }
}

main()