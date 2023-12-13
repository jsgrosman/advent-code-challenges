import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const processGrid = (grid: string[][]) => {
        NEXT_ROW:
        for (let row = 1; row < grid.length; row++) {

            for (let mirrorRow = 1; row - mirrorRow >= 0 && row + mirrorRow - 1 < grid.length; mirrorRow++) {
                if (grid[row - mirrorRow].join('') !== grid[row + mirrorRow - 1].join('')) {
                    continue NEXT_ROW;
                }
            }
            return (100 * row);
        }

        NEXT_COL:
        for (let col = 1; col < grid[0].length; col++) {

            for (let mirrorCol = 1; col - mirrorCol >= 0 && col + mirrorCol - 1 < grid[0].length; mirrorCol++) {

                let leftCol = '';
                for (let row = 0; row < grid.length; row++) {
                    leftCol += grid[row][col - mirrorCol];
                }

                let rightCol = '';
                for (let row = 0; row < grid.length; row++) {
                    rightCol += grid[row][col + mirrorCol - 1];
                }

                if (leftCol !== rightCol) {
                    continue NEXT_COL;
                }
            }
            return col;
        }

        return 0;
    }

    let total = 0;
    let grid: string[][] = [];
    for (const line of lines) {
        if (line.length === 0) {
            // process grid
            total += processGrid(grid);


            grid = []; // empty grid
            continue;
        }

        grid.push(line.split(''));
    }

    total += processGrid(grid);
    console.log(`total = ${total}`);
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

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

                let leftCol = '';
                for (let row = 0; row < grid.length; row++) {
                    leftCol += grid[row][col - mirrorCol];
                }

                let rightCol = '';
                for (let row = 0; row < grid.length; row++) {
                    rightCol += grid[row][col + mirrorCol - 1];
                }

                if (leftCol !== rightCol) {
                    continue NEXT_COL;
                }
            }

            if (invalidCol !== col) {
                return col;
            } 
        }

        return  -1;

    }

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
            // process grid
            total += processGrid(grid);
            grid = []; // empty grid
            continue;
        }

        grid.push(line.split(''));
    }

    total += processGrid(grid);
    console.log(`total = ${total}`);
};

const bothParts = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

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

                let leftCol = '';
                for (let row = 0; row < grid.length; row++) {
                    leftCol += grid[row][col - mirrorCol];
                }

                let rightCol = '';
                for (let row = 0; row < grid.length; row++) {
                    rightCol += grid[row][col + mirrorCol - 1];
                }

                if (leftCol !== rightCol) {
                    continue NEXT_COL;
                }
            }

            if (invalidCol !== col) {
                return col;
            } 
        }
        return  -1;
    }

    const processGrid = (grid: string[][]) => {
        const originalRow = findHorizontalMirror(grid);
        const originalCol = findVerticalMirror(grid);

        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                grid[row][col] = grid[row][col] === '#' ? '.' : '#';

                let mirrorRow = findHorizontalMirror(grid, originalRow);
                if (mirrorRow !== -1) {
                    return [originalRow !== -1 ? (100 * originalRow) : originalCol, (100 * mirrorRow)];
                }
        
                let mirrorCol = findVerticalMirror(grid, originalCol);
                if (mirrorCol !== -1) {
                    return [originalRow !== -1 ? (100 * originalRow) : originalCol, (mirrorCol)];
                }

                grid[row][col] = grid[row][col] === '#' ? '.' : '#';
            }
        }
        return [0, 0];
    }

    let part1Total = 0;
    let part2Total = 0;
    let grid: string[][] = [];
    for (const line of lines) {
        if (line.length === 0) {
            // process grid
            const [part1Value, part2Value] = processGrid(grid);
            part1Total += part1Value;
            part2Total += part2Value;

            grid = []; // empty grid
            continue;
        }

        grid.push(line.split(''));
    }

    const [part1Value, part2Value] = processGrid(grid);
    part1Total += part1Value;
    part2Total += part2Value;

    console.log(`part 1 total = ${part1Total}`);
    console.log(`part 2 total = ${part2Total}`);
};

//  part1();
//  part2();
bothParts();