import { getFileContents, sortHashmap } from "../Utils";

const contents = getFileContents().trim().split(/\n/g);

const getPrimeFactors = (n: number) => {
    const factors:Set<number> = new Set<number>();
    let divisor = 2;
  
    while (n >= 2) {
      if (n % divisor == 0) {
        factors.add(divisor);
        n = n / divisor;
      } else {
        divisor++;
      }
    }
    return factors;
  }

interface Monkey {
    monkeyId: number;
    items: MonkeyItem[];
    operation: Function | undefined;
    divisibility: number;
    throwIfTrue: number;
    throwIfFalse: number;
    inspectionCount: number;
}

interface MonkeyItem {
    primeFactors: Set<number>;
}

const monkeyList: Map<number, Monkey> = new Map<number, Monkey>();

for (let lineCount = 0; lineCount < contents.length; lineCount += 7) {
    const monkeyId  = Number(contents[lineCount].match(/\d+/)![0]) || 0;
    const items = contents[lineCount + 1].match(/\d+/g)!.map( v => {

            const p = getPrimeFactors(Number(v));
            return {
                primeFactors: p
            };
        }
    );
    const operationString = contents[lineCount + 2];
    const divisibility = Number(contents[lineCount + 3].match(/\d+/)![0]) || 1;
    const throwIfTrue = Number(contents[lineCount + 4].match(/\d+/)![0]) || 0;
    const throwIfFalse = Number(contents[lineCount + 5].match(/\d+/)![0]) || 0;


    let operation: Function | undefined;
    if (operationString.includes('old * old')) {
        operation = (v: MonkeyItem) => v;
    }
    else if (operationString.includes('+')) {
        const sum = Number(operationString.match(/\d+/)![0]) || 0;
        operation = (v: MonkeyItem) => v; // FIX
    } else if (operationString.includes('*')) {
        const mult = Number(operationString.match(/\d+/)![0]) || 0;
        operation = (v: MonkeyItem) => {
            v.primeFactors.add(mult);
            return v;
        }
    }

    monkeyList.set(monkeyId, {
        monkeyId,
        items,
        operation,
        divisibility,
        throwIfTrue,
        throwIfFalse,
        inspectionCount: 0,
    });

}



for (let round = 0; round < 20; round++) {

    for (const currentMonkey of monkeyList.values()) {

        // console.log(`Current Monkey: ${currentMonkey.monkeyId}`);
        while (currentMonkey.items.length > 0) {
            let item = currentMonkey.items.shift()!;
            // console.log(`Inspecting item ${item}`);
            item = currentMonkey.operation!(item);
            // console.log(`Worrying: ${item}`);
            // item = Math.floor(item / 3);
            // console.log(`Relief: ${item}`);

            // console.dir(item);
            if (item.primeFactors.has(currentMonkey.divisibility)) {
                const newMonkeyId = currentMonkey.throwIfTrue;
                // console.log(`Divisible by ${currentMonkey.divisibility}, going to ${newMonkeyId}`);

                const newMonkey = monkeyList.get(newMonkeyId)!;
                newMonkey.items.push(item);
            } else {
                const newMonkeyId = currentMonkey.throwIfFalse;
                console.log(`Not divisible by ${currentMonkey.divisibility}, going to ${newMonkeyId}`);

                const newMonkey = monkeyList.get(newMonkeyId)!;
                newMonkey.items.push(item);
            }
            currentMonkey.inspectionCount++;
        }
    }
    if (round % 1000 === 0) {
        // process.stdout.write('.');
        console.dir(Array.from(monkeyList.values()).map( v => v.inspectionCount));
    }
}
// process.stdout.write('\n');

console.dir(Array.from(monkeyList.values()).map( v => v.inspectionCount));

