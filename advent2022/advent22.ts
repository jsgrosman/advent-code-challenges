import { getFileContents, point } from "../Utils";
    
const input = getFileContents().split(/\n/g);

const wallBlocks: Map<number, number[]> = new Map<number, number[]>();
const lineStarts: Map<number, number> = new Map<number, number>();
const lineEnds: Map<number, number> = new Map<number, number>();
const rowStarts: Map<number, number> = new Map<number, number>();
const rowEnds: Map<number, number> = new Map<number, number>();

let mazeDirections: string = '';

for (let row = 0; row < input.length; row++) {

    const arrayOfWallBlocks: number[] = [];
    const line = input[row];
    if (line.startsWith('10R')) {
        mazeDirections = line;
    } else if (line.trim() === '') {
        continue;
    } else {
        let startIndex = 0;
        let indexOfHash = -1;
        while (true) {
            indexOfHash = line.indexOf('#', startIndex);
            if (indexOfHash > -1) {
                arrayOfWallBlocks.push(indexOfHash);
                startIndex = indexOfHash + 1;
            } else {
                break;
            }
        }

        wallBlocks.set(row, arrayOfWallBlocks);
        lineStarts.set(row, Math.min(line.indexOf('.'), line.indexOf('#') !== -1 ? line.indexOf('#') : Number.MAX_SAFE_INTEGER ));
        lineEnds.set(row, Math.max(line.lastIndexOf('.'), line.lastIndexOf('#')));

        for (let i = lineStarts.get(row)!; i <= lineEnds.get(row)!; i++) {
            if (!rowStarts.has(i)) {
                rowStarts.set(i, row);
            }
            rowEnds.set(i, row);
        }
    }
}

console.dir(rowStarts);

type direction = 'Up' | 'Right' | 'Down' | 'Left';

let currentDirection: direction = 'Right';

const turn = (current: direction, turnDir: string): direction => {
    switch (current) {
        case 'Up':
            return turnDir === 'R' ? 'Right' : 'Left';
        case 'Right':
            return turnDir === 'R' ? 'Down' : 'Up'; 
        case 'Down':
            return turnDir === 'R' ? 'Left' : 'Right';
        case 'Left':
            return turnDir === 'R' ? 'Up' : 'Down';       
    }
}

const move = (location: point, dir: direction, dist: number) => {
    let col = location.x;
    let row = location.y

    switch (dir) {
        case 'Up': {
            const topOfRow = rowStarts.get(col)!;
            const bottomOfRow = rowEnds.get(col)!;
            for (let d = 0; d < dist; d++) {
                row--;
                if (row < topOfRow) {
                    if (!wallBlocks.get(bottomOfRow)!.includes(col)) {
                        row = bottomOfRow;
                    } else {
                        // console.log ('WALL!!');
                        row++;
                        break;
                    }
                }

                if (wallBlocks.get(row)!.includes(col)) {
                    // console.log ('WALL!!');
                    row++;
                    break;
                } 
            }
            break;
        }
        case 'Right': {
            const beginningOfLine = lineStarts.get(row)!;
            const endOfLine = lineEnds.get(row)!;
            for (let d = 0; d < dist; d++) {
                col++;
                if (col > endOfLine) { 
                    if (!wallBlocks.get(row)!.includes(beginningOfLine)) {
                        col = beginningOfLine;
                    } else {
                        // console.log ('WALL!!');
                        col--;
                        break;
                    }
                }

                if (wallBlocks.get(row)!.includes(col)) {
                    // console.log ('WALL!!');
                    col--;
                    break;
                } 
            }
            break;
        }  
        case 'Down': {
            const topOfRow = rowStarts.get(col)!;
            const bottomOfRow = rowEnds.get(col)!;
            for (let d = 0; d < dist; d++) {
                row++;
                if (row > bottomOfRow ) {
                    if (!wallBlocks.get(topOfRow)!.includes(col)) {
                        row = topOfRow;
                    } else {
                        // console.log ('WALL!!');
                        row--;
                        break;
                    }
                }

                if (wallBlocks.get(row)!.includes(col)) {
                    // console.log ('WALL!!');
                    row--; // deal with edge wall
                    break;
                } 
            }
            break;
        }
        case 'Left': {
            const beginningOfLine = lineStarts.get(row)!;
            const endOfLine = lineEnds.get(row)!;
            for (let d = 0; d < dist; d++) {
                col--;
                if (col < beginningOfLine) {
                    if (!wallBlocks.get(row)!.includes(endOfLine)) {
                        col = endOfLine;
                    } else {
                        // console.log ('WALL!!');
                        col++;
                        break;
                    }
                }

                if (wallBlocks.get(row)!.includes(col)) {
                    // console.log ('WALL!!');
                    col++;
                    break;
                } 
            }
            break;
        }
              
    }

    return {x: col, y: row};
}

let currentSpace = {x: lineStarts.get(0)!, y: 0};


const arrayOfMazeDirections = mazeDirections.replace(/(L|R)/g, "|$1|").split('|');

console.log(JSON.stringify(currentSpace));

let distance = 0;
for (const mazeDir of arrayOfMazeDirections) {

    if (mazeDir.match(/\d+/)) {
        distance = Number(mazeDir);
        // console.log(`Go ${distance} in ${currentDirection}`);
        currentSpace = move(currentSpace, currentDirection, distance);
        // console.log(JSON.stringify(currentSpace));
    } else {
        currentDirection = turn(currentDirection, mazeDir);
        // console.log(`Turn to ${currentDirection}`);
    }
   
}

console.log(`----`);
console.log(JSON.stringify(currentSpace));
console.log(currentDirection);

let currentDirectionNum = 0;
switch (currentDirection) {
    case 'Up':
        currentDirectionNum = 3;
        break;
    case 'Right':
        currentDirectionNum = 0;
        break;
    case 'Down':
        currentDirectionNum = 1;
        break;
    case 'Left':
        currentDirectionNum = 2;
        break; 
}

const finalSum = (1000 * (currentSpace.y + 1)) + (4 * (currentSpace.x + 1)) + currentDirectionNum;
console.log(`final sum = ${finalSum}`);