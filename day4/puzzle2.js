const fs = require('fs').promises;

const main = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    const parser = /(?<group1Start>\d+)-(?<group1End>\d+),(?<group2Start>\d+)-(?<group2End>\d+)/
    const lines = inputDataRaw.toString().split("\n").map(line => {
        const groups = parser.exec(line).groups
        return {
            group1Start: +groups.group1Start,
            group1End: +groups.group1End,
            group2Start: +groups.group2Start,
            group2End: +groups.group2End,
        }
    }).filter(group => 
        (group.group1Start >= group.group2Start && group.group1Start <= group.group2End) || 
        (group.group1End >= group.group2Start && group.group1Start <= group.group2End) ||
        (group.group2Start >= group.group1Start && group.group2Start <= group.group1End) || 
        (group.group2End >= group.group1Start && group.group2Start <= group.group1End) 
    )

    console.dir(lines.length)
}

main()