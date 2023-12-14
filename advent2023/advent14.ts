import { getFileContents, print2dArr } from "../Utils";
import { getColumn, cloneGrid } from "../lib/Grid";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const grid: string[][] = [];
    for (let line of lines) {
        grid.push(line.split(''));
    }

    let load = 0;
    for (let col = 0; col < grid[0].length; col++) {
        
        let numEmptySpaces = 0;
        let column = getColumn(grid, col);
        for (let row = 0; row < column.length; row++) {
            let edge = column.length;
            if (column[row] === '#') {
                edge = row + 1;
                numEmptySpaces = 0;
            }
            if (column[row] === '.') {
                numEmptySpaces++;
            }
            
            if (column[row] === 'O') {
                load += edge - row + numEmptySpaces;
            }
        }
    }

    console.log(`total load = ${load}`);

};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    let grid: string[][] = [];
    for (let line of lines) {
        grid.push(line.split(''));
    }

    const tilt = (column: string[]) => {
        const newColumn: string[] = [];

        for (let index = 0; index < column.length; index++) {
            switch (column[index]) {
                case '#':
                case 'O':
                    newColumn[index] = column[index]; 
                    break;
                default:
                    const indexOfNextO = column.indexOf('O', index);
                    const indexOfNextCube = column.indexOf('#', index);

                    if (indexOfNextO === -1) {
                        newColumn[index] = '.';
                    } else if (indexOfNextO !== -1 && indexOfNextCube === -1) {
                        newColumn[index] = 'O';
                        column[indexOfNextO] = '.';
                    } else if (indexOfNextO < indexOfNextCube) {
                        newColumn[index] = 'O';
                        column[indexOfNextO] = '.';
                    } else {
                        newColumn[index] = '.';
                    }   
                    break;   
            }
        }

        return newColumn;
    }

    const cycleCache: Map<string, number> = new Map<string, number>();

    const tiltNorth = (grid: string[][]) => {
        for (let col = 0; col < grid[0].length; col++) {
            let column = getColumn(grid, col);
            column = tilt(column);
            for (let row = 0; row < grid.length; row++) {
                grid[row][col] = column[row];
            }
        }
    }

    const tiltSouth = (grid: string[][]) => {
        for (let col = 0; col < grid[0].length; col++) {
            let column = getColumn(grid, col);
            column.reverse();
            column = tilt(column);
            column.reverse();

            for (let row = 0; row < grid.length; row++) {
                grid[row][col] = column[row];
            }
        }
    }

    const tiltWest = (grid: string[][]) => {
        for (let row = 0; row < grid.length; row++) {
            grid[row] = tilt(grid[row]);
        }
    }

    const tiltEast = (grid: string[][]) => {
        for (let row = 0; row < grid.length; row++) {
            grid[row].reverse();
            grid[row] = tilt(grid[row]);
            grid[row].reverse();
        }

    }

    const getLoad = (grid: string[][]) => {
        let load = 0;
        for (let col = 0; col < grid[0].length; col++) {
            
            let numEmptySpaces = 0;
            let column = getColumn(grid, col);
            for (let row = 0; row < column.length; row++) {
                let edge = column.length;
    
                if (column[row] === '#') {
                    edge = row + 1;
                    numEmptySpaces = 0;
                }
                if (column[row] === '.') {
                    numEmptySpaces++;
                }
                
                if (column[row] === 'O') {
                    load += edge - row; // + numEmptySpaces;
                }
            }
        }

        return load;

    }

    const CYCLES = 1000000000;
    let cycleLength = 0;
    let i = 0;
    for (; i < CYCLES; i++) {
        const key = JSON.stringify(grid);
        if (cycleCache.has(key)) {
            const cycleStart = cycleCache.get(key)!;
            cycleLength = i - cycleStart;
            break;
        }

        tiltNorth(grid);
        tiltWest(grid);
        tiltSouth(grid);
        tiltEast(grid);
        cycleCache.set(key, i);
    }

    for (; i < CYCLES - cycleLength; i += cycleLength) {

    }
    for (; i < CYCLES ; i ++) {
        tiltNorth(grid);
        tiltWest(grid);
        tiltSouth(grid);
        tiltEast(grid);
    }

    console.log(`total load = ${getLoad(grid)}`);
};

part1();
part2();