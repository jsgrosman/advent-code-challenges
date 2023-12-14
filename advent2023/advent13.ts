import { getFileContents } from "../Utils";

const findHorizontalMirror = (grid: string[][], invalidRow = -1) => {
    NEXT_ROW:
    for (let row = 1; row < grid.length; row++) {
        for (let mirrorRow = 1; row - mirrorRow >= 0 && row + mirrorRow - 1 < grid.length; mirrorRow++) {
            if (grid[row - mirrorRow].join('') !== grid[row + mirrorRow - 1].join('')) {
                continue NEXT_ROW;
            }
        }
        if (invalidRow !== row) {
            return row;
        } 
    }
    return -1;
}

const findVerticalMirror = (grid: string[][], invalidCol = -1) => {
    NEXT_COL:
    for (let col = 1; col < grid[0].length; col++) {
        for (let mirrorCol = 1; col - mirrorCol >= 0 && col + mirrorCol - 1 < grid[0].length; mirrorCol++) {
            if (grid.reduce ( (prev, row) => prev + row[col - mirrorCol], '') !== grid.reduce ( (prev, row) => prev + row[col + mirrorCol - 1], '')) {
                continue NEXT_COL;
            }
        }
        if (invalidCol !== col) {
            return col;
        } 
    }
    return  -1;
}

const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const processGrid = (grid: string[][]) => {
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                let mirrorRow = findHorizontalMirror(grid);
                if (mirrorRow !== -1) {
                    return (100 * mirrorRow);
                }
        
                let mirrorCol = findVerticalMirror(grid);
                if (mirrorCol !== -1) {
                    return (mirrorCol);
                }
            }
        }
        return 0;
    }

    let total = 0;
    let grid: string[][] = [];
    for (const line of lines) {
        if (line.length === 0) {
            total += processGrid(grid);
            grid = []; // empty grid
            continue;
        }
        grid.push(line.split(''));
    }

    total += processGrid(grid);
    console.log(`part 1 total = ${total}`);
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

   
    const processGrid = (grid: string[][]) => {
        const originalRow = findHorizontalMirror(grid);
        const originalCol = findVerticalMirror(grid);

        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                grid[row][col] = grid[row][col] === '#' ? '.' : '#';

                let mirrorRow = findHorizontalMirror(grid, originalRow);
                if (mirrorRow !== -1) {
                    return (100 * mirrorRow);
                }
        
                let mirrorCol = findVerticalMirror(grid, originalCol);
                if (mirrorCol !== -1) {
                    return (mirrorCol);
                }

                grid[row][col] = grid[row][col] === '#' ? '.' : '#';
            }
        }
        return 0;
    }

    let total = 0;
    let grid: string[][] = [];
    for (const line of lines) {
        if (line.length === 0) {
            total += processGrid(grid);
            grid = []; // empty grid
            continue;
        }
        grid.push(line.split(''));
    }

    total += processGrid(grid);
    console.log(`part 1 total = ${total}`);
};



part1();
part2();
