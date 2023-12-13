import { getFileContents } from "../Utils";


const compareSprings = (s1: string, s2: string) => {

    for (let index = 0; index < s1.length; index++) {
        if (s1.charAt(index) === '?') {
            continue;
        } else if (s1.charAt(index) != s2.charAt(index)) {
            return false;
        }
    }
    return true;
}

const dfs = (testString: string, currentString: string, length: number, countOfRemainingStrings: number[]) => {
    // console.log(`dfs: ${currentString}, ${length}`);
    // console.dir(countOfRemainingStrings);

    if (countOfRemainingStrings.length === 0) {
        const lengthOfDots = length - currentString.length ;
        return [currentString + '.'.repeat(lengthOfDots)];
    } else {
        const cloneOfRemainingStrings = [...countOfRemainingStrings];
        const nextLength = cloneOfRemainingStrings.shift()!;
        let minNecessary = 0;
        if (cloneOfRemainingStrings.length > 0) {
            minNecessary = cloneOfRemainingStrings.reduce( (p,c) => p + c ) + cloneOfRemainingStrings.length;
        }

        // console.log(`nextLength: ${nextLength}, minNecessary: ${minNecessary}`);

        const result: string[] = [];
        for (let numberOfSpaces = currentString.length === 0? 0 : 1; currentString.length + numberOfSpaces + nextLength + minNecessary <= length; numberOfSpaces++) {
            const nextString = currentString + '.'.repeat(numberOfSpaces) + '#'.repeat(nextLength);

            const newTestString = testString.substring(0, nextString.length);
            if (!compareSprings(newTestString, nextString)) {
                continue;
            }

            const dfsResult = dfs(testString, nextString, length, countOfRemainingStrings.slice(1));
            result.push(...dfsResult);
            
        }
        return result;
    }

}

const dfsIterative = (testString: string, currentString: string, length: number, countOfRemainingStrings: number[]) => {
    // console.log(`dfs: ${currentString}, ${length}`);
    // console.dir(countOfRemainingStrings);

    const stack: Array<[string, number[]]> = [];
    // const results: string[] = [];
    let count = 0;

    stack.push([currentString, countOfRemainingStrings]);
    while (stack.length > 0) {
        const [current, remaining] = stack.pop()!;
        if (remaining.length === 0) {
            const lengthOfDots = length - current.length;
            // results.push(current + '.'.repeat(lengthOfDots));
            count++;
        } else {
            const cloneOfRemaining = [...remaining];
            const nextLength = cloneOfRemaining.shift()!;
            let minNecessary = 0;
            if (cloneOfRemaining.length > 0) {
                minNecessary = cloneOfRemaining.reduce((p, c) => p + c) + cloneOfRemaining.length;
            }

            for (let numberOfSpaces = current.length === 0 ? 0 : 1; current.length + numberOfSpaces + nextLength + minNecessary <= length; numberOfSpaces++) {
                const next = current + '.'.repeat(numberOfSpaces) + '#'.repeat(nextLength);

                const newTestString = testString.substring(0, next.length);
                if (!compareSprings(newTestString, next)) {
                    continue;
                }

                stack.push([next, [...cloneOfRemaining]]);
            }
        }
    }

    return count;
}

const cache: Map<string, number> = new Map<string, number>();
const getKey = (a: string, b: number[]) => a + ':' + b.join(',');

const dfs2 = (previousString: string, records: number[]): number => {
    if (cache.has(getKey(previousString, records))) {
        return cache.get(getKey(previousString, records))!;
    }

    let currentString = previousString.replace(/^\.+/, '').replace(/\.+$/, '');
    // console.log(`${previousString} => ${currentString}`);

    let indexOfQ = currentString.indexOf('?');
    let indexOfDot = currentString.indexOf('.');
    let indexOfHash = currentString.indexOf('#');

    if (records.length === 0 && indexOfQ === -1 && indexOfHash === -1) {
        return 1;
    } else if (records.length === 0 && (indexOfQ > 0 || indexOfHash > 0)) {
        return 0;
    }
    

    if (indexOfQ === -1) {
        indexOfQ = currentString.length;
    }

    if (indexOfDot === -1) {
        indexOfDot = currentString.length;
    }
   

    if (indexOfQ < indexOfDot) {
        const replaceWithHash = dfs2(currentString.replace('?', '#'), records);
        const replaceWithDot = dfs2(currentString.replace('?', '.'), records);

        cache.set(getKey(currentString.replace('?', '#'), records), replaceWithHash);
        cache.set(getKey(currentString.replace('?', '.'), records), replaceWithDot);

        return replaceWithHash + replaceWithDot;
    } else {
        if (indexOfDot === records[0]) {
            return dfs2(currentString.substring(indexOfDot + 1), records.slice(1));
        } else {
            return 0;
        }
    } 

}



const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    let total = 0;
    for (const line of lines) {
        const [springString, recordString] = line.split(' ');
        const records = recordString.split(',').map(Number);

        const result = dfs(springString, '', springString.length, records);
        // console.dir(result);
        
        let count = 0;
        for (let checkSpring of result) {
            if (compareSprings(springString, checkSpring)) {
                count++;
            }
        }
        console.log(`${line} - Possibles: ${count}`);
        total += count;
        // break;
    }
    console.log(`total: ${total}`);


};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    let total = 0;
    for (const line of lines) {
        const [springString, recordString] = line.split(' ');
        const records = recordString.split(',').map(Number);

        const newSpringString = (springString + "?").repeat(5).slice(0, -1);

        let newRecords: number[] = [];
        for (let i = 0; i < 5; i++) {
            newRecords.push(...records);
        }

        const result = dfsIterative(newSpringString, '', newSpringString.length, newRecords);
        // console.dir(result);
        
        // let count = 0;
        // for (let checkSpring of result) {
        //     if (compareSprings(newSpringString, checkSpring)) {
        //         count++;
        //     }
        // }
        console.log(`${line} - Possibles: ${result}`);
        total += result;
        // break;
    }
    console.log(`total: ${total}`);


};

const part2a = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    let total = 0;
    for (const line of lines) {
        cache.clear();

        const [springs, recordString] = line.split(' ');
        const records = recordString.split(',').map(Number);

        const newSprings = (springs + "?").repeat(5).slice(0, -1);

        let newRecords: number[] = [];
        for (let i = 0; i < 5; i++) {
            newRecords.push(...records);
        }


        let count = dfs2(newSprings, newRecords);
        // let count = dfs2(springs, records);
        console.log(`${line} - Possibles: ${count}`);

        total += count;
    }

    console.log(`total: ${total}`);


};

//part1();
// part2();
part2a();