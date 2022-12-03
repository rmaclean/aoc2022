const { off } = require('process');

const fs = require('fs').promises;

const take = (array, amount, offset = 0) => {
    const result = []
    for (let index = 0; index < amount; index++) {
        if ((offset + index) < array.length) {
            result.push(array[offset + index])
        } 
    }

    return result
}

const main = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    const lines = inputDataRaw.toString().split("\n")

    const letterMap = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    
    let offset = 0
    let input
    let badges = []
    while ((input = take(lines, 3, offset)).length > 0) {
        offset += 3
        const line1 = input[0]
        const line2 = input[1]
        const line3 = input[2]

        let found = false

        for (const l1 of line1) {
            for (const l2 of line2) {
                if (l1 == l2) {
                    for (const l3 of line3) {
                        if (l1 == l3) {
                            badges.push(l1)
                            found = true
                            break
                        }
                    }
                }
                if (found) break
            }
            if (found) break
        }
    }

    const answer = badges.map(letter => {
        let result = letterMap.indexOf(letter)
        if (result >= 0) {
            return result + 1
        } else {
            result = letterMap.indexOf(letter.toLocaleLowerCase())
            return result + 27
        }
    }).reduce((prev, curr) => prev += curr, 0)

    console.log(answer)
}

main()