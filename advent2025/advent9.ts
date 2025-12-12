import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const coords: number[][] = [];

    for (let line of lines) {
        const [x,y] = line.split(',', 2).map(Number);
        coords.push([x,y]);
    }

    let maxArea = 0;
    for (let i = 0; i < coords.length - 1; i++) {
        for (let j = i + 1; j < coords.length; j++) {
            const [x1, y1] = coords[i];
            const [x2, y2] = coords[j];
            // console.log(`${x1},${y1} to ${x2},${y2} == ${Math.abs(x1 - x2) + 1} * ${Math.abs(y1 - y2) + 1}`);

            
            const area = (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1);
            maxArea = Math.max(area, maxArea);
        }
    }
    console.log(`Answer 1: ${maxArea}`);

};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const minimums: Map<number, number> = new Map<number, number>();
    const maximums: Map<number, number> = new Map<number, number>();

    const redCoords: number[][] = [];

    lines.push(lines[0]);
    for (let i = 0; i < lines.length - 1; i++) {
        const [x1,y1] = lines[i].split(',', 2).map(Number);
        const [x2,y2] = lines[i + 1 ].split(',', 2).map(Number);
        redCoords.push([x1,y1]);

        if (x1 === x2) {
            for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                if (minimums.has(y)) {
                    minimums.set(y, Math.min(minimums.get(y)!, x1));
                } else {
                    minimums.set(y, x1);
                }
                if (maximums.has(y)) {
                    maximums.set(y, Math.max(maximums.get(y)!, x1));
                } else {
                    maximums.set(y, x1);
                }
            }
        }
    }

    let maxArea = 0;
    for (let i = 0; i < redCoords.length - 1; i++) {
        NEXT:
        for (let j = i + 1; j < redCoords.length; j++) {
            const [x1, y1] = redCoords[i];
            const [x2, y2] = redCoords[j];

            const [maxX, minX, maxY, minY] = [Math.max(x1, x2),  Math.min(x1, x2),  Math.max(y1, y2), Math.min(y1, y2)];
            const area = (maxX - minX + 1) * (maxY - minY + 1);

            for (let y = minY; y <= maxY; y++) {
                let polyMin = minimums.get(y)!
                let polyMax = maximums.get(y)!

                if (x1 < polyMin || x1 > polyMax || x2 < polyMin || x2 > polyMax) {
                    continue NEXT;
                }
            } 

            if (area > maxArea) {
                maxArea = Math.max(area, maxArea);
                // console.log(`New max area: ${maxArea} at ${x1},${y1} to ${x2},${y2}`);
            }
        }
    }
    console.log(`Answer 2: ${maxArea}`);
};

part1();
part2();