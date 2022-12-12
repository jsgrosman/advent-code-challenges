import { getFileContents } from "../Utils";

const trees: boolean[][] = [];

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

for (let line of lines) {
    trees.push( line.split('').map( ( v ) => v === '#'));
}

const slopesToCheck = [
    [1,1],
    [3,1],
    [5,1],
    [7,1],
    [1,2]

];

// const slopesToCheck = [ [1,2] ];

let result = 1;
for (let slope of slopesToCheck) {

    let col = 0;
    let count = 0;
    for (let row = slope[1]; row < trees.length; row += slope[1]) {
    col = (col + slope[0]) % trees[0].length;
    // console.log(`${row},${col}: ${trees[row][col]}`);
    if (trees[row][col]) {
        count++;
    }

    }

    console.log(count);
    result = result * count;
}

console.log(result);
