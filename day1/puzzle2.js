const fs = require('fs').promises;

const main = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    const lines = inputDataRaw.toString().split("\n")
    const elfs = [{ total: 0, items: [] }]

    let elfIndex = 0
    lines.forEach(l => {
        if (!l) {
            elfIndex++
            elfs.push({ total: 0, items: [] })
        } else {
            elfs[elfIndex].items.push(+l)
        }
    })

    elfs.forEach(elf => {
        elf.total = elf.items.reduce((prev, curr) => prev += curr, 0)
    })

    elfs.sort((elfA, elfB) => (elfA.total - elfB.total) * -1)

    console.log(elfs[0].total + elfs[1].total + elfs[2].total)
}

main()