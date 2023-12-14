import { getFileContents, print2dArr } from "../Utils";
import Point from "../lib/Point";
import { execute, getVisitedSet } from "../lib/BreadthFirstSearch";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const maze: string[][] = [];
    for (const line of lines) {
        maze.push(line.split(''));
    }

    print2dArr(maze);

    let startingPoint: Point|null = null;
    END_FIND_START:
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 'S') {
                startingPoint = new Point(col, row);
            }
        }
    }

    const comparePoints = (p1: Point, p2: Point) => {
        return p1.equals(p2);
    }

    const getOpenPipes = (p: Point) => {
        switch (maze[p.y][p.x]) {
            case '|': {
                return [new Point(p.x, p.y - 1), new Point(p.x, p.y + 1)];
            }
            case '-': {
                return [new Point(p.x - 1, p.y), new Point(p.x + 1, p.y)];
            }
            case 'L': {
                return [new Point(p.x + 1, p.y), new Point(p.x, p.y - 1)];
            }
            case 'J': {
                return [new Point(p.x - 1, p.y), new Point(p.x, p.y - 1)];
            }
            case '7': {
                return [new Point(p.x - 1, p.y), new Point(p.x, p.y + 1)];
            }
            case 'F': {
                return [new Point(p.x + 1, p.y), new Point(p.x, p.y + 1)];
            }
            case 'S': {
                const result: Point[] = [];
                if (maze[p.y - 1][p.x] === '|' || maze[p.y - 1][p.x] === '7' || maze[p.y - 1][p.x] === 'F') {
                    result.push(new Point(p.x, p.y - 1));
                }
                if (maze[p.y + 1][p.x] === '|' || maze[p.y + 1][p.x] === 'L' || maze[p.y + 1][p.x] === 'J') {
                    result.push(new Point(p.x, p.y + 1));
                }
                if (maze[p.y][p.x - 1] === '-' || maze[p.y][p.x - 1] === 'F' || maze[p.y][p.x - 1] === 'L') {
                    result.push(new Point(p.x - 1, p.y));
                }
                if (maze[p.y][p.x + 1] === '-' || maze[p.y][p.x + 1] === 'J' || maze[p.y][p.x + 1] === '7') {
                    result.push(new Point(p.x + 1, p.y));
                }
                return result; 
            }
            default: {
                return [];
            }
        }
    }

    execute(startingPoint, new Point(-1, -1), comparePoints, getOpenPipes);
    // console.log(getVisitedSet());

    const visitedSet = getVisitedSet();
    let maxDistance = 0;
    for (let n of visitedSet) {
        maxDistance = Math.max(n.distance, maxDistance);
    }
    console.log(`Max Distance: ${maxDistance}`);

};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const maze: string[][] = [];
    for (const line of lines) {
        maze.push(line.split(''));
    }

    // print2dArr(maze);

    let startingPoint: Point|null = null;
    END_FIND_START:
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 'S') {
                startingPoint = new Point(col, row);
            }
        }
    }

    const comparePoints = (p1: Point, p2: Point) => {
        return p1.equals(p2);
    }

    const getOpenPipes = (p: Point) => {
        switch (maze[p.y][p.x]) {
            case '|': {
                return [new Point(p.x, p.y - 1), new Point(p.x, p.y + 1)];
            }
            case '-': {
                return [new Point(p.x - 1, p.y), new Point(p.x + 1, p.y)];
            }
            case 'L': {
                return [new Point(p.x + 1, p.y), new Point(p.x, p.y - 1)];
            }
            case 'J': {
                return [new Point(p.x - 1, p.y), new Point(p.x, p.y - 1)];
            }
            case '7': {
                return [new Point(p.x - 1, p.y), new Point(p.x, p.y + 1)];
            }
            case 'F': {
                return [new Point(p.x + 1, p.y), new Point(p.x, p.y + 1)];
            }
            case 'S': {
                const result: Point[] = [];
                if (maze[p.y - 1][p.x] === '|' || maze[p.y - 1][p.x] === '7' || maze[p.y - 1][p.x] === 'F') {
                    result.push(new Point(p.x, p.y - 1));
                }
                if (maze[p.y + 1][p.x] === '|' || maze[p.y + 1][p.x] === 'L' || maze[p.y + 1][p.x] === 'J') {
                    result.push(new Point(p.x, p.y + 1));
                }
                if (maze[p.y][p.x - 1] === '-' || maze[p.y][p.x - 1] === 'F' || maze[p.y][p.x - 1] === 'L') {
                    result.push(new Point(p.x - 1, p.y));
                }
                if (maze[p.y][p.x + 1] === '-' || maze[p.y][p.x + 1] === 'J' || maze[p.y][p.x + 1] === '7') {
                    result.push(new Point(p.x + 1, p.y));
                }
                return result; 
            }
            default: {
                return [];
            }
        }
    }

    execute(startingPoint, new Point(-1, -1), comparePoints, getOpenPipes);
    // console.log(getVisitedSet());

    // const visitedSet = getVisitedSet();
    // let maxDistance = 0;
    // for (let n of visitedSet) {
    //     maxDistance = Math.max(n.distance, maxDistance);
    // }
    // console.log(`Max Distance: ${maxDistance}`);
  
    const visitedSet = getVisitedSet();
    const newMaze: string[][] = [];
    for (let row = 0; row < maze.length; row++) {
        newMaze[row] = [];
        
        NEXT_SPACE:
        for (let col = 0; col < maze[row].length; col++) {
            for (const node of visitedSet) { 
                const p = node.data as Point;
                if (p.x === col && p.y === row) {
                    newMaze[row][col] = ' ';
                    continue NEXT_SPACE;
                } 
            }
            newMaze[row][col] = '.';
        }
    }


    const getOpenSpaces = (p: Point) => {
        const neighbors = p.getManhattanNeighbors(newMaze[0].length - 1, newMaze.length - 1);
        return neighbors.filter( p => newMaze[p.y][p.x] === '.');
    }

    const closedPoints: Map<string, boolean> = new Map<string, boolean>();

    for (let row = 0; row < newMaze.length; row++) {
        NEXT_OPEN_SPACE:
        for (let col = 0; col < newMaze[row].length; col++) {
            getVisitedSet().clear();
            if (newMaze[row][col] === '.') {
                execute(new Point(col, row), new Point(-1,-1), comparePoints, getOpenSpaces);
                const visited = getVisitedSet();
                for (let n of visited) {
                    const visitedPoint = n.data as Point;
                    if (visitedPoint.x === 0 || visitedPoint.x === newMaze[0].length - 1 || visitedPoint.y === 0 || visitedPoint.y === newMaze.length - 1) {
                        // escaped
                        for (let n2 of visited) {
                            const openPoint = n2.data as Point;
                            newMaze[openPoint.y][openPoint.x] = 'O';
                        }

                        continue NEXT_OPEN_SPACE;
                    }
                }
                for (let n of visited) {
                    const visitedPoint = n.data as Point;
                    closedPoints.set(visitedPoint.toString(), true);
                }
            }
            
        }
    }
    console.log(`All closed spaces: ${closedPoints.size}`);

    for (let c of closedPoints.keys()) {
        const [x,y] = c.split(',').map(Number);
        newMaze[y][x] = 'I';
    }
    print2dArr(newMaze);


    

};

const part2a = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const maze: string[][] = [];
    for (const line of lines) {
        maze.push(line.split(''));
    }

    // print2dArr(maze);

    let startingPoint: Point|null = null;
    END_FIND_START:
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 'S') {
                startingPoint = new Point(col, row);
            }
        }
    }

    const comparePoints = (p1: Point, p2: Point) => {
        return p1.equals(p2);
    }

    const getOpenPipes = (p: Point) => {
        switch (maze[p.y][p.x]) {
            case '|': {
                return [new Point(p.x, p.y - 1), new Point(p.x, p.y + 1)];
            }
            case '-': {
                return [new Point(p.x - 1, p.y), new Point(p.x + 1, p.y)];
            }
            case 'L': {
                return [new Point(p.x + 1, p.y), new Point(p.x, p.y - 1)];
            }
            case 'J': {
                return [new Point(p.x - 1, p.y), new Point(p.x, p.y - 1)];
            }
            case '7': {
                return [new Point(p.x - 1, p.y), new Point(p.x, p.y + 1)];
            }
            case 'F': {
                return [new Point(p.x + 1, p.y), new Point(p.x, p.y + 1)];
            }
            case 'S': {
                const result: Point[] = [];
                if (p.y > 0 && (maze[p.y - 1][p.x] === '|' || maze[p.y - 1][p.x] === '7' || maze[p.y - 1][p.x] === 'F')) {
                    result.push(new Point(p.x, p.y - 1));
                }
                if (p.y < maze.length - 1 && (maze[p.y + 1][p.x] === '|' || maze[p.y + 1][p.x] === 'L' || maze[p.y + 1][p.x] === 'J')) {
                    result.push(new Point(p.x, p.y + 1));
                }
                if (p.x > 0 && (maze[p.y][p.x - 1] === '-' || maze[p.y][p.x - 1] === 'F' || maze[p.y][p.x - 1] === 'L')) {
                    result.push(new Point(p.x - 1, p.y));
                }
                if (p.x < maze[p.y].length - 1 && (maze[p.y][p.x + 1] === '-' || maze[p.y][p.x + 1] === 'J' || maze[p.y][p.x + 1] === '7')) {
                    result.push(new Point(p.x + 1, p.y));
                }
                return result;
            }
            default: {
                return [];
            }
        }
    }

    execute(startingPoint, new Point(-1, -1), comparePoints, getOpenPipes);
    // console.log(getVisitedSet());

    // const visitedSet = getVisitedSet();
    // let maxDistance = 0;
    // for (let n of visitedSet) {
    //     maxDistance = Math.max(n.distance, maxDistance);
    // }
    // console.log(`Max Distance: ${maxDistance}`);
  
    const visitedSet = getVisitedSet();
    const newMaze: string[][] = [];
    for (let row = 0; row < maze.length; row++) {
        newMaze[row] = [];
        
        NEXT_SPACE:
        for (let col = 0; col < maze[row].length; col++) {
            for (const node of visitedSet) { 
                const p = node.data as Point;
                if (p.x === col && p.y === row) {
                    newMaze[row][col] = maze[row][col];
                    continue NEXT_SPACE;
                } 
            }
            newMaze[row][col] = '.';
        }
    }



    let insideCount = 0;

    for (let row = 0; row < newMaze.length; row++) {  
        // newMaze[row].push('.');
        for (let col = 0; col < newMaze[row].length; col++) {
            if (newMaze[row][col] === '.') {
                let crossings = 0;
                let prevCorner = '.';
                for (let c2 = col + 1; c2 < newMaze[row].length; c2++) {
                    const sq1 = newMaze[row][c2 - 1];
                    const sq2 = newMaze[row][c2];

                    // if (sq1 === '.' && sq2 !== '.') {
                    //     crossings++;
                    //     continue;
                    // }

                    switch (sq2) {
                        case '.':
                        case '-':    
                            break;
                        case '|':
                            crossings++;
                            break;
                        case 'F':
                        case 'L':           
                            prevCorner = sq2;
                            break;
                        case 'J':
                            if (prevCorner === 'F') {
                                crossings++;
                                prevCorner = '.';
                            } else {
                                prevCorner = '.';
                            }   
                            break;
                        case '7':    
                            if (prevCorner === 'L') {
                                crossings++;
                                prevCorner = '.';
                            } else {
                                prevCorner = '.';
                            }   
                            break; 
                        case 'S':
                            prevCorner = 'L';
                            break;    
                    }

                    // if (c2 === newMaze[row].length - 1) {
                    //     if (newMaze[row][c2] !== '.') {
                    //         crossings++;
                    //     }
                    // }
                }
                
                    

                if (crossings % 2 === 1) {
                    newMaze[row][col] = 'I';
                    insideCount++;
                } else {
                    newMaze[row][col] = 'O';
                }
            }
        }

    }

    for (let row = 0; row < newMaze.length; row++) {  
        newMaze[row] = newMaze[row].map( v => {
            switch (v) {
                case 'L':
                    return '╚';
                case 'J':
                    return '╝';
                case 'F':
                    return '╔';
                case '7':
                    return '╗';
                case '|':
                    return '║';
                case '-':
                    return '═';
                case 'O':
                    return '.';    
                case 'I':
                    return '*';      
                default:
                    return v;                    
            }

        });
    }


   print2dArr(newMaze, '');

    console.log(`Inside count: ${insideCount}`);
        

    


    

};

// part1();
part2a();