import { getFileContents } from "../Utils";

const contents = getFileContents().trim();
const banks = contents.split(/\s+/).map( v => Number(v));

console.dir(banks);

const getMaxIndex = (arr: number[]) => {
    return arr.indexOf( arr.reduce ( (p, v) => Math.max(p,v)) );
}



const previousCycles: string[] = [];
let cycleHash = banks.join(',');
let count = 0;
let cycleCount = 1;
let cycleStart = '';


while (true) {

    previousCycles.push(cycleHash);

    const maxIndex = getMaxIndex(banks);
    const maxValue = banks[maxIndex];
    banks[maxIndex] = 0;

    for (let i = 1; i <= maxValue; i++) {
        const newIndex = (maxIndex + i) % banks.length;
        banks[newIndex]++;
    }

    cycleHash = banks.join(',');
    // console.debug(cycleHash);
    count++;

    if (cycleStart == '') {    
        if (previousCycles.includes(cycleHash)) {
            console.debug(`initial count: ${count}`);
            cycleStart = cycleHash;
        }
    } else {
        if (cycleStart == cycleHash) {
            console.debug(`cycle count: ${cycleCount}`);
            break;
        } else {
            cycleCount++;
        }
    }
}

