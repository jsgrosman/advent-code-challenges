import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const stoneValues = contents.split(/\s+/).map(Number);

    let printStones = ( s: Stone ) => {

        let numStones = 1;
        while (s.nextStone) {
            s = s.nextStone;
            numStones++;
        }
        console.log(` (${numStones})`);
    }

    interface Stone {
        value: number;
        prevStone?: Stone;
        nextStone?: Stone;
    }

    let firstStone: Stone = {
        value: stoneValues[0]
    };
    let currentStone = firstStone;
    for (let i = 1; i < stoneValues.length; i++) {
        const newStone = {
            value: stoneValues[i],
            prevStone: currentStone
        }
        currentStone.nextStone = newStone;
        currentStone = newStone;
    }

    for (let blink = 0; blink <= 25; blink++) {
        printStones(firstStone);
        console.log(`${blink} blinks`);
        
        
        let blinkStone = firstStone;
        while (true) {
            if (!blinkStone) {
                break;
            }
            // console.log(blinkStone);
            const valueString = String(blinkStone.value);

            if (blinkStone.value === 0) {
                blinkStone.value = 1;
            } else if (valueString.length % 2 === 0) {
                const leftStone: Stone = {
                    value: Number(valueString.substring(0, valueString.length/2)),
                    prevStone: blinkStone.prevStone
                };
                const rightStone: Stone = {
                    value: Number(valueString.substring(valueString.length/2)),
                    prevStone: leftStone,
                    nextStone: blinkStone.nextStone
                }
                leftStone.nextStone = rightStone;
                if (blinkStone.nextStone) {
                    blinkStone.nextStone.prevStone = rightStone;
                }
                if (blinkStone.prevStone) {
                    blinkStone.prevStone.nextStone = leftStone;
                } 
                
                if (!leftStone.prevStone) {
                    firstStone = leftStone;
                }
            } else {
                blinkStone.value *= 2024;
            }

            blinkStone = blinkStone.nextStone!;

        } 

    }

};


const part2 = () => {
    const contents = getFileContents();
    const stoneValues = contents.split(/\s+/).map(Number);

    const memo: Map<string, number> = new Map<string, number>();

    let oneStone = (s: number, numBlinks: number) => {
        if (memo.has(`${s},${numBlinks}`)) {
            return memo.get(`${s},${numBlinks}`)!;
        }
        
        if (numBlinks === 0) {
            return 1;
        } else {
            let total = 0;
            const valueString = String(s);
            if (s === 0) {
                total = oneStone(1, numBlinks - 1);
            } else if (valueString.length % 2 === 0) {
                total = oneStone(Number(valueString.substring(0, valueString.length/2)), numBlinks - 1)
                     + oneStone(Number(valueString.substring(valueString.length/2)), numBlinks - 1);
            } else {
                total = oneStone(s * 2024, numBlinks - 1);
            }
            memo.set(`${s},${numBlinks}`, total);
            return total;
        }
    }

    let total = 0;
    for (let i = 0; i < stoneValues.length; i++) {
        const nextTotal = oneStone(stoneValues[i], 75);
        total += nextTotal;
    }
    console.log(total);
    
};

// part1();
part2();