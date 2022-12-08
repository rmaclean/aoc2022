const fs = require('fs').promises;

const distance = (view, height) => {
    let index
    for (index = 0; index < view.length; index++) {
        const tree = view[index];
        if (tree.height >= height) {
            index++
            break
        }
    }

    return index
}

const main = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    const grid = inputDataRaw.toString().split("\n").map((line, rowIndex) => line.split('').map((cell, cellIndex) => { return { rowIndex, cellIndex, height: +cell, score: 0 } }))
    const flattenedResults = []
    grid.forEach(row => {
        row.forEach(tree => {
            const toLeft = distance(grid[tree.rowIndex].slice(0, tree.cellIndex).reverse(), tree.height)
            const toRight = distance(grid[tree.rowIndex].slice(tree.cellIndex + 1), tree.height)

            const column = grid.map(row => row[tree.cellIndex])
            const toUp = distance(column.slice(0, tree.rowIndex).reverse(), tree.height)
            const toDown = distance(column.slice(tree.rowIndex + 1), tree.height)

            flattenedResults.push({
                toLeft,
                toRight,
                toUp,
                toDown,
                scenicScore: toLeft * toRight * toUp * toDown,
                ...tree,
            })
        })
    })

    console.log(Math.max(...flattenedResults.map(cell => cell.scenicScore)))
}

main()