import { getFileContents } from "../Utils";
    
const input = getFileContents().trim().split(/\n/g);


interface monkey {
    name: string;
    operation: string;
}

// read in the input
const monkeyToNumber: Map<string, string> = new Map<string, string>();
const monkeys: monkey[] = []
for (const line of input) {

    const [monkeyName, operation] = line.split(': ', 2);
    if (operation.match(/^\d+$/)) {
        monkeyToNumber.set(monkeyName, operation);
    } else {
        monkeys.push({
            name: monkeyName,
            operation: operation
        });
    }

}

// start my search with
let myNumber = 1;

// initial increment
let increment = 100000000000;

MAIN_LOOP:
while (true) {
    myNumber += increment;

    // start of search, reset every thing
    const monkeysOfLoop = monkeys.slice();
    const monkeyToNumberOfLoop = new Map(monkeyToNumber);
    monkeyToNumberOfLoop.set('humn', String(myNumber));

    // just loop forever until we either hit the number, or overshoot
    while (true) {
        for (let index = monkeysOfLoop.length - 1; index >= 0; index--) {
            const oneMonkey = monkeysOfLoop[index];
            // parse out the variables from the operation
            const [m1, m2] = oneMonkey.operation.split(/ [\*\+\-\/] /, 2);

            // check to see if we've already calculated the values
            if (monkeyToNumberOfLoop.has(m1) && monkeyToNumberOfLoop.has(m2)) {

                // special case from Part 2 for root
                if (oneMonkey.name === `root`) {
                    const m1Number = Number(monkeyToNumberOfLoop.get(m1))!;
                    const m2Number = Number(monkeyToNumberOfLoop.get(m2))!;

                    // We found it!
                    if (m1Number == m2Number) {
                        break MAIN_LOOP; 
                    } else if (m1Number < m2Number)  {
                        // we overshot, but we're close
                        // backtrack one number, the cut the increment by 10 to narrow in
                        myNumber -= increment;
                        increment /= 10;
                        console.log(`Overshot. Reducing increment to ${increment}`);
                        continue MAIN_LOOP;
                    }
                    else {
                        continue MAIN_LOOP;
                    }
                }

                // otherwise, we're still going
                // replace the variables with the values we know, eval the operation, and store the result
                // remove the monkey from consideration since we don't need to run the operation again
                let newOperation = oneMonkey.operation.replace(m1, monkeyToNumberOfLoop.get(m1)!).replace(m2, monkeyToNumberOfLoop.get(m2)!);
                monkeyToNumberOfLoop.set(oneMonkey.name, String(eval(newOperation)));
                monkeysOfLoop.splice(index, 1);
            }
        }
    } 
}

console.log(`my number = ${myNumber}`);


