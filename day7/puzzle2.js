const fs = require('fs').promises;

const buildDirectory = (name, parent) => {
    return { name, subDirectories: [], files: [], totalSize: 0, parent }
}

const addSubDirectorySizeToDirectory = (thisDir) => {
    let result = 0

    thisDir.subDirectories.forEach(subDir => {
        result += addSubDirectorySizeToDirectory(subDir)
    });

    thisDir.totalSize += result
    return thisDir.totalSize
}

const flattenDirectoryStructure = (thisDir) => {
    let result = [{
        name: thisDir.name,
        size: thisDir.totalSize
    }]

    thisDir.subDirectories.forEach(subDir => {
        result = result.concat(...flattenDirectoryStructure(subDir))
    });

    return result
}

const main = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    const lines = inputDataRaw.toString().split("\n")
    const root = buildDirectory('/')
    const directoryNameParser = /\$\scd\s(?<name>.+)/
    const fileNameParser = /(?<size>\d+)\s(?<name>.+)/
    const fileSystemMax = 70000000
    const desiredSpace = 30000000

    let currentDirectory = root

    for (let index = 0; index < lines.length; index++) {
        const line = lines[index];

        if (line.startsWith('$ cd')) {
            const name = directoryNameParser.exec(line).groups.name

            switch (name) {
                case '/': {
                    currentDirectory = root
                    break
                }
                case '..': {
                    currentDirectory = currentDirectory.parent
                    break
                }
                default: {
                    let dir = currentDirectory.subDirectories.find(dir => dir.name == name)
                    if (!dir) {
                        dir = buildDirectory(name, currentDirectory)
                        currentDirectory.subDirectories.push(dir)
                    }

                    currentDirectory = dir
                    break
                };
            }

            continue
        }

        if (line.startsWith('$ ls')) {
            // do nothing
            continue
        }

        if (line.startsWith('dir')) {
            // do nothing - this assumes we never cd into non-existing directories  

            continue
        }

        // must be a file
        const parsedLine = fileNameParser.exec(line)
        const size = +parsedLine.groups.size
        currentDirectory.files.push({ name: parsedLine.groups.name, size })
        currentDirectory.totalSize += size
    }

    addSubDirectorySizeToDirectory(root)
    const currentFree = fileSystemMax - root.totalSize
    const difference = desiredSpace - currentFree
    console.dir(flattenDirectoryStructure(root)
        .filter(dir => dir.size > difference).sort((a, b) => (a.size - b.size))[0].size
    )
}

main()