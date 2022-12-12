import * as fs from "fs";
import yargs = require('yargs');

const args = yargs.options({
    'file': { type: 'string', demandOption: true, alias: 'f' },
  }).argv;
  
const fullFilePath = `${process.cwd()}/${args['file']}`;

if (!fs.existsSync(fullFilePath)) {
    console.error("No such file: " + fullFilePath);
}
const contents = fs.readFileSync(fullFilePath, 'utf8');
const lines = contents.trim().split(/\n/g);

const gameOfLife: boolean[][] = [];

let row = 0;
for (let line of lines) {
    gameOfLife[row++] = line.split('').map( (v) => v === '#');
}
const size = gameOfLife[0].length;

const getCellValue = (row: number, col: number) => {
    if (row >= 0 && col >= 0 && row < size && col < size) {
        return gameOfLife[row][col];
    } else {
        return false;
    }
}

const getNeighborCount = (row: number, col: number) => {

    const neighbors = [
        getCellValue(row - 1, col - 1),
        getCellValue(row - 1, col),
        getCellValue(row - 1, col + 1),
        getCellValue(row, col - 1),
        getCellValue(row, col + 1),
        getCellValue(row + 1, col - 1),
        getCellValue(row + 1, col),
        getCellValue(row + 1, col + 1),
    ]

    return neighbors.reduce( (p, v) => {
        return v ? p + 1 : p;
    }, 0);

}

const getNumberOn = () => {

    return gameOfLife.reduce( (p, v) => {
        return p + v.reduce( (p1, v1) => {
            return v1 ? p1 + 1 : p1
        }, 0);
    }, 0);
}

const turnCornersOn = () => {
    gameOfLife[0][0] = true;
    gameOfLife[size - 1][0] = true;
    gameOfLife[0][size - 1] = true;
    gameOfLife[size - 1][size - 1] = true;
}

console.dir(gameOfLife);


let currentGame: number[][] = [];
turnCornersOn();
for (let iteration = 0; iteration < 100; iteration++) {
    

    for (let row = 0; row < size; row++) {
        currentGame[row] = []
        for (let col = 0; col < size; col++) {
            currentGame[row][col] = getNeighborCount(row, col);
        }
    }

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const neighborCount = currentGame[row][col];
            const cellValue = getCellValue(row, col);

            if (cellValue && (neighborCount === 2 || neighborCount === 3)) {
                // do nothing
            } else if (!cellValue && neighborCount === 3) {
                gameOfLife[row][col] = true;
            } else {
                gameOfLife[row][col] = false;
            }

            
        }
    }

    // console.dir(gameOfLife);
    turnCornersOn();
    console.log(`Number On: ${getNumberOn()}`);
}

// console.dir(gameOfLife);