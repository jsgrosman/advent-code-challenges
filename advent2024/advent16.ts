import { getFileContents, point } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const TURN_COST = 1000;

    const walls: string[] = [];
    let start: point = {x:0, y: 0};
    let end: point = {x:0, y: 0};

    for (let row = 0; row < lines.length; row++) {
        for (let col = 0; col < lines[row].length; col++) { 
            if (lines[row][col] === '#') {
                walls.push(`${col},${row}`);
            } else if (lines[row][col] === 'E') {
                end = { x: row, y: col};
            } else if (lines[row][col] === 'S') {
                start = { x: row, y: col};
            }
        }
    }

    interface node {
        x: number;
        y: number;
        dir: string;
        cost: number;
        paths: string[];
    }

    const V: node[] = [];
    const NEXT: node[] = [];

    NEXT.push( {x: start.x, y: start.y, dir: 'E', cost: 0, paths: [`${start.x},${start.y}`]});

    const dirToDxDy: { [key: string]: [number, number] }  = {
        'E': [1,0],
        'W': [-1,0],
        'S': [0,1],
        'N': [0,-1]
    };

    const turns: { [key: string]: [string, string,string] }  = {
        'E': ['E','N','S'],
        'W': ['W','N','S'],
        'S': ['S','E','W'],
        'N': ['N','E','W']
    }

    const print = (tiles: string[]) => {
        for (let row = 0; row < lines.length; row++) {
            for (let col = 0; col < lines[row].length; col++) { 
                const key = `${col},${row}`;
                if (walls.includes(key)) {
                    process.stdout.write("#");
                } else if (tiles.includes(`${key}`)) {
                    process.stdout.write("O");
                } else {
                    process.stdout.write(".");
                }
            }
            process.stdout.write("\n");
        }
    }

    const manDist = (x1: number, y1: number, x2: number, y2: number): number => {
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
      }

    const allPaths: Set<string> = new Set<string>();

    const MINIMUM = 99448;
    while (NEXT.length > 0) {
        NEXT.sort( (a,b) => a.cost - b.cost || manDist(a.x, a.y, end.x, end.y) - manDist(b.x, b.y, end.x, end.y));

        const currentNode = NEXT.shift()!;
        if (currentNode.x === end.x && currentNode.y === end.y) {
            // console.log(`Found! Cost: ${currentNode.cost}`);
            // print(currentNode.paths);
            for (let p of currentNode.paths) {
                allPaths.add(p);
            }
        } else {
            V.push(currentNode);
        }

        
        for (let nextDir of turns[currentNode.dir]) {
            const [dx, dy] = dirToDxDy[nextDir]!;
            const nextX = currentNode.x + dx;
            const nextY = currentNode.y + dy;
            if (!walls.includes(`${nextX},${nextY}`)) {
                if (V.filter( (v) => v.x === nextX && v.y === nextY && v.dir === nextDir ).length == 0) {
                    // const n = NEXT.find( (v) => v.x === nextX && v.y === nextY && v.dir === nextDir );
                    if (currentNode.cost + 1 + (currentNode.dir != nextDir ? TURN_COST : 0) <= MINIMUM) {
                        NEXT.push( {x: nextX, y:nextY, dir: nextDir, cost: currentNode.cost + 1 + (currentNode.dir != nextDir ? TURN_COST : 0), paths: [...currentNode.paths, `${nextX},${nextY}`]});
                    }
                }
            }
        }
    }
    console.log(`size = ${allPaths.size}`)

};

part1();
// part2();