import { getFileContents, point } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const grid: string[][] = [];
    grid.push(new Array(lines[0].length).fill('XX'));
    for (let line of lines) {
        grid.push(['XX', ...line.split(''), 'XX']);
    }
    grid.push(new Array(lines[0].length).fill('XX'));

    const Visited: string[] = [];
    const searchForPlot = (startingPoint: string, crop: string) => {
        const next: string[] = [];
        next.push(startingPoint);

        let area = 0;
        let perimeter = 0;
        while (next.length > 0) {
            const [currentX, currentY] = next.shift()!.split(',', 2).map(Number);
            Visited.push(`${currentX},${currentY}`);
            area++;

            for (const [dx, dy] of [[0,1],[1,0],[-1,0],[0,-1]]) {
                const neighborCrop = grid[dy + currentY][dx + currentX];
                if (neighborCrop === crop) {
                    if (!Visited.includes(`${dx + currentX},${dy + currentY}`) && !next.includes(`${dx + currentX},${dy + currentY}`)) {
                        next.push(`${dx + currentX},${dy + currentY}`);
                    }
                } else {
                    perimeter++
                }
            }
        }
        return area * perimeter;
    }

    let total = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const crop = grid[y][x];
            if (crop !== 'XX' && !Visited.includes(`${x},${y}`)) {
                total += searchForPlot(`${x},${y}`, crop);
            }

        }
    }
    console.log(`total = ${total}`);
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const grid: string[][] = [];
    grid.push(new Array(lines[0].length).fill('XX'));
    for (let line of lines) {
        grid.push(['XX', ...line.split(''), 'XX']);
    }
    grid.push(new Array(lines[0].length).fill('XX'));

    const countSides = (direction: string, neighborsByDirection:Map<string, string[]>) => {

        const neighbors = neighborsByDirection.get(direction)!.toSorted( (a, b) => {
            
            const [ax, ay] = a.split(',', 2).map(Number);
            const [bx, by] = b.split(',', 2).map(Number);
            if (direction === 'U' || direction === 'D') {
                return ay - by || ax - bx;
            } else {
                return ax - bx || ay - by;
            }
        });
        if (direction === 'U' || direction === 'D') {
            return neighbors.reduce( (p, c, i, a) => {
                const [x,y] = c.split(',', 2).map(Number);
                if (i < a.length - 1) {
                    const [x1, y1] = a[i+1].split(',', 2).map(Number);
                    if (y !== y1 || x1 !== x + 1) {
                        return p + 1;
                    }
                }
                return p;
            }, 1);
        } else {
            return neighbors.reduce( (p, c, i, a) => {
                const [x,y] = c.split(',', 2).map(Number);
                if (i < a.length - 1) {
                    const [x1, y1] = a[i+1].split(',', 2).map(Number);
                    if (x !== x1 || y1 !== y + 1) {
                        return p + 1;
                    }
                }
                return p;
            }, 1);
        }
        
    }

    const Visited: string[] = [];
    const searchForPlot = (startingPoint: string, crop: string) => {
        const neighborsByDirection: Map<string, string[]> = new Map<string, string[]>();
        neighborsByDirection.set('U', []);
        neighborsByDirection.set('D', []);
        neighborsByDirection.set('L', []);
        neighborsByDirection.set('R', []);

        const next: string[] = [];
        next.push(startingPoint);

        let area = 0;
        let sides = 0;
        while (next.length > 0) {
            const [currentX, currentY] = next.shift()!.split(',', 2).map(Number);
            Visited.push(`${currentX},${currentY}`);
            area++;

            for (const [dx, dy] of [[0,1],[1,0],[-1,0],[0,-1]]) {
                const neighborCrop = grid[dy + currentY][dx + currentX];
                if (neighborCrop === crop) {
                    if (!Visited.includes(`${dx + currentX},${dy + currentY}`) && !next.includes(`${dx + currentX},${dy + currentY}`)) {
                        next.push(`${dx + currentX},${dy + currentY}`);
                    }
                } else {
                    if (dy === -1) {
                        neighborsByDirection.get('U')?.push(`${dx + currentX},${dy + currentY}`);
                    } else if (dy === 1) {
                        neighborsByDirection.get('D')?.push(`${dx + currentX},${dy + currentY}`);
                    } else if (dx === -1) {
                        neighborsByDirection.get('L')?.push(`${dx + currentX},${dy + currentY}`);
                    } else if (dx === 1) {
                        neighborsByDirection.get('R')?.push(`${dx + currentX},${dy + currentY}`);
                    } 
                }
            }
        }

        sides += countSides('U', neighborsByDirection);
        sides += countSides('D', neighborsByDirection);
        sides += countSides('L', neighborsByDirection);
        sides += countSides('R', neighborsByDirection);
        return area * sides;
    }

    let total = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const crop = grid[y][x];
            if (crop !== 'XX' && !Visited.includes(`${x},${y}`)) {
                total += searchForPlot(`${x},${y}`, crop);
            }
        }
    }
    console.log(`total = ${total}`);
};

part1();
part2();