import { getFileContents } from "../Utils";

const stream = getFileContents().trim().split(',').map( v => Number(v));

const CODE_SIZE = 256;
const code: number[] = [];
for (let i = 0; i < CODE_SIZE; i++) {
    code[i] = i;
}

let currentPos = 0;
let skipSize = 0;
console.log(`${currentPos}: ${JSON.stringify(code)}`);


for (let lengthOfCycle of stream) {

    const replacement: number[] = [];
    
    for (let i = currentPos; i < currentPos + lengthOfCycle; i++) {
        replacement.unshift(code[i % code.length]);
    }
//     console.log(JSON.stringify(replacement));
   

    for (let i = currentPos; i < currentPos + lengthOfCycle; i++) {
        code[i % code.length] = replacement.shift()!;
    }

    currentPos = (currentPos + lengthOfCycle + skipSize) % code.length;
    skipSize++;
 //   console.log(`${currentPos}: ${JSON.stringify(code)}`);
}

console.log(JSON.stringify(code));
console.log(code[0] * code[1]);
