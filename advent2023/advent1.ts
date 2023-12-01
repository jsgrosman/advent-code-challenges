import { getFileContents } from "../Utils";
const contents = getFileContents();
const lines = contents.trim().split(/\n/g);




const readNum = (s: string) => {

    switch (s) {
        case 'one':
        case 'on':
            return '1';
        case 'two':
        case 'tw':    
            return '2';
        case 'three':
        case 'thre':    
            return '3';
        case 'four':
            return '4';
        case 'five':
        case 'fiv':    
            return '5';
        case 'six':
            return '6';
        case 'seven':
        case 'seve':   
            return '7';
        case 'eight':
        case 'eigh':    
            return '8';
        case 'nine':
        case 'nin':    
            return '9';
        default:
            return s;    
    }

}

let total = 0;
for (const line of lines) {

    const result = line.match(/(on(?=e)|tw(?=o)|thre(?=e)|four|fiv(?=e)|six|seve(?=n)|eigh(?=t)|nin(?=e)|\d)/g)!;
    const digit1 = readNum(result[0]);
    const digit2 = readNum(result[result.length - 1]);
    total += Number(digit1 + digit2);


    line.split('').reverse()

}
console.log(`Total: ${total}`);




// const searches = [
//     '1', '2', '3', '4', '5', '6', '7', '8', '9',
//     'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
// ]
// for (const line of lines) {
//     let firstIndex = Number.MAX_VALUE;
//     let firstDigit = '';

//     for (const s of searches) {
//         const index = line.indexOf(s);
//         if (index != -1 && index < firstIndex) {
//             firstIndex = index;
//             firstDigit = s;
//         }
//     }

//     let lastIndex = -1;
//     let lastDigit = '';

//     for (const s of searches) {
//         const index = line.lastIndexOf(s);
//         if (index != -1 && index > lastIndex) {
//             lastIndex = index;
//             lastDigit = s;
//         }
//     }

//     const digit1 = readNum(firstDigit);
//     const digit2 = readNum(lastDigit);

//     total += Number(digit1 + digit2);

// }



