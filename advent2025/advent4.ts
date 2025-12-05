import { getFileContents, getNeigborValues, print2dArr } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const grid: string[][] = [];
    for (let line of lines) {
        grid.push(line.split(''));
    }
    // print2dArr(grid);

    let total = 0;
    for(let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === '@') {
                const neighbors = getNeigborValues(row, col, grid, true);
                if (neighbors.filter( v => v == '@').length < 4) {
                    total++;
                }
            }
        }
    }

    console.log(`Answer 1: ${total}`);

};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const grid: string[][] = [];
    for (let line of lines) {        
        grid.push(line.split(''));
    }

    // print2dArr(grid);
    const neighborDxDy = [ [-1, -1], [-1, 0], [-1, 1],
                           [0, -1],           [0, 1],
                           [1, -1],  [1, 0],  [1, 1]];

    let total = 0;
    let removed = 1000;
    while (removed > 0) {
        removed = 0;
        for(let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                if (grid[row][col] === '@') {
                    const numRolls = neighborDxDy.map( ([dy, dx]):number => grid[row + dy]?.[col + dx] === '@' ? 1 : 0).reduce( (p, c) => p + c);
                    if (numRolls < 4) {
                        removed++;
                        grid[row][col] = '.'
                    }
                }
            }
        }
        total += removed;
    }

    console.log(`Answer 2: ${total}`);


};

part1();
part2();