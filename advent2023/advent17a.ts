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
    }

    const compareCrucibles = (p1: crucible, p2: crucible) => {
        if (p2.loc.x === grid[0].length - 1 && p2.loc.y === grid.length - 1) {
            return p1.loc.equals(p2.loc);
        } else {
            return p1.loc.equals(p2.loc) && p1.prev.equals(p2.prev);
        }
    }
    const startingPoint = { loc: new Point(0, 0), prev: new Point(-1, -1), steps: 0 };
    const endingPoint = { loc: new Point(grid[0].length - 1, grid.length - 1), prev: new Point(-1, -1), steps: -1 };
    const aStar = (p1: crucible) => (Math.abs(p1.loc.x - endingPoint.loc.x) + Math.abs(p1.loc.y - endingPoint.loc.y));
    const getHeatLoss = ( p: crucible ) => grid[p.loc.y][p.loc.x];
    const getNeighbors = ( p: crucible ) => {
        const neighbors = p.loc.getManhattanNeighbors(grid[0].length - 1, grid.length - 1);
        const result: crucible[] = []

        for (let n of neighbors) {
            if (n.equals(p.prev)) {
                continue;
            }
            if (p.prev.x - p.loc.x === 0 && n.x - p.loc.x === 0) {
                if (p.steps < MAX_STEPS - 1) {
                    result.push( {loc: n, prev: p.loc, steps: p.steps + 1} );
                }
                continue;
            } else if (p.prev.y - p.loc.y === 0 && n.y - p.loc.y === 0) {
                if (p.steps < MAX_STEPS - 1) {
                    result.push( {loc: n, prev: p.loc, steps: p.steps + 1} );
                }
                continue;
            } else {
                result.push( {loc: n, prev: p.loc, steps: 0} );
                continue;
            }
        }

        // console.log(`cur: ${p.loc.toString()}, prev: ${p.prev.toString()}, steps: ${p.steps}`);
        // console.dir(result);
        return result;
    }

    const BFS = new BreadthFirstSearch();
    const dest = BFS.execute(startingPoint, endingPoint, compareCrucibles, getNeighbors, true, getHeatLoss, aStar);
    // console.dir(dest);

    const pathGrid = cloneGrid(grid);
    for (let pathStep of dest?.path as crucible[]) {
        // console.log(`${pathStep.loc.toString()}, ${pathStep.steps}`);
        pathGrid[pathStep.loc.y][pathStep.loc.x] = "*";
    }
    print2dArr(pathGrid, '');
    console.log(`Distance: ${dest?.distance}`);

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
    }

    const compareCrucibles = (p1: crucible, p2: crucible) => {
        if (p2.loc.x === grid[0].length - 1 && p2.loc.y === grid.length - 1) {
            return p1.loc.equals(p2.loc);
        } else {
            return p1.loc.equals(p2.loc) && p1.prev.equals(p2.prev);
        }
    }
    const startingPoint = { loc: new Point(0, 0), prev: new Point(0, 0), steps: 0 };
    const endingPoint = { loc: new Point(grid[0].length - 1, grid.length - 1), prev: new Point(-1, -1), steps: -1 };
    const aStar = (p1: crucible) => (Math.abs(p1.loc.x - endingPoint.loc.x) + Math.abs(p1.loc.y - endingPoint.loc.y));
    const getHeatLoss = ( p: crucible ) => grid[p.loc.y][p.loc.x];
    const getNeighbors = ( p: crucible ) => {
        const neighbors = p.loc.getManhattanNeighbors(grid[0].length - 1, grid.length - 1);
        const result: crucible[] = []

        for (let n of neighbors) {
            if (n.equals(p.prev)) {
                continue;
            }
            
            if (p.prev.x - p.loc.x === 0 && n.x - p.loc.x === 0) {

                if (n.x === grid[0].length - 1 && n.y === grid.length - 1) {
                    if (p.steps < MAX_STRAIGHT_LINE - 1 && p.steps > MAX_BEFORE_TURN - 3) {
                        result.push( {loc: n, prev: p.loc, steps: 0} );
                    }
                    continue;
                }

                if (p.steps < MAX_STRAIGHT_LINE - 1) {
                    result.push( {loc: n, prev: p.loc, steps: p.steps + 1} );
                }
                continue;
            } else if (p.prev.y - p.loc.y === 0 && n.y - p.loc.y === 0) {

                if (n.x === grid[0].length - 1 && n.y === grid.length - 1) {
                    if (p.steps < MAX_STRAIGHT_LINE - 1 && p.steps > MAX_BEFORE_TURN - 3) {
                        result.push( {loc: n, prev: p.loc, steps: 0} );
                    }
                    continue;
                }

                if (p.steps < MAX_STRAIGHT_LINE - 1) {
                    result.push( {loc: n, prev: p.loc, steps: p.steps + 1} );
                }
                continue;
            } else {
                if (p.steps > MAX_BEFORE_TURN - 2) {
                    result.push( {loc: n, prev: p.loc, steps: 0} );
                }
                continue;
            }
        }

        console.log(`cur: ${p.loc.toString()}, prev: ${p.prev.toString()}, steps: ${p.steps}`);
        console.dir(result);
        return result;
    }

    const BFS = new BreadthFirstSearch();
    const dest = BFS.execute(startingPoint, endingPoint, compareCrucibles, getNeighbors, true, getHeatLoss, aStar);
    console.dir(dest);

    const pathGrid = cloneGrid(grid);
    for (let pathStep of dest?.path as crucible[]) {
        // console.log(`${pathStep.loc.toString()}, ${pathStep.steps}`);
        pathGrid[pathStep.loc.y][pathStep.loc.x] = "*";
    }
    print2dArr(pathGrid, '');
    console.log(`Distance: ${dest?.distance}`);
};

part1();
// part2();