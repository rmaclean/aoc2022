const fs = require('fs').promises;

const main = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    const lines = inputDataRaw.toString().split("\n")

    const letterMap = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    
    const answer = lines.map(line => {
        const splitPoint = line.length / 2
        const compartment1 = line.substring(0, splitPoint)
        const compartment2 = line.substring(splitPoint)

        for (const compartment1Letter of compartment1) {
            for (const compartment2Letter of compartment2) {
                if (compartment1Letter == compartment2Letter) {
                    return compartment1Letter
                }
            }
        }

        throw "Oh no"
    }).map(letter => {
        let result = letterMap.indexOf(letter)
        if (result >= 0) {
            return result + 1
        } else {
            result = letterMap.indexOf(letter.toLocaleLowerCase())
            return result + 27
        }
    }).reduce((prev, curr) => prev += curr, 0)

    console.dir(answer)
}

main()