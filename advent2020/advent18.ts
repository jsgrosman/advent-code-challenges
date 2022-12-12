import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);




const evaluate = (expression: string) => {
    
    const parseArr: string[][] = [];
    
    let parenLevel = 0;
    parseArr[0] = [];
    for (let index = 0; index < expression.length; index++) {
        
        const char = expression[index];

        if (/\d/.test(char)) {
            parseArr[parenLevel].push(char);
        } else if (char === '(') {
            parseArr.push([]);
            parenLevel++;

        } else if (char === ')') {
            // solve current paren level
            parseArr[parenLevel - 1].push(String(doMath(parseArr[parenLevel])));
            parenLevel--;
            parseArr.pop();
            
        } else if (char === '+') {
            parseArr[parenLevel].push(char);
        } else if (char === '*') {
            parseArr[parenLevel].push(char);
        }
    }

    return doMath(parseArr[0]);
}

const doMath = ( arr: (string)[]) => {

    // do all *
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '+') {
            arr[i - 1] = String(Number(arr[i - 1]) + Number(arr[i + 1]));
            arr.splice(i, 2);
            i -= 2;
        }        
    }

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '*') {
            arr[i - 1] = String(Number(arr[i - 1]) * Number(arr[i + 1]));
            arr.splice(i, 2);
            i -= 2;
        }
    }
    return Number(arr[0]);

    // let result = 0;
    // let operation = '';
    // for (let v of arr) {
    //     if (/\d/.test(v)) {
    //         if (operation === '+') {
    //             result += Number(v);
    //             operation = '';
    //         } else if (operation === '*') {
    //             result *= Number(v);
    //             operation = '';
    //         } else {
    //             result = Number(v);
    //         }
    //     } else {
    //         operation = v;
    //     }
    // }

    // return result;
}

let sum = 0;
for (let line of lines) {
    const answer = evaluate(line);
    console.log(answer);
    sum += answer;
}

console.log(`sum: ${sum}`);