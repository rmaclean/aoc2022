const fs = require('fs').promises;

const main = async () => {
    const monkeys = [
        {
            items: [63, 84, 80, 83, 84, 53, 88, 72],
            operation: (i) => i * 11,
            test: 13,
            trueTarget: 4,
            falseTarget: 7,
            inspectCount: 0,
        },
        {
            items: [67, 56, 92, 88, 84],
            operation: (i) => i + 4,
            test: 11,
            trueTarget: 5,
            falseTarget: 3,
            inspectCount: 0,
        },
        {
            items: [52],
            operation: (i) => i * i,
            test: 2,
            trueTarget: 3,
            falseTarget: 1,
            inspectCount: 0,
        },
        {
            items: [59, 53, 60, 92, 69, 72],
            operation: (i) => i + 2,
            test: 5,
            trueTarget: 5,
            falseTarget: 6,
            inspectCount: 0,
        },
        {
            items: [61, 52, 55, 61],
            operation: (i) => i + 3,
            test: 7,
            trueTarget: 7,
            falseTarget: 2,
            inspectCount: 0,
        },
        {
            items: [79, 53],
            operation: (i) => i + 1,
            test: 3,
            trueTarget: 0,
            falseTarget: 6,
            inspectCount: 0,
        },
        {
            items: [59, 86, 67, 95, 92, 77, 91],
            operation: (i) => i + 5,
            test: 19,
            trueTarget: 4,
            falseTarget: 0,
            inspectCount: 0,
        },
        {
            items: [58, 83, 89],
            operation: (i) => i * 19,
            test: 17,
            trueTarget: 2,
            falseTarget: 1,
            inspectCount: 0,
        },
    ]

    const highestValue = monkeys.reduce((acc, monkey) => acc *= monkey.test, 1);

    for (let round = 0; round < 10000; round++) {
        monkeys.forEach(monkey => {
            for (let itemIndex = 0; itemIndex < monkey.items.length; itemIndex++) {
                monkey.inspectCount++
                monkey.items[itemIndex] = monkey.operation(monkey.items[itemIndex])
                const shifted = monkey.items[itemIndex] % highestValue 
                if (monkey.items[itemIndex] % monkey.test == 0) {
                    monkeys[monkey.trueTarget].items.push(shifted)
                } else {
                    monkeys[monkey.falseTarget].items.push(shifted)
                }
            }

            monkey.items.splice(0)
        })
    }

    const byInspectCount = monkeys.map(m => m.inspectCount).sort((a, b) => (a - b) * -1)
    console.log(byInspectCount[0] * byInspectCount[1])
}

main()