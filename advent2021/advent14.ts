import { getFileContents, sortHashmap } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

interface transformation {
    searchString: string,
    replacement: string
}


const transformationList: transformation[] = [];

const transform = (str: string) => {

    const replacement = transformationList.find( (v) => {
        return v.searchString === str;
    })!.replacement;

    const r1 =  str.substr(0, 1) + replacement;
    const r2 =  replacement + str.substr(1, 1);

    return [r1, r2];
}


for (let line of lines) {
    const [searchString, replacement] = line.split(' -> ', 2);
    transformationList.push({
        searchString,
        replacement
    })
}

const initialString = 'SHPPPVOFPBFCHHBKBNCV';


const pairsMap = new Map<string, number>();
const incrementPair = (pair: string, count: number, p: Map<string, number>) => {
    if (p.has(pair)) {
        p.set(pair, p.get(pair)! + count);
    } else {
        p.set(pair, count);
    }
}

const decrementPair = (pair: string, count: number, p: Map<string, number>) => {
    if (p.has(pair)) {
        p.set(pair, p.get(pair)! - count);
    } else {
        p.set(pair, 0);
    }
}

const duplicatePairsMap = (p: Map<string, number>) =>
{
    const newPairsMap = new Map<string, number>();
    for (let [pair, count] of p.entries()) {
        newPairsMap.set(pair, count);
    }
    return newPairsMap;
}



for (let index = 0; index < initialString.length - 1; index++) {
    const matchString = initialString.substr(index, 2);
    incrementPair(matchString, 1, pairsMap);
}

let oldPairsMap = pairsMap;
for (let i = 0; i < 40; i++) {
    let newPairsMap = duplicatePairsMap(oldPairsMap);
    for (let [pair, count] of oldPairsMap.entries()) {
        const [p1, p2] = transform(pair);
         decrementPair(pair, count, newPairsMap);
         incrementPair(p1, count, newPairsMap);
         incrementPair(p2, count, newPairsMap);
    }
    oldPairsMap = newPairsMap;
    // console.dir(oldPairsMap);
}
console.dir(oldPairsMap);

const letterMap = new Map<string, number>();
letterMap.set(initialString.charAt(initialString.length - 1), 1);
for (let [pair, count] of oldPairsMap.entries()) {
    const l1 = pair.charAt(0);
    const l2 = pair.charAt(1);


    if (letterMap.has(l1)) {
        letterMap.set(l1, letterMap.get(l1)! + count);
    } else {
        letterMap.set(l1, count)
    }

        // if (letterMap.has(l2)) {
        //     letterMap.set(l2, letterMap.get(l2)! + count);
        // } else {
        //     letterMap.set(l2, count)
        // }
}
// console.log(sortHashmap(letterMap));

const sortedLetterValues = Array.from(sortHashmap(letterMap).values());
console.log(sortedLetterValues[0] - sortedLetterValues[sortedLetterValues.length - 1]);




// let currentString = initialString;

// for (let i = 0; i < 10; i++) {
//     let newString = currentString.charAt(0);
//     for (let index = 0; index < currentString.length - 1; index++) {
//         const matchString = currentString.substr(index, 2);
//         newString += transform(matchString); 
//     }
//     // console.log(newString);
//     currentString = newString;
// }

// console.log(currentString.length);

// const sortedString = currentString.split('').sort( (a,b) => a.localeCompare(b)).join('');


// let maxLetter = '';
// let max = 0;
// let minLetter = '';
// let min = 99999999999;
// let currentLetter = sortedString.charAt(0);
// let currentCount = 0;

// const letterMap = new Map<string, number>();

// for (let letter of sortedString.split('')) {

//     if (letter !== currentLetter) {
//         letterMap.set(currentLetter, currentCount);
//         if (currentCount > max) {
//             maxLetter = currentLetter;
//             max = currentCount;
//         } 
//         if (currentCount < min) {
//             minLetter = currentLetter;
//             min = currentCount;
//         }
//         currentLetter = letter;
//         currentCount = 1;
//     } else {
//         currentCount++;
//     }
// }
// letterMap.set(currentLetter, currentCount);
// if (currentCount > max) {
//     maxLetter = currentLetter;
//     max = currentCount;
// } 
// if (currentCount < min) {
//     minLetter = currentLetter;
//     min = currentCount;
// }

// console.log(`min: ${min} ${minLetter}, max: ${max} ${maxLetter}`);

// console.dir(letterMap);

// console.log(max - min);