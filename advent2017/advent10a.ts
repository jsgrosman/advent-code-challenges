import { getFileContents } from "../Utils";

const stream = getFileContents().trim().split('').map( v => Number(v.charCodeAt(0)));
stream.push(17, 31, 73, 47, 23);
console.dir(stream);



const CODE_SIZE = 256;
let code: number[] = [...new Array<number>(CODE_SIZE).keys()];

let currentPos = 0;
let skipSize = 0;
// console.log(`${currentPos}: ${JSON.stringify(code)}`);

for (let round = 0; round < 64; round++) {
    for (const lengthOfCycle of stream) {

        if (lengthOfCycle > 1) {
            code = [...code.slice(currentPos), ...code.slice(0, currentPos)];
            code = [...code.slice(0, lengthOfCycle).reverse(), ...code.slice(lengthOfCycle)];
            code = [...code.slice(-currentPos), ...code.slice(0, -currentPos)];
        }
        currentPos = (currentPos + lengthOfCycle + skipSize++) % CODE_SIZE;

        // const replacement: number[] = [];
        
        // for (let i = currentPos; i < currentPos + lengthOfCycle; i++) {
        //     replacement.unshift(code[i % code.length]);
        // }
       
    
        // for (let i = currentPos; i < currentPos + lengthOfCycle; i++) {
        //     code[i % code.length] = replacement.shift()!;
        // }
    
        // currentPos = (currentPos + lengthOfCycle + skipSize) % code.length;
        // skipSize++;
    }
}

const denseHash: number[] = []
for (let i = 0; i < CODE_SIZE; i += 16) {

    denseHash.push( code.slice(i, i + 16).reduce( (p,c) => p ^ c) );
}
const hexString = denseHash.map( v => v.toString(16) ).map( v => v.padStart(2, '0')).join('');


console.log(JSON.stringify(code));
console.log(JSON.stringify(denseHash));
console.log(hexString);
// console.log(code[0] * code[1]);
