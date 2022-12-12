import { getFileContents, point, pointCompare } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

const enhancement = lines.shift()!.split('');
lines.shift();

let grid: string[][] = [];

for (let line of lines) {
    grid.push(line.trim().split(''));
}

const print2dArr = (arr: any[][]) => {

    console.log();
    for (let row = 0; row < arr.length; row++) {
        let s = '';
        for (let col = 0; col < arr[0].length; col++) {
            if (arr[row][col] === '#') {
                s += '#';
            } else {
                s += '.';
            }
            
        }
        console.log(s);
    }

}

print2dArr(grid);

const addBorder = (arr: string[][], emptyChar: string) => {
    const cols = arr[0].length;
    const rows = arr.length;

    arr.unshift(new Array(cols).fill(emptyChar));
    arr.push((new Array(cols).fill(emptyChar)));

    for (let rowArr of arr) {
        rowArr.unshift(emptyChar);
        rowArr.push(emptyChar);
    }
};

const getPixels = (row: number, col: number, arr: string[][], outsideSquares: string) => {

    const result: string[] = [];

    if (row > 0 && col > 0) {
        result.push(arr[row - 1][col - 1]); // top left
    } else {
        result.push(outsideSquares);
    }

    if (row > 0) {
        result.push(arr[row - 1][col]); // top
    } else {
        result.push(outsideSquares);
    }

    if (row > 0 && col < arr[0].length - 1) {
        result.push(arr[row - 1][col + 1]); // top right
    } else {
        result.push(outsideSquares);
    }

    if (col > 0) {
        result.push(arr[row][col - 1]); // left
    } else {
        result.push(outsideSquares);
    }

    result.push(arr[row][col]); //center

    if (col < arr[0].length - 1) {
        result.push(arr[row][col + 1]); // right
    } else {
        result.push(outsideSquares);
    }

    if (row < arr.length - 1 && col > 0) {
        result.push(arr[row + 1][col - 1]); // bottom left
    }  else {
        result.push(outsideSquares);
    }

    if (row < arr.length - 1) {
        result.push(arr[row + 1][col]); // bottom
    }  else {
        result.push(outsideSquares);
    }
    
    if (row < arr.length - 1 && col < arr[0].length - 1) {
        result.push(arr[row + 1][col + 1]); // bottom right
    } else {
        result.push(outsideSquares);
    }
    
    return result;
}

// print2dArr(grid);
let pixelTotal = 0;
let newGrid: string[][] = [];
let outsidePixels = false;
for (let i = 0; i < 50; i++) {
    pixelTotal = 0;
    newGrid = [];
    
    addBorder(grid, outsidePixels ? enhancement[0] : '.');

    for (let row = 0; row < grid.length; row++) {
        newGrid.push([]);

        for (let col = 0; col < grid[0].length; col++) {
            const pixelIndex = parseInt(getPixels(row, col, grid, outsidePixels ? enhancement[0]  : '.').map( (v) => {
                return v === '.' ? '0' : '1';
            }).join(''), 2);
            // console.log(pixelIndex);

            const newPixel = enhancement[pixelIndex];
            if (newPixel === '#') {
                pixelTotal++;
            }
            
            newGrid[row][col] = newPixel;
        }
    }
    
    grid = newGrid;
    print2dArr(grid);

    console.log(`pixel total: ${pixelTotal}`);
    outsidePixels = !outsidePixels;
}

// print2dArr(grid);

const numPixels = grid.reduce( (p1, c1) => {
    return p1 + c1.reduce( (p2, c2) => {
        if (c2 === '#') {
            return p2 + 1;
        } else {
            return p2;
        }
    }, 0);
}, 0);

console.log(`num pixels: ${numPixels}`);