import { getFileContents, print2dArr } from "../Utils";

const screen: string[][] = [];
for (let i = 0; i < 6; i++) {
    screen[i] = Array(50).fill('.');
}

print2dArr(screen);

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

for (let line of lines){

    if (line.startsWith('rect')) {
        // rect 1x1
        let [command, size] = line.split(' ', 2);
        let [numRows, numCols] = size.split('x').map(Number);
        console.log(`numRows: ${numRows}, numCols: ${numCols}`);

        for (let c = 0; c < numCols; c++) {
            for (let r = 0; r < numRows; r++) {
                screen[c][r] = '#';
            }
        }
    }

    if (line.startsWith('rotate')) {
        let [command, rotateType, startingPoint, by, amount] = line.split(' ', 5);

        console.log(`${command} ${rotateType} ${startingPoint} ${amount}`);
        let [startingAxis, startingValue] = startingPoint.split('=');
        if (rotateType === 'row') {
            let rowIndex = Number(startingValue);
            let removedElements = screen[rowIndex].splice(-Number(amount));
            screen[rowIndex].unshift(...removedElements);
        } 
        else {
            let colIndex = Number(startingValue);
            let savedColumn: string[] = [];
            for (let c = 0; c < 6; c++) {
                savedColumn[c] = screen[c][colIndex];
            }
            let removedElements = savedColumn.splice(-Number(amount));
            savedColumn.unshift(...removedElements);

            for (let c = 0; c < 6; c++) {
                screen[c][colIndex] = savedColumn[c];
            }
        }
    }
}

print2dArr(screen);

let countOfPixels = 0;
for (let c = 0; c < 6; c++) {
    for (let r = 0; r < 50; r++) {
        if (screen[c][r] === '#') {
            countOfPixels++
        }
    }
}

console.log(`On Pixels: ${countOfPixels}`);