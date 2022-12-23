import { getDownNeighborValues, getNeigborPoints, getNeigborValues, parseIntoGrid, point, print2dArr } from "../Utils";
    
const grid = parseIntoGrid('');

// create room for the elves to move
const increaseGridByOne = (grid: any[][]) => {
    const currentWidth = grid[0].length;

    grid.unshift(Array(currentWidth));
    grid[0].fill('.')
    grid.push(Array(currentWidth));
    grid[grid.length - 1].fill('.');

    for (let row = 0; row < grid.length; row++) {
        grid[row].unshift('.');
        grid[row].push('.');
    }
}

// we need to trim the grid in order to get the right answer for part 1
// delete any empty rows at the top and bottom, and empty columns at the right and left
const trimGrid = (grid: any[][]) => {

    for (let row = 0; row < grid.length; row++) {
        if (!grid[row].includes('#')) {
            grid.shift();
            row--;
        } else {
            break;
        }
    }

    for (let row = grid.length - 1; row > 0; row--) {
        if (!grid[row].includes('#')) {
            grid.pop();
        } else {
            break;
        }
    }

    for (let col = 0; col < grid[0].length; col++) {
        const colValues = getDownNeighborValues({x: col, y: 0}, grid);
        colValues.push(grid[0][col]);
        if (!colValues.includes('#')) {
            for (let row = 0; row < grid.length; row++) {
                grid[row].shift();
            }
            col--;
        } else {
            break;
        }
    }


    for (let col = grid[0].length - 1; col >= 0; col--) {
        const colValues = getDownNeighborValues({x: col, y: 0}, grid);
        colValues.push(grid[0][col]);
        if (!colValues.includes('#')) {
            for (let row = 0; row < grid.length; row++) {
                grid[row].pop();
            }
        } else {
            break;
        }
    }
}

// helper function
const incrementHashMap = (map: Map<string, number>, key: string) => {
    if (!map.has(key)) {
        map.set(key, 1);
    } else {
        map.set(key, map.get(key)! + 1);
    }
}

// helper function. Actually not necessary since we expand the grid to leave room
const getValue = (grid: any[][], row: number, col: number, defaultValue = 'X') => {
    if (row >= 0 && row < grid.length && col >= 0 && col < grid[row].length) {
        return grid[row][col];
    } else {
        return defaultValue;
    }

}
// keep count of how many elves want to move to the same spot
const proposedMoves: Map<string, number> = new Map<string, number>();

// keep track of who wants to go where
const whoProposed:  Map<string, string> =  new Map<string, string>();

const proposeNorth = (grid: any[][], row: number, col: number) => {
    //  N, NE, or NW
    if (getValue(grid, row-1, col-1) === '.' && getValue(grid, row-1, col) === '.' && getValue(grid, row-1, col+1) === '.') {
        incrementHashMap(proposedMoves, JSON.stringify({x: col, y:row-1}));
        if (!whoProposed.has(JSON.stringify({x: col, y:row-1}))) {
            whoProposed.set(JSON.stringify({x: col, y:row-1}), JSON.stringify({x: col, y:row}));
        }
        return true;
    } else {
        return false;
    }
}

const proposeSouth = (grid: any[][], row: number, col: number) => {
    // S, SE, or SW
    if (getValue(grid, row+1, col-1) === '.' && getValue(grid, row+1, col) === '.' && getValue(grid, row+1, col+1) === '.') {    
        incrementHashMap(proposedMoves, JSON.stringify({x: col, y:row+1}));
        if (!whoProposed.has(JSON.stringify({x: col, y:row+1}))) {
            whoProposed.set(JSON.stringify({x: col, y:row+1}), JSON.stringify({x: col, y:row}));
        }
        return true;
    } else {
        return false;
    }
}

const proposeWest = (grid: any[][], row: number, col: number) => {
    // W, NW, or SW
    if (getValue(grid, row-1, col-1) === '.' && getValue(grid, row, col-1) === '.' && getValue(grid, row+1, col-1) === '.') {
        incrementHashMap(proposedMoves, JSON.stringify({x: col-1, y:row}));
        if (!whoProposed.has(JSON.stringify({x: col-1, y:row}))) {
            whoProposed.set(JSON.stringify({x: col-1, y:row}), JSON.stringify({x: col, y:row}));
        }
        return true;
    } else {
        return false;
    }
}

const proposeEast = (grid: any[][], row: number, col: number) => {
    // E, NE, or SE
    if (getValue(grid, row-1, col+1) === '.' && getValue(grid, row, col+1) === '.' && getValue(grid, row+1, col+1) === '.') {
        incrementHashMap(proposedMoves, JSON.stringify({x:col+1, y: row}));
        if (!whoProposed.has(JSON.stringify({x: col+1, y:row}))) {
            whoProposed.set(JSON.stringify({x: col+1, y:row}), JSON.stringify({x: col, y:row}));
        }
        return true;
    } else {
        return false;
    }
}

const moveOrder: Function[] = [proposeNorth, proposeSouth, proposeWest, proposeEast];

for (let round = 1; round < 1000; round++) {
    increaseGridByOne(grid);
    proposedMoves.clear();
    whoProposed.clear();
    
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === '#') {
                // look for any surrounding elves. If there are no, the elf just stays still
                const neighborValues = getNeigborValues(row, col, grid, true);
                if (neighborValues.includes('#')) {
                    for (const proposal of moveOrder) {
                        if (proposal(grid, row, col)) {
                            break;
                        }
                    }
                } 
            }
        }
    }

    let elfMoves = 0;
    for (const [key, value] of proposedMoves.entries()) {
        if (value === 1) {
            const endingPoint = JSON.parse(key);
            const startingPoint = JSON.parse(whoProposed.get(key)!);

            grid[endingPoint.y][endingPoint.x] = '#';
            grid[startingPoint.y][startingPoint.x] = '.'
            elfMoves++;
        }
    }

    if (elfMoves === 0) {
        console.log(`Round with no moves: ${round}`);
        break;
    }

    // cycle the proposal functions for the next round
    const proposal = moveOrder.shift()!;
    moveOrder.push(proposal);

    // trim the grid, just in case we're getting too big. We'll add the appropriate edge at the beginning of the round
    trimGrid(grid);
}

let count = 0;
for (let row = 0; row < grid.length; row++) {
        count += grid[row].filter( v => v === '.').length;
}
console.log(`count ${count}`);