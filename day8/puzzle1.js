const fs = require('fs').promises;

const iterateGrid = (grid, visibleTrees) => {
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const row = grid[rowIndex];

        let currentHeight = -1

        for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
            const cell = row[cellIndex];
            if (cell.height > currentHeight) {
                if (!visibleTrees.find(knownTree => knownTree.cellIndex == cell.cellIndex && cell.rowIndex == knownTree.rowIndex)) {
                    visibleTrees.push(cell)
                }

                currentHeight = cell.height
                continue
            } 

        }
    }
}

const transpose = (grid) => grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));

const render = (raw, visible) => {
    for (let rowIndex = 0; rowIndex < raw.length; rowIndex++) {
        const row = raw[rowIndex];
        
        let line = ''
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            const cell = row[colIndex];
            
            if (visible.find(knownTree => knownTree.cellIndex == colIndex && rowIndex == knownTree.rowIndex)) {
                line += '\x1b[32m'
            } else {
                line += '\x1b[34m'
            }
            line += cell.height
        }
        console.log(line)
    }
}

const main = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    const grid = inputDataRaw.toString().split("\n").map((line, rowIndex) => line.split('').map((cell, cellIndex) => { return { rowIndex, cellIndex, height: +cell } }))

    const visibleTrees = []

    iterateGrid(grid, visibleTrees,) 
    const transposedGrid = transpose(grid)
    iterateGrid(transposedGrid, visibleTrees)
    iterateGrid(grid.map(row => row.reverse()), visibleTrees)
    iterateGrid(transposedGrid.map(row => row.reverse()), visibleTrees)

    console.log(visibleTrees.length)

    render(grid.map(row => row.reverse()), visibleTrees)
}

main()