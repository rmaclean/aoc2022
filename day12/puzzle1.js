const fs = require('fs').promises;

const testPath = (successfulPath, pathsToTest, map, end) => {
    console.log(pathsToTest.length)
    const path = pathsToTest.pop()
    if (successfulPath && path.length >= successfulPath.length) {
        // not shorter
        return successfulPath
    }

    const lastStepIndex = path.length - 1
    const lastStep = path[lastStepIndex]
    if (lastStep.x == end.x && lastStep.y == end.y) {
        return path
    }

    let nextSteps = []

    if (lastStep.canMoveUp) {
        nextSteps.push(map[lastStep.y - 1][lastStep.x])
    }

    if (lastStep.canMoveRight) {
        nextSteps.push(map[lastStep.y][lastStep.x + 1])
    }

    if (lastStep.canMoveDown) {
        nextSteps.push(map[lastStep.y + 1][lastStep.x])
    }

    if (lastStep.canMoveLeft) {
        nextSteps.push(map[lastStep.y][lastStep.x - 1])
    }

    while (nextSteps.length > 0) {
        const nextStep = nextSteps.pop()
        if (!path.find(s => s.x == nextStep.x && s.y == nextStep.y)) {
            pathsToTest.push([...path, nextStep])
        }
    }

    return successfulPath
}

const checkNeighbours = (position, map, mapHeight, mapWidth) => {
    const maxHeight = position.height + 1
    const { x, y } = position

    if (x == 4 && y == 2) {
        debugger
    }

    if (y > 0 && map[y - 1][x].height <= maxHeight) {
        position.canMoveUp = true
    }

    if (y < mapHeight - 1 && map[y + 1][x].height <= maxHeight) {
        position.canMoveDown = true
    }

    if (x > 0 && map[y][x - 1].height <= maxHeight) {
        position.canMoveLeft = true
    }

    if (x < mapWidth - 1 && map[y][x + 1].height <= maxHeight) {
        position.canMoveRight = true
    }
}

const main = async () => {
    // const inputDataRaw = await fs.readFile("./day12/input.txt")
    const inputDataRaw = await fs.readFile("./input.txt")
    const letterMap = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const start = { x: 0, y: 0 }
    const end = { x: 0, y: 0 }

    const map = inputDataRaw.toString().split("\n")
        .map((line, y) => line.split('').map((letter, x) => {
            const index = letterMap.indexOf(letter)
            if (index > -1) {
                return { x, y, height: index, letter, canMoveLeft: false, canMoveRight: false, canMoveUp: false, moveDown: false }
            } else {
                let height = -1
                if (letter == 'S') {
                    start.x = x
                    start.y = y
                }

                if (letter == 'E') {
                    end.x = x
                    end.y = y
                    height = 26
                }

                return { x, y, height, letter, canMoveLeft: false, canMoveRight: false, canMoveUp: false, moveDown: false }
            }
        }))

    const mapHeight = map.length
    const mapWidth = map[0].length

    map.forEach(row => row.forEach(cell => checkNeighbours(cell, map, mapHeight, mapWidth)))

    const pathsToTest = [[map[start.y][start.x]]]

    let successfulPath = undefined

    while (pathsToTest.length > 0) {
        successfulPath = testPath(successfulPath, pathsToTest, map, end)
    }

    console.log(successfulPath.length - 1)
}

main()