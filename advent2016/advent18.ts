import { getFileContents, print2dArr } from "../Utils";

const NUM_ROWS = 400000;

const contents = getFileContents();

const trapMaze: string[][] = [];
trapMaze[0] = contents.split('');

let numSafeSpaces = trapMaze[0].filter( v => v === '.').length;

let previousRow = contents.split('');
for (let row = 0; row < NUM_ROWS - 1 ; row++) {

    const nextRow: string[] = [];

    for (let col = 0; col < contents.length; col++) {
        const left = col > 0 ? previousRow[col - 1] : '.';
        const center = previousRow[col];
        const right = col < contents.length - 1 ? previousRow[col + 1] : '.';

        if (left === right) {
            numSafeSpaces++;
            nextRow[col] = '.';
        } else {
            nextRow[col] = '^';
        }
    }

    previousRow = nextRow;
}

// print2dArr(trapMaze);
console.log(`Number of safe spaces = ${numSafeSpaces}`);

