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

let result = startingWord.match(/\((\d+)x(\d+)\)/);

let count = 0;
while (result !== null) {
    // console.dir(result);

    const matchIndex = result!.index!;
    const numChars = Number(result![1]);
    const repeat = Number(result![2]);
    const matchString = result![0];

    // console.log(matchString);
    console.log(`instruction: ${matchString}, numChars: ${numChars}, repeat: ${repeat}, count: ${count}, remaining: ${startingWord.length}`);

    startingWord = startingWord.replace(matchString, '');
    let replacementString = startingWord.substring(matchIndex, matchIndex + numChars);



    // replacementString = replacementString.replace(/\(/g, '{');
    // replacementString = replacementString.replace(/\)/g, '}');
    // console.log(replacementString);
    
    let newString = '';
    for (let c = 0; c < repeat; c++) {
        newString += replacementString;
    }

    count += matchIndex;
    startingWord = newString + startingWord.substring(matchIndex + replacementString.length);

    result = startingWord.match(/\((\d+)x(\d+)\)/);
}
count += startingWord.length;

// console.log(startingWord);
// console.log('XABCABCABCABCABCABCY');
console.log(count);
