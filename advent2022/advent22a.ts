import { getFileContents, point } from "../Utils";
    
const input = getFileContents().split(/\n/g);

const SIZE_OF_FACE = 50;

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

type direction = 'Up' | 'Right' | 'Down' | 'Left';
type face = 'One' | 'Two' | 'Three' | 'Four' | 'Five' | 'Six';


const getCubeFace = (location: point): face | undefined => {
    const cubeHeight = Math.floor(location.y / SIZE_OF_FACE);
    const cubeWidth = Math.floor(location.x / SIZE_OF_FACE);

    // console.log(`cube height: ${cubeHeight} cube width: ${cubeWidth}`);

    if (cubeHeight === 0 && cubeWidth === 1) {
        return 'One';
    } else if (cubeHeight === 0 && cubeWidth === 2) {
        return 'Two';
    } else if (cubeHeight === 1 && cubeWidth === 1) {
        return 'Three';
    } else if (cubeHeight === 2 && cubeWidth === 0) {
        return 'Four';
    } else if (cubeHeight === 2 && cubeWidth === 1) {
        return 'Five';
    } else if (cubeHeight === 3 && cubeWidth === 0) {
        return 'Six';
    } 
}

const topOfOne = 0;
const topOfTwo = 0;
const topOfThree = SIZE_OF_FACE;
const topOfFour = SIZE_OF_FACE * 2;
const topOfFive = SIZE_OF_FACE * 2;
const topOfSix = SIZE_OF_FACE * 3;

const bottomOfOne = SIZE_OF_FACE - 1;
const bottomOfTwo =  SIZE_OF_FACE - 1;
const bottomOfThree = (SIZE_OF_FACE * 2) - 1;
const bottomOfFour = (SIZE_OF_FACE * 3) - 1;
const bottomOfFive = (SIZE_OF_FACE * 3) - 1;
const bottomOfSix = (SIZE_OF_FACE * 4)- 1;

const leftOfOne = SIZE_OF_FACE;
const leftOfTwo = SIZE_OF_FACE * 2;
const leftOfThree = SIZE_OF_FACE;
const leftOfFour = 0;
const leftOfFive = SIZE_OF_FACE;
const leftOfSix = 0;

const rightOfOne = (SIZE_OF_FACE * 2) - 1;
const rightOfTwo = (SIZE_OF_FACE * 3) - 1;
const rightOfThree = (SIZE_OF_FACE * 2) - 1;
const rightOfFour = SIZE_OF_FACE - 1;
const rightOfFive = (SIZE_OF_FACE * 2) - 1;
const rightOfSix = SIZE_OF_FACE - 1;


const isOnBoundary = (location: point, dir: direction) => {
    if (dir === 'Left' && location.x % SIZE_OF_FACE === 0) {
        console.log(`Left boundary at ${JSON.stringify(location)}`);
        return true;
    } else if (dir === 'Right' && location.x % SIZE_OF_FACE === SIZE_OF_FACE - 1) {
        console.log(`Right boundary at ${JSON.stringify(location)}`);
        return true;
    } else if (dir === 'Up' &&  location.y % SIZE_OF_FACE === 0) {
        console.log(`Up boundary at ${JSON.stringify(location)}`);
        return true;
    } else if (dir === 'Down' && location.y % SIZE_OF_FACE === SIZE_OF_FACE - 1) {
        console.log(`Down boundary at ${JSON.stringify(location)}`);
        return true;
    }
    return false;
}


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

const getNewCoord = (offset: number, cubeOffset: number, reverse: boolean ) =>
{
    if (!reverse) {
        return (SIZE_OF_FACE * cubeOffset) + offset;
    } else {
        return (SIZE_OF_FACE * cubeOffset) + (SIZE_OF_FACE - offset - 1);
    }
}

const moveUp = (location: point): [point, direction] => {
    let col = location.x;
    let row = location.y
    let dir: direction = 'Up';

    if (isOnBoundary(location, dir)) {
        const xOffset = location.x % SIZE_OF_FACE;
        const yOffset = location.y % SIZE_OF_FACE;
        switch (getCubeFace(location)) {
            case 'One': {
                dir = 'Right'; // Six
                return [{x: leftOfSix, y: getNewCoord(xOffset, 3, false)}, dir];
            }
            case 'Two': {
                dir = 'Up'; // Six
                return [{x: getNewCoord(xOffset, 0, false), y: bottomOfSix}, dir];
            }
            case 'Four': {
                dir = 'Right'; // Three
                return [{x: leftOfThree, y: getNewCoord(xOffset, 1, false)}, dir];
            }
            default: {
                return [{x: col, y: row - 1}, dir];
            }      
        }        
    } else {
        return [{x: col, y: row - 1}, dir];
    }
}

const moveRight = (location: point): [point, direction] => {
    let col = location.x;
    let row = location.y
    let dir: direction = 'Right';

    if (isOnBoundary(location, dir)) {
        const xOffset = location.x % SIZE_OF_FACE;
        const yOffset = location.y % SIZE_OF_FACE;
        console.log(`x offset: ${xOffset}, y offset: ${yOffset}`);
        switch (getCubeFace(location)) {
            case 'Two': {
                dir = 'Left'; // Five
                return [{x: rightOfFive, y: getNewCoord(yOffset, 2, true)}, dir];
            }
            case 'Three': {
                dir = 'Up'; // Two
                return [{x: getNewCoord(yOffset, 2, false), y: bottomOfTwo}, dir];
            } 
            case 'Five': {
                dir = 'Left'; // Two
                return [{x: rightOfTwo, y: getNewCoord(yOffset, 0, true)}, dir];
            }
            case 'Six': {
                dir = 'Up'; // Five
                return [{x: getNewCoord(yOffset, 1, false), y: bottomOfFive}, dir];
            }  
            default: {
                return [{x: col + 1, y: row}, dir];
            }      
        }        
    } else {
        return [{x: col + 1, y: row}, dir];
    }
}

const moveDown = (location: point): [point, direction] => {
    let col = location.x;
    let row = location.y

    let dir: direction = 'Down';

    if (isOnBoundary(location, dir)) {
        const xOffset = location.x % SIZE_OF_FACE;
        const yOffset = location.y % SIZE_OF_FACE;
        switch (getCubeFace(location)) {
            case 'Two': {
                dir = 'Left'; // Three
                return [{x: rightOfThree, y:getNewCoord(xOffset, 1, false)}, dir];
            }
            case 'Five': {
                dir = 'Left'; // Siz
                return [{x: rightOfSix, y: getNewCoord(xOffset, 3, false)}, dir];
            }
            case 'Six': {
                dir = 'Down'; // Two
                return [{x: getNewCoord(xOffset, 2, false), y: topOfTwo}, dir];
            }    
            default: {
                return [{x: col, y: row + 1}, dir];
            }     
        }        
    } else {
        return [{x: col, y: row + 1}, dir];
    }
}

const moveLeft = (location: point): [point, direction] => {
    let col = location.x;
    let row = location.y
    let dir: direction = 'Left';

    if (isOnBoundary(location, dir)) {
        const xOffset = location.x % SIZE_OF_FACE;
        const yOffset = location.y % SIZE_OF_FACE;
        switch (getCubeFace(location)) {
            case 'One': {
                dir = 'Right'; // Four
                return [{x: leftOfFour, y:getNewCoord(yOffset, 2, true)}, dir];
            }
            case 'Three': {
                dir = 'Down'; // Four
                return [{x: getNewCoord(yOffset, 0, false), y: topOfFour}, dir];
            }
            case 'Four': {
                dir = 'Right'; // One
                return [{x: leftOfOne, y: getNewCoord(yOffset, 0, true)}, dir];
            }
            case 'Six': {
                dir = 'Down'; // One
                return [{x: getNewCoord(yOffset, 1, false), y: topOfOne}, dir];
            }   
            default: {
                return [{x: col - 1, y: row}, dir];
            }    
        }        
    } else {
        return [{x: col - 1, y: row}, dir];
    }
}

const move = (location: point, dir: direction, dist: number): [point, direction] => {
    // console.log(`Starting move at ${JSON.stringify(location)} going ${dir}`);

    let newLocation = Object.assign({}, location);
    let newDir: direction = dir;
    for (let d = 0; d < dist; d++) {
        switch (dir) {
            case 'Up': 
                [newLocation, newDir] = moveUp(location);
                break;
            case 'Right': 
                [newLocation, newDir] = moveRight(location);
                break;
            case 'Down': 
                [newLocation, newDir] = moveDown(location);
                break;
            case 'Left':
                [newLocation, newDir] = moveLeft(location);
                break;
        }
        console.log(`Finished 1 step at ${JSON.stringify(newLocation)} going ${newDir} in ${getCubeFace(newLocation)}`);
        if (!wallBlocks.get(newLocation.y)!.includes(newLocation.x)) {
            location = Object.assign({}, newLocation);
            dir = newDir;
        } else {
            console.log(`WALL at ${JSON.stringify(newLocation)}, stay ${JSON.stringify(location)} `);
            break;
        }
        
    }

    return [location, dir];
}

let currentSpace = {x: lineStarts.get(0)!, y: 0};
let currentDirection: direction = 'Right';


const arrayOfMazeDirections = mazeDirections.replace(/(L|R)/g, "|$1|").split('|');
console.dir(arrayOfMazeDirections);

console.log(JSON.stringify(currentSpace));

let distance = 0;
let count = 0;
for (const mazeDir of arrayOfMazeDirections) {

    if (mazeDir.match(/\d+/)) {
        distance = Number(mazeDir);
        console.log(`Go ${distance} in ${currentDirection}`);
        [currentSpace, currentDirection] = move(currentSpace, currentDirection, distance);
        // console.log(`${JSON.stringify(currentSpace)} facing ${currentDirection}`);
    } else {
        currentDirection = turn(currentDirection, mazeDir);
        // console.log(`Turn ${mazeDir} to ${currentDirection}`);
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