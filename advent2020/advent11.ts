import { getFileContents, getNeigborValues } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

let seatMap: string[][] = [];

for (let line of lines) {
    seatMap.push(line.split(''));
}

const print = (arr: string[][]) => {
    console.log('\n');
    for (let row = 0; row < arr.length; row++) {
        let s = '';
        for (let col = 0; col < arr[0].length; col++) {
            s += arr[row][col];
        }
        console.log(s);
    }
}

const getVisibleNeighbors = (row: number, col: number, arr: string[][]) => {

    const results: string[] = [];

    // top
    for (let r = row - 1; r >= 0; r--) {
        if (arr[r][col] !== '.') {
            results.push(arr[r][col]);
            break;
        }
    }

    // top left
    for (let r = row - 1, c = col -1; r >= 0 && c >= 0; r--, c--) {
        if (arr[r][c] !== '.') {
            results.push(arr[r][c]);
            break;
        }
    }

    // top right
    for (let r = row - 1, c = col + 1; r >= 0 && c < arr[0].length; r--, c++) {
        if (arr[r][c] !== '.') {
            results.push(arr[r][c]);
            break;
        }
    }

    // bottom
    for (let r = row + 1; r < arr.length; r++) {
        if (arr[r][col] !== '.') {
            results.push(arr[r][col]);
            break;
        }
    }

    // bottom left
    for (let r = row + 1, c = col -1; r < arr.length && c >= 0; r++, c--) {
        if (arr[r][c] !== '.') {
            results.push(arr[r][c]);
            break;
        }
    }

    // bottom right
    for (let r = row + 1, c = col + 1; r < arr.length && c < arr[0].length; r++, c++) {
        if (arr[r][c] !== '.') {
            results.push(arr[r][c]);
            break;
        }
    }

    // left
    for (let c = col - 1; c >= 0; c--) {
        if (arr[row][c] !== '.') {
            results.push(arr[row][c]);
            break;
        }
    }

    // right
    for (let c = col + 1; c < arr[0].length; c++) {
        if (arr[row][c] !== '.') {
            results.push(arr[row][c]);
            break;
        }
    }

    return results;
}

// print(seatMap);

let numChanges = 99;
while (numChanges > 0) {
// for (let i = 0; i < 5; i++) {  
    numChanges = 0;

    let newSeatMap: string[][] = [];
    for (let row = 0; row < seatMap.length; row++) {
        newSeatMap[row] = [];
        for (let col = 0; col < seatMap[0].length; col++) {
            const seat = seatMap[row][col];
            switch (seat) {
                case '.':
                    newSeatMap[row][col] = '.';
                    break;
                case 'L':
                    if (getVisibleNeighbors(row, col, seatMap).filter( (v) => v === '#').length === 0) {
                        newSeatMap[row][col] = '#';
                        numChanges++;
                    } else {
                        newSeatMap[row][col] = 'L';
                    }
                    break;
                case '#':
                    if (getVisibleNeighbors(row, col, seatMap).filter( (v) => v === '#').length >= 5) {
                        newSeatMap[row][col] = 'L';
                        numChanges++;
                    } else {
                        newSeatMap[row][col] = '#';
                    }
                    break;    
            }
        }
    }
    seatMap = newSeatMap;

    // print(seatMap);
}

const result = seatMap.reduce( (p1, row) => {
    return p1 + row.reduce( (p2, seat) => {
        if (seat === '#') {
            return p2 + 1;
        } else {
            return p2;
        }
    }, 0);

}, 0);

console.log(result);
