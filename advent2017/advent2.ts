import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

let total = 0;
for (let line of lines) {

    const arr = line.split(/\s+/).map(Number);
    
    arr.sort( (a, b) => a - b);
    console.dir(arr);

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] % arr[i] === 0) {
                total += (arr[j] / arr[i]);
            }
        }
    }

    // const max = arr.reduce( (c, p) => {
    //     return Math.max(c, p);
    // }, Number.MIN_VALUE);

    // const min = arr.reduce( (c, p) => {
    //     return Math.min(c, p);
    // }, Number.MAX_VALUE);

    // console.log(max - min);

    // total += (max - min);
}

console.log(`total: ${total}`);