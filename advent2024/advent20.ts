import { getFileContents, point} from "../Utils";


const sortHashmap = (h: Map<any, any>) => {
    return new Map([...h.entries()].sort((a, b) => a[0] - b[0]));
}
const manDist = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    
    const walls: string[] = [];
    let start:point = {x:0, y: 0};
    let end:point = {x:0, y: 0};

    for (let row = 0; row < lines.length; row++) {
        for (let col = 0; col < lines[row].length; col++) {
            if (lines[row][col] === '#') {
                walls.push(`${col},${row}`);
            } else if (lines[row][col] === 'S') {
                start = {x:col, y:row};
            } else if (lines[row][col] === 'E') {
                end = {x:col, y:row};
            }
        }
    }

    interface node {
        x: number;
        y: number;
        dist: number;
        path?: string[];
    }

    const calculateDistancesFromEnd = (endX: number, endY: number, walls: string[]) => {

        const distancesFromEnd: Map<string,number> = new Map<string,number>();
        const VISITED: Set<string> = new Set<string>();
        const NEXT: node[] = []
        NEXT.push({x: endX, y: endY, dist: 0});
        while (NEXT.length > 0) {
            const nextNode = NEXT.shift()!;
            VISITED.add(`${nextNode.x},${nextNode.y}`);
            distancesFromEnd.set(`${nextNode.x},${nextNode.y}`, nextNode.dist);
            for (let [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
                const newX = nextNode.x + dx; const newY = nextNode.y + dy;
                if (!walls.includes(`${newX},${newY}`) && !VISITED.has(`${newX},${newY}`)) {
                    const n = NEXT.find( (v) => v.x === newX && v.y === newY );
                    if (n) {
                        n.dist = nextNode.dist + 1;
                    } else {
                        NEXT.push( {x: newX, y:newY, dist: nextNode.dist + 1});
                    }
                }
            }
        }

        return distancesFromEnd;
    }
    
    const distancesFromEnd = calculateDistancesFromEnd(end.x, end.y, walls);
    const shortcutsByTime: Map<number,number> = new Map<number, number>();

    const countShortcuts = (start: point, end: point, walls: string[]) => {
        const VISITED: Set<string> = new Set<string>();
        const NEXT: node[] = []
        NEXT.push({x: start.x, y: start.y, dist: 0, path:[`${start.x},${start.y}`]});
        while (NEXT.length > 0) {
            const nextNode = NEXT.shift()!;
            if (nextNode.x === end.x && nextNode.y === end.y) {
                return nextNode.path;
            }
            VISITED.add(`${nextNode.x},${nextNode.y}`);        
            for (let [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
                const newX = nextNode.x + dx; const newY = nextNode.y + dy;
                if (!walls.includes(`${newX},${newY}`) && !VISITED.has(`${newX},${newY}`)) {
                    const n = NEXT.find( (v) => v.x === newX && v.y === newY );
                    if (n) {
                        n.dist = nextNode.dist + 1;
                        n.path = [...nextNode.path!, `${newX},${newY}`];
                    } else {
                        NEXT.push( {x: newX, y:newY, dist: nextNode.dist + 1, path: [...nextNode.path!, `${newX},${newY}`]});
                    }
                }
            }
        }
        return null;
    }

    const path = countShortcuts(start, end, walls);

    let numShortcuts = 0;
    if (path) {

        for (let loc of path) {
            const [x, y] = loc.split(',').map(Number);
            const currentDistance = distancesFromEnd.get(`${x},${y}`)!
            for (let [newLoc,newDistance] of distancesFromEnd.entries()) {
                const [newX, newY] = newLoc.split(',').map(Number);
                const cheatDistance = currentDistance - newDistance - 2;
                if (cheatDistance > 1 && manDist(x, y, newX, newY) === 2) {
                    if (shortcutsByTime.has(cheatDistance)) {
                        shortcutsByTime.set(cheatDistance, shortcutsByTime.get(cheatDistance)! + 1);
                    } else {
                        shortcutsByTime.set(cheatDistance, 1);
                    }
                    if (cheatDistance >= 100) {
                        numShortcuts++;
                    }
                }

            }
        }


         
    }

    console.dir(sortHashmap(shortcutsByTime));
    console.log(`count: ${numShortcuts}`);
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    
    const walls: string[] = [];
    let start:point = {x:0, y: 0};
    let end:point = {x:0, y: 0};

    for (let row = 0; row < lines.length; row++) {
        for (let col = 0; col < lines[row].length; col++) {
            if (lines[row][col] === '#') {
                walls.push(`${col},${row}`);
            } else if (lines[row][col] === 'S') {
                start = {x:col, y:row};
            } else if (lines[row][col] === 'E') {
                end = {x:col, y:row};
            }
        }
    }

    interface node {
        x: number;
        y: number;
        dist: number;
        path: string[];
    }

    const calculateDistancesFromEnd = (endX: number, endY: number, walls: string[]) => {

        const distancesFromEnd: Map<string,number> = new Map<string,number>();
        const VISITED: Set<string> = new Set<string>();
        const NEXT: node[] = []
        NEXT.push({x: endX, y: endY, dist: 0, path:[]});
        while (NEXT.length > 0) {

            const nextNode = NEXT.pop()!;
            VISITED.add(`${nextNode.x},${nextNode.y}`);
            distancesFromEnd.set(`${nextNode.x},${nextNode.y}`, nextNode.dist);
        for (let [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
                const newX = nextNode.x + dx; const newY = nextNode.y + dy;
                if (!walls.includes(`${newX},${newY}`) && !VISITED.has(`${newX},${newY}`)) {
                    const n = NEXT.find( (v) => v.x === newX && v.y === newY );
                    if (n) {
                        n.dist = nextNode.dist + 1;
                    } else {
                        NEXT.push( {x: newX, y:newY, dist: nextNode.dist + 1, path:[]});
                    }
                }
            }
        }

        return distancesFromEnd;
    }
    
    const distancesFromEnd = calculateDistancesFromEnd(end.x, end.y, walls);
    const shortcutsByTime: Map<number,number> = new Map<number, number>();

    const countShortcuts = (start: point, end: point, walls: string[], calcDist: Map<string,number>) => {
        const VISITED: Set<string> = new Set<string>();
        const NEXT: node[] = []
        NEXT.push({x: start.x, y: start.y, dist: 0, path:[`${start.x},${start.y}`]});
        while (NEXT.length > 0) {
            const nextNode = NEXT.shift()!;

            if (nextNode.x === end.x && nextNode.y === end.y) {
                return nextNode.path;
            }

            VISITED.add(`${nextNode.x},${nextNode.y}`);        
            for (let [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
                const newX = nextNode.x + dx; const newY = nextNode.y + dy;
                if (!walls.includes(`${newX},${newY}`) && !VISITED.has(`${newX},${newY}`)) {
                    const n = NEXT.find( (v) => v.x === newX && v.y === newY );
                    if (n) {
                        n.dist = nextNode.dist + 1;
                        n.path = [...nextNode.path, `${newX},${newY}`];
                    } else {
                        NEXT.push( {x: newX, y:newY, dist: nextNode.dist + 1, path: [...nextNode.path, `${newX},${newY}`]});
                    }
                }
            }
        }
        return null;
    }

    const allShortcuts: Set<string> = new Set<string>();
    const path = countShortcuts(start, end, walls, distancesFromEnd);

    let numShortcuts = 0;
    if (path) {

        for (let loc of path) {
            const [x, y] = loc.split(',').map(Number);
            const currentDistance = distancesFromEnd.get(`${x},${y}`)!
            for (let [newLoc,newDistance] of distancesFromEnd.entries()) {
                const [newX, newY] = newLoc.split(',').map(Number);
                const manDistance = manDist(x, y, newX, newY);
                const cheatDistance = currentDistance - newDistance - manDistance;
                if (cheatDistance > 1 && manDist(x, y, newX, newY) <= 20) {
                    
                    if (cheatDistance >= 30) {
                        if (shortcutsByTime.has(cheatDistance)) {
                            shortcutsByTime.set(cheatDistance, shortcutsByTime.get(cheatDistance)! + 1);
                        } else {
                            shortcutsByTime.set(cheatDistance, 1);
                        }
                        allShortcuts.add(`${x},${y} | ${newX},${newY}`);
                    }
                }

            }
        }


         
    }

    console.dir(sortHashmap(shortcutsByTime));
    console.log(`count: ${allShortcuts.size}`);


};

// part1();
part2();