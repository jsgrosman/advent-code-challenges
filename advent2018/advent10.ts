import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    interface pointOfLight {
        x: number;
        y: number;
        dx: number;
        dy: number;
    }

    const allPoints: pointOfLight[] = [];
    for (let line of lines) {
        const results = Array.from(line.matchAll(/\-?\d+/g));
        allPoints.push({
            x: +results[0],
            y: +results[1],
            dx: +results[2],
            dy: +results[3],
        })
    }
    // console.dir(allPoints);

    let inRange = false;
    for (let time = 0; time < 12500; time++) {
        const minX = allPoints.reduce( (p, c) => p = Math.min(p, c.x), Number.MAX_SAFE_INTEGER);
        const maxX = allPoints.reduce( (p, c) => p = Math.max(p, c.x), Number.MIN_SAFE_INTEGER);
        const minY = allPoints.reduce( (p, c) => p = Math.min(p, c.y), Number.MAX_SAFE_INTEGER);
        const maxY = allPoints.reduce( (p, c) => p = Math.max(p, c.y), Number.MIN_SAFE_INTEGER);

        console.log(`x: ${minX} -> ${maxX}, y: ${minY} -> ${maxY}`); 

        if (maxX - minX < 100 && maxY - minY < 100) {
            inRange = true;
            console.log(`Time: ${time}`);
            for (let y = minY - 2; y < maxY + 2; y++) {
                let printedLine = '';
                for (let x = minX - 2; x < maxX + 2; x++) {
                    if (allPoints.filter( (v) => v.x === x && v.y === y).length > 0) {
                        printedLine += '#';
                    } else {
                        printedLine += '.';
                    }
                }
                console.log(printedLine);
            }
        } else {
            if (inRange) {
                break;
            }
        }
        for (let point of allPoints) {
            point.x = point.x + point.dx;
            point.y = point.y + point.dy;
        }
    }
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);


};

part1();
// part2();