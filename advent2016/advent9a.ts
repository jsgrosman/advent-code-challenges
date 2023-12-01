import { getFileContents } from "../Utils";

let multipleRepeat = ( instruction: string, repeatCount: number ) => {
    let inst = instruction.slice(1);
    inst = inst.slice(0, inst.length - 1);
    
    const [numChars, repeat] = inst.split('x').map(Number);
    const replacement = `(${numChars}x${repeat * repeatCount})`;
    return replacement;
}

const contents = getFileContents();



let startingWord = contents.trim();
const letterCount: number[] = Array(startingWord.length).fill(1);

let result = Array.from(startingWord.matchAll(/\((\d+)x(\d+)\)/g));
for (let i = 0; i < result.length; i++) {
    const currentResult = result[i];
    const matchIndex = currentResult.index!;
    const numChars = Number(currentResult[1]);
    const repeat = Number(currentResult[2]);
    const matchString = currentResult[0];

    let index = matchIndex;
    for (; index < matchIndex + matchString.length; index++) {
        letterCount[index] = 0;
    }
    for (; index < matchIndex + matchString.length + numChars; index++) {
        letterCount[index] = letterCount[index] * repeat;
    }
}

const count = letterCount.reduce( (p, c) => {
    return p + c;
});
console.log(`count = ${count}`);
