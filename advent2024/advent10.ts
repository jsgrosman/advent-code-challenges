import { getFileContents, point } from "../Utils";

const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const grid: number[][] = [];
    grid.push(new Array(lines[0].length).fill(-1));
    for (let line of lines) {
        grid.push([-1, ...line.split('').map(Number), -1]);
    }
    grid.push(new Array(lines[0].length).fill(-1));

    console.dir(grid);

    let doBFS = ( data: number[][], startingPoint: string, goal: number ) => {
        const V: string[] = [];
        const next: string[] = [];
        let total = 0;

        next.push(startingPoint);

        while (next.length > 0) {
            const [currentX, currentY] = next.shift()!.split(',', 2).map(Number);
            V.push(`${currentX},${currentY}`);

            const currentHeight = data[currentY][currentX];
            if (currentHeight === goal) {
                total++;
            } else {
                for (const [dx, dy] of [[0,1],[1,0],[-1,0],[0,-1]]) {
                    const nextHeight = data[dy + currentY][dx + currentX];
                    if (nextHeight === currentHeight + 1) {
                        if (!V.includes(`${dx + currentX},${dy + currentY}`) && !next.includes(`${dx + currentX},${dy + currentY}`)) {
                            next.push(`${dx + currentX},${dy + currentY}`);
                        }
                    }
                }
            }
        }

        return total;
    }

    let trailHeadCount = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 0) {
                trailHeadCount += doBFS(grid, `${x},${y}`, 9);
            }
        }
    }
    console.log(trailHeadCount);

};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const grid: number[][] = [];
    grid.push(new Array(lines[0].length).fill(-1));
    for (let line of lines) {
        grid.push([-1, ...line.split('').map( (v) => v === '.' ? -1 : +v), -1]);
    }
    grid.push(new Array(lines[0].length).fill(-1));

    console.dir(grid);

    let doDFS = ( data: number[][], startingPoint: string, goal: number ) => {
        const next: string[] = [];
        let total = 0;

        next.push(startingPoint);

        while (next.length > 0) {
            const [currentX, currentY] = next.pop()!.split(',', 2).map(Number);
            const currentHeight = data[currentY][currentX];
            if (currentHeight === goal) {
                total++;
            } else {
                for (const [dx, dy] of [[0,1],[1,0],[-1,0],[0,-1]]) {
                    const nextHeight = data[dy + currentY][dx + currentX];
                    if (nextHeight === currentHeight + 1) {
                        next.push(`${dx + currentX},${dy + currentY}`);
                    }
                }
            }
        }

        return total;
    }

    let trailHeadCount = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 0) {
                trailHeadCount += doDFS(grid, `${x},${y}`, 9);
            }
        }
    }
    console.log(trailHeadCount);
};

part1();
part2();