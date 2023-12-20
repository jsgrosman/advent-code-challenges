import { getFileContents, print2dArr } from "../Utils";



const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const MAX_STEPS = 10;
    const MIN_BEFORE_TURN = 4;

    const grid: number[][] = [];
    for (let line of lines) {
        grid.push(line.split('').map(Number));
    }
    // print2dArr(grid, '');

    type node = {
        x: number;
        y: number;
        dir: string;
        distance: number;
    }

    const dirArray: {
        'U': { dx: number; dy: number };
        'D': { dx: number; dy: number };
        'L': { dx: number; dy: number };
        'R': { dx: number; dy: number };
    } = {
        'U': {dx: 0, dy: -1},
        'D': {dx: 0, dy: 1},
        'L': {dx: -1, dy: 0},
        'R': {dx: 1, dy: 0},
    }

    const getHeat = (x: number, y: number): number => {
        if (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length) {
            return grid[y][x];
        } else {
            return -1;
        }
    }

    const Visited: Map<string, boolean> = new Map<string, boolean>();
    const ToBeVisited: Map<number, Set<node>> = new Map<number, Set<node>>();
    ToBeVisited.set( 0, new Set([{
        x: 0, y: 0, dir: 'R', distance: 0
    }, {
        x: 0, y: 0, dir: 'D', distance: 0
    }]));
    

    let currentDistance = -1;
    let currentToBeVisited: Set<node> | undefined;
    while (ToBeVisited.size > 0) {

        if (!currentToBeVisited || currentToBeVisited.size === 0) {
            ToBeVisited.delete(currentDistance);
            currentDistance++;
            currentToBeVisited = ToBeVisited.get(currentDistance);
            continue;
        } 

        let [nextNode] = currentToBeVisited;
        currentToBeVisited.delete(nextNode);

        if (nextNode.x === grid[0].length - 1 && nextNode.y === grid.length - 1) {
            console.log(`FOUND! ${nextNode.distance}`);
            return;
        }
        Visited.set(`${nextNode.x},${nextNode.y},${nextNode.dir}`, true);

        let neighbors: node[] = [];
        for (let neighborDir of Object.keys(dirArray) as Array<keyof typeof dirArray>) {
            switch (nextNode.dir + neighborDir) {
                case 'UL':
                case 'UR':
                case 'DL':
                case 'DR':
                case 'RU':
                case 'RD':
                case 'LU':
                case 'LD': {  
                        let totalHeat = 0;          
                        for (let i = 1; i <= MAX_STEPS; i++) {
                            let nextX = nextNode.x + (i * dirArray[neighborDir].dx);
                            let nextY = nextNode.y + (i * dirArray[neighborDir].dy);
                            let nextHeat = getHeat(nextX, nextY);
                            totalHeat += nextHeat;
                            if (i >= MIN_BEFORE_TURN && nextHeat > -1) {
                                neighbors.push({x: nextX, y:nextY, dir: neighborDir, distance: nextNode.distance + totalHeat});
                            }
                        }
                    }                       
                    break;  
                }               
        }            

        NEXT_NEIGHBOR:
        for (let n of neighbors) {
            if (Visited.has(`${n.x},${n.y},${n.dir}`)) {
                continue NEXT_NEIGHBOR;
            }
          
            if (ToBeVisited.has(n.distance)) {
                const tbv = ToBeVisited.get(n.distance)!;
                
                for (let v of tbv.values()) {
                    if (v.x === n.x && v.y === n.y && v.dir === n.dir && v.distance <= n.distance) {
                        continue NEXT_NEIGHBOR;
                    }
                }
                tbv.add(n);
            } else {
                ToBeVisited.set(n.distance, new Set([n]));
            }
        }
    }

};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);


};

part1();
// part2();