import { explode, split, reduce, add, magnitude } from './advent18-functions';
import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);






// let snail = '[[6,[5,[12,[31,20]]]],13]';
// console.log(snail);
// console.log(explode(snail));

// let snail = '[[[[14,0],[7,7]],[[7,14],[20,39]]],[[[0,7],[11,0]],[[19,0],[9,4]]]]';
// console.log(snail);
// console.log(split(snail));

let maxMag = 0;
for (let snailIndex1 = 0; snailIndex1 < lines.length; snailIndex1++) {
    for (let snailIndex2 = snailIndex1; snailIndex2 < lines.length; snailIndex2++) {

        const sum1 = add(lines[snailIndex1], lines[snailIndex2]);
        const reduced1 = reduce(sum1);
        const mag1 = magnitude(reduced1);
        maxMag = Math.max(mag1, maxMag);
    
        const sum2 = add(lines[snailIndex2], lines[snailIndex1]);
        const reduced2 = reduce(sum2);
        const mag2 = magnitude(reduced2);
        maxMag = Math.max(mag2, maxMag);

    }

}

// let currentLine = lines.shift() || '';
// for (let line of lines) {
//     const sum = add(currentLine, line);
//     // console.log(`sum: ${sum}`);
//     const reduced = reduce(sum);
//     // console.log(`reduced: ${reduced}`);
//     currentLine = reduced;
// }

console.log(maxMag);

// const sum = add('[[[[4,3],4],4],[7,[[8,4],9]]]', '[1,1]');
// console.log(`sum: ${sum}`);
// const reduced = reduce(sum);
// console.log(`reduced: ${reduced}`);
