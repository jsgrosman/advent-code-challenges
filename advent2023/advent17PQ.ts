import { getFileContents, print2dArr } from "../Utils";
import BreadthFirstSearch from "../lib/BreadthFirstSearch";
import Point from "../lib/Point";
import { cloneGrid } from "../lib/Grid";

const part1 = () => {
    const MAX_STEPS = 3;

    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const grid: number[][] = [];
    for (let line of lines) {
        grid.push(line.split('').map(Number));
    }

    type crucible = {
        loc: Point;
        prev: Point;
        steps: number;
        dir: 'hor' | 'ver';
    }

    const compareCrucibles = (p1: crucible, p2: crucible) => {
        if (p2.loc.x === grid[0].length - 1 && p2.loc.y === grid.length - 1) {
            return p1.loc.equals(p2.loc);
        } else {
            return p1.loc.equals(p2.loc) && p1.dir === p2.dir && p1.steps === p2.steps;
        }
    }
    const startingPoint = { loc: new Point(0, 0), prev: new Point(0, 0), steps: 0, dir: 'hor' };
    const endingPoint = { loc: new Point(grid[0].length - 1, grid.length - 1), prev: new Point(-1, -1), steps: -1, dir: 'ver' };
    const aStar = (p1: crucible) => (Math.abs(p1.loc.x - endingPoint.loc.x) + Math.abs(p1.loc.y - endingPoint.loc.y));
    const getHeatLoss = (p: crucible) => grid[p.loc.y][p.loc.x];
    const getNeighbors = (p: crucible) => {
        const neighbors = p.loc.getManhattanNeighbors(grid[0].length - 1, grid.length - 1);
        const result: crucible[] = []

        for (let n of neighbors) {
            if (n.equals(p.prev)) {
                continue;
            }

            if (p.dir === 'hor' && n.y === p.loc.y) {
                if (p.steps < MAX_STEPS - 1) {
                    result.push({ loc: n, prev: p.loc, steps: p.steps + 1, dir: p.dir });
                }
            }
            if (p.dir === 'ver' && n.x === p.loc.x) {
                if (p.steps < MAX_STEPS - 1) {
                    result.push({ loc: n, prev: p.loc, steps: p.steps + 1, dir: p.dir });
                }
            }

            if (p.dir === 'hor' && n.y != p.loc.y) {
                result.push({ loc: n, prev: p.loc, steps: 0, dir: 'ver' });
            }

            if (p.dir === 'ver' && n.x != p.loc.x) {
                result.push({ loc: n, prev: p.loc, steps: 0, dir: 'hor' });
            }
        }

        // console.log(`count of results: ${result.length}`);
        return result;
    }

    const BFS = new BreadthFirstSearch();
    const dest = BFS.execute(startingPoint, endingPoint, compareCrucibles, getNeighbors, true, getHeatLoss);
    // console.dir(dest);

    const pathGrid = cloneGrid(grid);
    for (let pathStep of dest?.path as crucible[]) {
        pathGrid[pathStep.loc.y][pathStep.loc.x] = pathStep.dir === 'hor' ? '═' : '║';
    }
    print2dArr(pathGrid, '');
    if (dest) {
        console.log(`Distance: ${dest.distance}`);
    } else {
        console.log(`Failed to find a path`);
    }

};


const part2 = () => {
    const MAX_STRAIGHT_LINE = 10;
    const MAX_BEFORE_TURN = 4;

    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const grid: number[][] = [];
    for (let line of lines) {
        grid.push(line.split('').map(Number));
    }

    type crucible = {
        loc: Point;
        prev: Point;
        steps: number;
        dir: 'hor' | 'ver'
    }

    const compareCrucibles = (p1: crucible, p2: crucible) => {
        if (p2.loc.x === grid[0].length - 1 && p2.loc.y === grid.length - 1) {
            return p1.loc.equals(p2.loc);
        } else {
            return p1.loc.equals(p2.loc) && p1.dir === p2.dir && p1.steps === p2.steps;
        }
    }
    const startingPoint = { loc: new Point(0, 0), prev: new Point(0, 0), steps: 0, dir: 'hor' };
    const endingPoint = { loc: new Point(grid[0].length - 1, grid.length - 1), prev: new Point(-1, -1), steps: -1, dir: 'hor' };
    const aStar = (p1: crucible) => (Math.abs(p1.loc.x - endingPoint.loc.x) + Math.abs(p1.loc.y - endingPoint.loc.y));
    const getHeatLoss = (p: crucible) => grid[p.loc.y][p.loc.x];
    const getNeighbors = (p: crucible) => {
        const neighbors = p.loc.getManhattanNeighbors(grid[0].length - 1, grid.length - 1);
        const result: crucible[] = []

        for (let n of neighbors) {
            if (n.equals(p.prev)) {
                continue;
            }

            if (n.x === grid[0].length - 1 && n.y === grid.length - 1) {
                if ( n.y === p.prev.y || n.x === p.prev.x) {
                    if (p.steps < MAX_STRAIGHT_LINE - 1 && p.steps > MAX_BEFORE_TURN - 3) {
                        result.push({ loc: n, prev: p.loc, steps: 0, dir: p.dir });
                    }
                }
                continue;
            }
            if (p.dir === 'hor' && n.y === p.loc.y) {
                if (p.steps < MAX_STRAIGHT_LINE - 1) {
                    result.push({ loc: n, prev: p.loc, steps: p.steps + 1, dir: p.dir });
                }
            }
            if (p.dir === 'ver' && n.x === p.loc.x) {
                if (p.steps < MAX_STRAIGHT_LINE - 1) {
                    result.push({ loc: n, prev: p.loc, steps: p.steps + 1, dir: p.dir });
                }
            }

            if (p.dir === 'hor' && n.y !== p.loc.y) {
                if (p.steps > MAX_BEFORE_TURN - 2) {
                    result.push({ loc: n, prev: p.loc, steps: 0, dir: 'ver' });
                }
            }

            if (p.dir === 'ver' && n.x !== p.loc.x) {
                if (p.steps > MAX_BEFORE_TURN - 2) {
                    result.push({ loc: n, prev: p.loc, steps: 0, dir: 'hor' });
                }
            }
        }
        return result;
    }

    const BFS = new BreadthFirstSearch();
    const dest = BFS.execute(startingPoint, endingPoint, compareCrucibles, getNeighbors, true, getHeatLoss);

    const pathGrid = cloneGrid(grid);
    for (let pathStep of dest?.path as crucible[]) {
        pathGrid[pathStep.loc.y][pathStep.loc.x] = pathStep.dir === 'hor' ? '═' : '║';
    }
    print2dArr(pathGrid, '');
    console.log(`Distance: ${dest?.distance}`);
};

// part1();
part2();