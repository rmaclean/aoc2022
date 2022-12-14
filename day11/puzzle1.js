const fs = require('fs').promises;

const main = async () => {
    const monkeys = [
        {
            items: [63, 84, 80, 83, 84, 53, 88, 72],
            operation: (i) => i * 11,
            test: (i) => i % 13 == 0,
            trueTarget: 4,
            falseTarget: 7,
            inspectCount: 0,
        },
        {
            items: [67, 56, 92, 88, 84],
            operation: (i) => i + 4,
            test: (i) => i % 11 == 0,
            trueTarget: 5,
            falseTarget: 3,
            inspectCount: 0,
        },
        {
            items: [52],
            operation: (i) => i * i,
            test: (i) => i % 2 == 0,
            trueTarget: 3,
            falseTarget: 1,
            inspectCount: 0,
        },
        {
            items: [59, 53, 60, 92, 69, 72],
            operation: (i) => i + 2,
            test: (i) => i % 5 == 0,
            trueTarget: 5,
            falseTarget: 6,
            inspectCount: 0,
        },
        {
            items: [61, 52, 55, 61],
            operation: (i) => i + 3,
            test: (i) => i % 7 == 0,
            trueTarget: 7,
            falseTarget: 2,
            inspectCount: 0,
        },
        {
            items: [79, 53],
            operation: (i) => i + 1,
            test: (i) => i % 3 == 0,
            trueTarget: 0,
            falseTarget: 6,
            inspectCount: 0,
        },
        {
            items: [59, 86, 67, 95, 92, 77, 91],
            operation: (i) => i + 5,
            test: (i) => i % 19 == 0,
            trueTarget: 4,
            falseTarget: 0,
            inspectCount: 0,
        },
        {
            items: [58, 83, 89],
            operation: (i) => i * 19,
            test: (i) => i % 17 == 0,
            trueTarget: 2,
            falseTarget: 1,
            inspectCount: 0,
        },
    ]

    for (let round = 0; round < 20; round++) {
        monkeys.forEach(monkey => {
            for (let itemIndex = 0; itemIndex < monkey.items.length; itemIndex++) {
                monkey.inspectCount++
                monkey.items[itemIndex] = Math.floor(monkey.operation(monkey.items[itemIndex]) / 3)
                if (monkey.test(monkey.items[itemIndex])) {
                    monkeys[monkey.trueTarget].items.push(monkey.items[itemIndex])
                } else {
                    monkeys[monkey.falseTarget].items.push(monkey.items[itemIndex])
                }
            }

            monkey.items.splice(0)
        })
    }

    const byInspectCount = monkeys.map(m => m.inspectCount).sort((a, b) => (a - b) * -1)
    console.log(byInspectCount[0] * byInspectCount[1])
}

main()