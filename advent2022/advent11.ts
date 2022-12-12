    import { getFileContents } from "../Utils";
    
    const contents = getFileContents().trim().split(/\n/g);
    
    const NUM_ROUNDS = 10000;
    const DO_RELIEF = false;
    
    interface Monkey {
        monkeyId: number;
        items: number[];
        operation: Function | undefined;
        divisibility: number;
        throwIfTrue: number;
        throwIfFalse: number;
        inspectionCount: number;
    }
    
    let allDivisors = 1;
    
    const monkeyList: Map<number, Monkey> = new Map<number, Monkey>();
    
    // parsing
    for (let lineCount = 0; lineCount < contents.length; lineCount += 7) {
        const monkeyId  = Number(contents[lineCount].match(/\d+/)![0]) || 0;
        const items = contents[lineCount + 1].match(/\d+/g)!.map( v => Number(v));
        const operationString = contents[lineCount + 2];
        const divisibility = Number(contents[lineCount + 3].match(/\d+/)![0]) || 1;
        const throwIfTrue = Number(contents[lineCount + 4].match(/\d+/)![0]) || 0;
        const throwIfFalse = Number(contents[lineCount + 5].match(/\d+/)![0]) || 0;
    
        allDivisors *= divisibility;
     
    
        // convert the operations into a function that can be assigned to a variable
        // I LOVE functional languages!
        let operation: Function | undefined;
        if (operationString.includes('old * old')) {
            operation = (v: number) => v **= 2;
        }
        else if (operationString.includes('+')) {
            const sum = Number(operationString.match(/\d+/)![0]) || 0;
            operation = (v: number) => v + sum;
        } else if (operationString.includes('*')) {
            const mult = Number(operationString.match(/\d+/)![0]) || 0;
            operation = (v: number) => v * mult;
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
    
    for (let round = 0; round < NUM_ROUNDS; round++) {
    
        for (const currentMonkey of monkeyList.values()) {
    
            while (currentMonkey.items.length > 0) {
                let item = currentMonkey.items.shift()!;
    
                // Chinese Remainder Theorem ( X mod m === X mod M mod m) if M is the multiple of prime m's.
                item = currentMonkey.operation!(item) % allDivisors;
    
                if (DO_RELIEF) {
                    item = Math.floor(item/3);
                }
    
                if (item % currentMonkey.divisibility === 0) {
                    const newMonkeyId = currentMonkey.throwIfTrue;
                    const newMonkey = monkeyList.get(newMonkeyId)!;
                    newMonkey.items.push(item);
                } else {
                    const newMonkeyId = currentMonkey.throwIfFalse;
                    const newMonkey = monkeyList.get(newMonkeyId)!;
                    newMonkey.items.push(item);
                }
                currentMonkey.inspectionCount++;
            }
        }
    }
    
    const inspectionCountArray = Array.from(monkeyList.values()).map( v => v.inspectionCount);
    inspectionCountArray.sort( (a,b) => b - a );
    const answer = inspectionCountArray[0] * inspectionCountArray[1];
    
    console.dir(answer);
    
    