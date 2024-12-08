import { getFileContents } from "../Utils";



const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const grid: Map<string, string> = new Map<string, string>();
    const antinodes: Set<string> = new Set<string>();

    for (let y = 0; y < lines.length; y++) {
       for (let x = 0; x < lines[y].length; x++) {
        if (lines[y].charAt(x) !== '.') {
            grid.set(`${x},${y}`, lines[y].charAt(x));
        }
       }
    }
   
    for (let [loc, antenna] of grid.entries()) {
        const [locX, locY]  = loc.split(',', 2).map(Number);
        const otherAntennas = Array.from(grid.entries()).filter( (v) => v[1] === antenna && v[0] !== `${locX},${locY}`);

        for ( let [otherLoc, _] of otherAntennas) {
            const [otherLocX, otherLocY]  = otherLoc.split(',', 2).map(Number);

            const xDist = locX - otherLocX;
            const yDist = locY - otherLocY;

            const antiX = locX + xDist;
            const antiY = locY + yDist;
            if (antiX >= 0 && antiX < lines[0].length && antiY >= 0 && antiY < lines.length) {
                antinodes.add(`${antiX},${antiY}`);
            }
        }

    }
    console.log(`part 1: ${antinodes.size}`);
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const grid: Map<string, string> = new Map<string, string>();
    const antinodes: Set<string> = new Set<string>();

    for (let y = 0; y < lines.length; y++) {
       for (let x = 0; x < lines[y].length; x++) {
        if (lines[y].charAt(x) !== '.') {
            grid.set(`${x},${y}`, lines[y].charAt(x));
        }
       }
    }
    for (let [loc, antenna] of grid.entries()) {
        const [locX, locY]  = loc.split(',', 2).map(Number);

        // the antinodes for part 2 include all of the antennas
        antinodes.add(`${locX},${locY}`);
        const otherAntennas = Array.from(grid.entries()).filter( (v) => v[1] === antenna && v[0] !== `${locX},${locY}`);

        for ( let [otherLoc, _] of otherAntennas) {
            const [otherLocX, otherLocY]  = otherLoc.split(',', 2).map(Number);
            const xDist = locX - otherLocX;
            const yDist = locY - otherLocY;
            
            let antiX = locX + xDist;
            let antiY = locY + yDist;

            // keep adding antinodes until we go off the grid
            while (antiX >= 0 && antiX < lines[0].length && antiY >= 0 && antiY < lines.length) {
                antinodes.add(`${antiX},${antiY}`);
                antiX += xDist;
                antiY += yDist;
            }
        }
    }
    console.log(`part 2: ${antinodes.size}`);
};

part1();
part2();