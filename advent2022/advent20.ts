import { getFileContents } from "../Utils";
    
const code = getFileContents().trim().split(/\n/g);

const DECRYPTION_KEY = 811589153;
const NUM_ROUNDS = 10;

// create two arrays, one to iterate, and one to apply the transformations
// modify the array values to make the unique so that we can index them. Prepending the original array index should be sufficient
const codeToIterate = code.map(v => Number(v) * DECRYPTION_KEY).map( (v, i) => `${i}:${v}`);
const codeToIndex = Array.from(codeToIterate);


for (let round = 0; round < NUM_ROUNDS; round++) {
    for (let index = 0; index < codeToIterate.length; index++) {
        const key = codeToIterate[index];
        const [_, value] = key.split(':', 2).map(Number);

        // I don't want to have to deal with taking the mod of negative numbers
        // Just reverse the list and use the absolute value instead
        if (value < 0) {
            codeToIndex.reverse();
        }
    
        const mappedIndex = codeToIndex.indexOf(key);
        codeToIndex.splice(mappedIndex, 1);
        const newIndex = (mappedIndex + Math.abs(value)) % codeToIndex.length;
        codeToIndex.splice(newIndex, 0,  key);
    
        // if we reversed it once, we need to undo it.
        if (value < 0) {
            codeToIndex.reverse();
        }
    }
}

// Map the transformed array back into an array of integers to finish us off
const finalCode = codeToIndex.map( v => v.split(':', 2).map(Number)[1] );
const zeroIndex = finalCode.indexOf(0);


const answer = finalCode[(zeroIndex + 1000) % finalCode.length] + 
finalCode[(zeroIndex + 2000) % finalCode.length] +
finalCode[(zeroIndex + 3000) % finalCode.length];
console.log(`answer: ${answer}`);



