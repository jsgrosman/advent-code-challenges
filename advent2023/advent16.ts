import { getFileContents, print2dArr } from "../Utils";
import BreadFirstSearch from "../lib/BreadthFirstSearch";
import Point from "../lib/Point";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const grid: string[][] = [];
    for (let line of lines) {
        grid.push(line.split(''));
    }

    const destinations: Map<string, boolean> = new Map<string, boolean>();
    destinations.set(new Point(0, 0).toString(), true);

    type Laser = {
        loc: Point;
        dir: 'N' | 'S' | 'E' | 'W';
    }

    const getNeighbors = (l: Laser) => {
        const charToDirection: { [key: string]: { x: number; y: number; dir: 'N' | 'S' | 'E' | 'W', newDir: 'N' | 'S' | 'E' | 'W' }[] } = {
            '.': [{ x: 0, y: -1, dir: 'N', newDir: 'N' }, { x: -1, y: 0, dir: 'W', newDir: 'W' }, { x: 0, y: 1, dir: 'S', newDir: 'S' }, { x: 1, y: 0, dir: 'E', newDir: 'E' }],
            '/': [{ x: 0, y: -1, dir: 'E', newDir: 'N' }, { x: -1, y: 0, dir: 'S', newDir: 'W' }, { x: 0, y: 1, dir: 'W', newDir: 'S' }, { x: 1, y: 0, dir: 'N', newDir: 'E' }],
            '\\': [{ x: 0, y: 1, dir: 'E', newDir: 'S' }, { x: 1, y: 0, dir: 'S', newDir: 'E' }, { x: 0, y: -1, dir: 'W', newDir: 'N' }, { x: -1, y: 0, dir: 'N', newDir: 'W' }],
            '-': [{ x: -1, y: 0, dir: 'W', newDir: 'W' }, { x: 1, y: 0, dir: 'E', newDir: 'E' }, { x: 1, y: 0, dir: 'S', newDir: 'E' }, { x: -1, y: 0, dir: 'S', newDir: 'W' }, { x: 1, y: 0, dir: 'N', newDir: 'E' }, { x: -1, y: 0, dir: 'N', newDir: 'W' }],
            '|': [{ x: 0, y: -1, dir: 'N', newDir: 'N' }, { x: 0, y: 1, dir: 'S', newDir: 'S' }, { x: 0, y: -1, dir: 'E', newDir: 'N' }, { x: 0, y: 1, dir: 'E', newDir: 'S' }, { x: 0, y: -1, dir: 'W', newDir: 'N' }, { x: 0, y: 1, dir: 'W', newDir: 'S' }],
        };

        const location = grid[l.loc.y][l.loc.x];
        let results: Laser[] = [];

        charToDirection[location].forEach(({ x, y, dir, newDir }) => {
            if (l.dir === dir) {
                results.push({ loc: new Point(l.loc.x + x, l.loc.y + y), dir: newDir });
            }
        });
        results = results.filter((v) => v.loc.x >= 0 && v.loc.x < grid[0].length && v.loc.y >= 0 && v.loc.y < grid.length);

        for (let r of results) {
            destinations.set(r.loc.toString(), true);
        }

        return results;
    }

    const compareLasers = (p1: Laser, p2: Laser) => p1.loc.equals(p2.loc) && p1.dir === p2.dir;
    const startingPoint = { loc: new Point(0, 0), dir: 'E' }

    const BFS = new BreadFirstSearch();
    BFS.execute(startingPoint, null, compareLasers, getNeighbors, false);
    console.log(`count = ${destinations.size}`);
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const grid: string[][] = [];
    for (let line of lines) {
        grid.push(line.split(''));
    }

    type Laser = {
        loc: Point;
        dir: 'N' | 'S' | 'E' | 'W';
    }

    const getNeighbors = (destinations: Set<string>) => (l: Laser) => {
        const charToDirection: { [key: string]: { x: number; y: number; dir: 'N' | 'S' | 'E' | 'W', newDir: 'N' | 'S' | 'E' | 'W' }[] } = {
            '.': [{ x: 0, y: -1, dir: 'N', newDir: 'N' }, { x: -1, y: 0, dir: 'W', newDir: 'W' }, { x: 0, y: 1, dir: 'S', newDir: 'S' }, { x: 1, y: 0, dir: 'E', newDir: 'E' }],
            '/': [{ x: 0, y: -1, dir: 'E', newDir: 'N' }, { x: -1, y: 0, dir: 'S', newDir: 'W' }, { x: 0, y: 1, dir: 'W', newDir: 'S' }, { x: 1, y: 0, dir: 'N', newDir: 'E' }],
            '\\': [{ x: 0, y: 1, dir: 'E', newDir: 'S' }, { x: 1, y: 0, dir: 'S', newDir: 'E' }, { x: 0, y: -1, dir: 'W', newDir: 'N' }, { x: -1, y: 0, dir: 'N', newDir: 'W' }],
            '-': [{ x: -1, y: 0, dir: 'W', newDir: 'W' }, { x: 1, y: 0, dir: 'E', newDir: 'E' }, { x: 1, y: 0, dir: 'S', newDir: 'E' }, { x: -1, y: 0, dir: 'S', newDir: 'W' }, { x: 1, y: 0, dir: 'N', newDir: 'E' }, { x: -1, y: 0, dir: 'N', newDir: 'W' }],
            '|': [{ x: 0, y: -1, dir: 'N', newDir: 'N' }, { x: 0, y: 1, dir: 'S', newDir: 'S' }, { x: 0, y: -1, dir: 'E', newDir: 'N' }, { x: 0, y: 1, dir: 'E', newDir: 'S' }, { x: 0, y: -1, dir: 'W', newDir: 'N' }, { x: 0, y: 1, dir: 'W', newDir: 'S' }],
        };

        const location = grid[l.loc.y][l.loc.x];
        let results: Laser[] = [];

        charToDirection[location].forEach(({ x, y, dir, newDir }) => {
            if (l.dir === dir) {
                results.push({ loc: new Point(l.loc.x + x, l.loc.y + y), dir: newDir });
            }
        });
        results = results.filter((v) => v.loc.x >= 0 && v.loc.x < grid[0].length && v.loc.y >= 0 && v.loc.y < grid.length);

        for (let r of results) {
            destinations.add(r.loc.toString());
        }

        return results;
    }

    const compareLasers = (p1: Laser, p2: Laser) => p1.loc.equals(p2.loc) && p1.dir === p2.dir;

    let maxEnergized = 0;

    const processDirection = (col: number, row: number, dir: 'S' | 'N' | 'E' | 'W') => {
        const destinations: Set<string> = new Set<string>();
        const startingPoint = {
            loc: new Point(col, row),
            dir: dir,
        };
        destinations.add(startingPoint.loc.toString())
    
        const BFS = new BreadFirstSearch();
        BFS.execute(startingPoint, null, compareLasers, getNeighbors(destinations), false);
        maxEnergized = Math.max(maxEnergized, destinations.size);
    };

    for (let col = 0; col < grid[0].length; col++) {
        processDirection(col, 0, 'S');
        processDirection(col, grid.length - 1, 'N');
    }
    
    for (let row = 0; row < grid.length; row++) {
        processDirection(0, row, 'E');
        processDirection(grid[0].length - 1, row, 'W');
    }
    
    console.log(`Max: ${maxEnergized}`);
};

part1();
part2();

