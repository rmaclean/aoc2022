const fs = require('fs').promises;

const main = async () => {
    const monkeys = [
        {
            items: [79, 98],
            operation: (i) => i * 19,
            test: (i) => i % 23 == 0,
            trueTarget: 2,
            falseTarget: 3,
            inspectCount: 0,
        },
        {
            items: [54, 65, 75, 74],
            operation: (i) => i + 6,
            test: (i) => i % 19 == 0,
            trueTarget: 2,
            falseTarget: 0,
            inspectCount: 0,
        },
        {
            items: [79, 60, 97],
            operation: (i) => i * i,
            test: (i) => i % 13 == 0,
            trueTarget: 1,
            falseTarget: 3,
            inspectCount: 0,
        },
        {
            items: [74],
            operation: (i) => i + 3,
            test: (i) => i % 17 == 0,
            trueTarget: 0,
            falseTarget: 1,
            inspectCount: 0,
        }
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