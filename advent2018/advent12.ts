import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const initialState = lines.shift()!.split(': ')[1]!.split('');
    let pots: Map<number,boolean> = new Map<number,boolean>(); 
    for (let index = 0; index < initialState.length; index++) {
        if (initialState[index] === '#') {
            pots.set(index, true);
        }
    }
    lines.shift();

    const rules: Map<string,string> = new Map<string,string>();
    for (let line of lines) {
        const [state, result] = line.split(' => ', 2);
        rules.set(state,result);
    }

    console.dir(pots);
    console.dir(rules);


    ;


    
    let prevSum = 0;
    let prevDiff = 0;
    for (let currentGen = 0; currentGen < 300; currentGen++) {
        const newPots: Map<number,boolean> = new Map<number,boolean>(); 

        let maxPot = Number.MIN_SAFE_INTEGER;
        let minPot = Number.MAX_SAFE_INTEGER;


        for (let potNum of pots.keys()) {
            minPot = Math.min(potNum, minPot);
            maxPot = Math.max(potNum, maxPot);
        }

        

        // if (currentGen % 100000 === 0) {
        //     if (diff === 3400000) {
        //         prevSum += diff;
        //         console.log(`gen ${currentGen}: ${minPositivePot} => ${maxPositivePot} = ${maxPositivePot - minPositivePot}, ${pots.size} pots, sum = ${prevSum}`);
        //         continue;
        //     }

        //     const sum = Array.from(pots.keys()).reduce( (p, c) => p + c);
        //     console.log(`gen ${currentGen}: ${minPositivePot} => ${maxPositivePot} = ${maxPositivePot - minPositivePot}, ${pots.size} pots, sum = ${sum}, diff = ${sum - prevSum}`);
        //     diff = sum - prevSum;
        //     prevSum = sum;
        // }

        // if (diff === 3400000) {
        //     continue;
        // }
        
        for (let currentPot = minPot - 2; currentPot < maxPot + 2; currentPot++) {
            let pattern = '';
            for (let x = currentPot - 2; x <= currentPot + 2; x++) {
                if (pots.has(x)) {
                    pattern += '#';
                } else {
                    pattern += '.';
                }
            }
            if (rules.has(pattern) && rules.get(pattern) === '#') {
                newPots.set(currentPot, true);
            }
        }

        const sum = Array.from(pots.keys()).reduce( (p, c) => p + c);
        const diff = sum - prevSum;
        console.log(`${currentGen}: ${minPot} => ${maxPot}, ${sum}, ${diff}`);

        // if (diff === 34) {
        //     break;
        // }
        prevSum = sum;
        prevDiff = diff;
        
        pots = newPots;
    }

    // const sum = Array.from(pots.keys()).reduce( (p, c) => p + c);
    console.log(prevSum);

    console.log(((50000000000 - 193) * 34) + 6573);
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);


};

part1();
// part2();