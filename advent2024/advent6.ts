import { getFileContents, point } from "../Utils";

type Direction = '^' | 'v' | '>' | '<'
const DIRECTION_CHANGE:{ [key in Direction]: Direction }  = {
    '^': '>',
    '>': 'v',
    'v': '<',
    '<': '^',
}

const positions: Set<string> = new Set<string>();
const grid: string[][] = [];
let startingPos: point | null =  null;
let startingDir: Direction | null = null;

const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);
    
    for (let y = 0; y < lines.length; y++) {
        const row: string[] = [];
        for (let x = 0; x < lines.length; x++) {
            if (['^', 'v', '>', '<'].includes(lines[y].charAt(x))) {
                startingPos = { x, y };
                startingDir = lines[y].charAt(x) as Direction;
                positions.add(`${x},${y}`);
            }
            row.push(lines[y].charAt(x));
        }
        grid.push(row);
    }
    grid[startingPos!.y][startingPos!.x] = '.';
    let currentPosition = startingPos!;
    let currentDirection = startingDir!;


    END_WHILE:
    while (true) {

        let nextX = 0, nextY = 0;
        switch (currentDirection) {
            case '^': 
                nextX = currentPosition!.x;
                nextY = currentPosition!.y - 1;
                break;
            case 'v': 
                nextX = currentPosition!.x;
                nextY = currentPosition!.y + 1;
                break;  
            case '<': 
                nextX = currentPosition!.x - 1;
                nextY = currentPosition!.y ;
                break;
            case '>': 
                nextX = currentPosition!.x + 1;
                nextY = currentPosition!.y ;
                break; 
        }
        
        switch (grid[nextY]?.[nextX]) {
            case undefined:
                break END_WHILE;
            case '.': 
                currentPosition = { x:nextX, y:nextY };
                positions.add(`${nextX},${nextY}`);
                break;
            case '#':
                currentDirection = DIRECTION_CHANGE[currentDirection];
                break;

        }
    }
    console.log(positions.size);
};

// requires part 1
const part2 = () => {

    let isLoop = (gridWithObstacle: string[][], startingPos: point, startingDir: Direction ) => {
        
        const positions: Set<string> = new Set<string>();
        positions.add(`${startingPos.x},${startingPos.y},${startingDir}`);

        let currentPosition = startingPos;
        let currentDirection = startingDir;

        while (true) {

            let nextX = 0, nextY = 0;
            switch (currentDirection) {
                case '^': 
                    nextX = currentPosition!.x;
                    nextY = currentPosition!.y - 1;
                    break;
                case 'v': 
                    nextX = currentPosition!.x;
                    nextY = currentPosition!.y + 1;
                    break;  
                case '<': 
                    nextX = currentPosition!.x - 1;
                    nextY = currentPosition!.y ;
                    break;
                case '>': 
                    nextX = currentPosition!.x + 1;
                    nextY = currentPosition!.y ;
                    break; 
            }
            
            switch (gridWithObstacle[nextY]?.[nextX]) {
                case undefined:
                    return false;
                case '.':
                    currentPosition = { x:nextX, y:nextY };
                    if (positions.has(`${nextX},${nextY},${currentDirection}`)) {
                        return true;
                    } else {
                        positions.add(`${nextX},${nextY},${currentDirection}`);
                    }
                    break;
                case '#':
                    currentDirection = DIRECTION_CHANGE[currentDirection];
                    break;
            }
        }
    }

    let loopTotal = 0;
    for (let pos of positions) {
        const newPoint = {
            x: +pos.split(',')![0],
            y: +pos.split(',')![1]
        };
        if (!['#'].includes(grid[newPoint.y][newPoint.x]) && !(newPoint.x === startingPos!.x && newPoint.y === startingPos!.y)) {
            grid[newPoint.y][newPoint.x] = '#';
            if (isLoop(grid, startingPos!, startingDir!)) {
                loopTotal++;
            }
            grid[newPoint.y][newPoint.x] = '.';

        }
    }
   
    
    console.log(loopTotal);


};

part1();
part2();