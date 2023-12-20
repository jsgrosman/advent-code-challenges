import { getFileContents, print2dArr } from "../Utils";
import Point from "../lib/Point"


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const lagoon: Set<string> = new Set<string>();
    let currentPoint = new Point(0, 0);
    lagoon.add(currentPoint.toString());

    let minX = currentPoint.x;
    let maxX = currentPoint.x;
    let minY = currentPoint.y;
    let maxY = currentPoint.y;

    const minAndMax: Map<number, number[]> = new Map<number, number[]>();

    for (let line of lines) {
        const [dir, dist] = line.split(/\s+/, 2);
        let dx = 0;
        let dy = 0;
        switch (dir) {
 
            case 'R': {
                dx = 1;
                break;
            }
            case 'L': {
                dx = -1;
                break;
            }
            case 'D': {
                dy = 1;
                break;
            }
            case 'U': {
                dy = -1;
                break;
            }
        }

        for (let i = 0; i < Number(dist); i++) {
            currentPoint = new Point(currentPoint.x + dx, currentPoint.y + dy);
            lagoon.add(currentPoint.toString());

            minX = Math.min(minX, currentPoint.x);
            maxX = Math.max(maxX, currentPoint.x);
            minY = Math.min(minY, currentPoint.y);
            maxY = Math.max(maxY, currentPoint.y);


            if (minAndMax.has(currentPoint.y)) {
                const [lineMin, lineMax] = minAndMax.get(currentPoint.y)!;
                minAndMax.set(currentPoint.y, [Math.min(currentPoint.x, lineMin), Math.max(currentPoint.x, lineMax)]);
            } else {
                minAndMax.set(currentPoint.y, [currentPoint.x, currentPoint.x]);
            }
        }
    }

    console.log(`X: ${minX} -> ${maxX}, Y: ${minY} -> ${maxY}`);
    let interiorCount = 0;
    for (let row = minY; row <= maxY; row++) {
        const [lineMin, lineMax] = minAndMax.get(row)!;
        for (let col = lineMin; col <= lineMax; col++) {

            if (!lagoon.has(new Point(col, row).toString())) {
                let crossings = 0;
                let prevCorner = '.';
                for (let ray = col + 1; ray <= maxX; ray++) {
                    if (!lagoon.has(new Point(ray, row).toString())) {
                        continue;
                    }
                    // -
                    if (lagoon.has(new Point(ray - 1, row).toString()) && lagoon.has(new Point(ray + 1, row).toString())) {
                        continue;
                    }
                    // |
                    if (lagoon.has(new Point(ray, row - 1).toString()) && lagoon.has(new Point(ray, row + 1).toString())) {
                        crossings++;
                        continue;
                    }
                    
                    // F
                    if (lagoon.has(new Point(ray, row + 1).toString()) && lagoon.has(new Point(ray + 1, row).toString())) {
                        prevCorner = 'F'
                        continue;
                    }

                    // L
                    if (lagoon.has(new Point(ray, row - 1).toString()) && lagoon.has(new Point(ray + 1, row).toString())) {
                        prevCorner = 'L'
                        continue;
                    }

                    // J
                    if (lagoon.has(new Point(ray, row - 1).toString()) && lagoon.has(new Point(ray - 1, row).toString())) {
                        if (prevCorner === 'F') {
                            crossings++;
                        }
                        prevCorner = '.';
                        continue;
                    }

                    // 7
                    if (lagoon.has(new Point(ray, row + 1).toString()) && lagoon.has(new Point(ray - 1, row).toString())) {
                        if (prevCorner === 'L') {
                            crossings++;
                        }
                        prevCorner = '.';
                        continue;
                    }
                }

                
                if (crossings % 2 === 1) {
                    interiorCount++;
                }
            }

        }
    }
    console.log(`interior = ${interiorCount}`);
    console.log(`trench = ${lagoon.size}`);
    console.log(lagoon.size + interiorCount);
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    let currentPoint = new Point(0, 0);

    let minX = currentPoint.x;
    let maxX = currentPoint.x;
    let minY = currentPoint.y;
    let maxY = currentPoint.y;

    type minMax = {
        min: number;
        max: number;
    }

    const minAndMaxRows: Map<number, minMax[]> = new Map<number, minMax[]>();
    const minAndMaxCols: Map<number, minMax[]> = new Map<number, minMax[]>();

    const isInLagoon = (row: number, col: number) => {
        if (minAndMaxRows.has(row)) {
            const minMaxArray = minAndMaxRows.get(row)!;
            for (let minMax of minMaxArray) {
                if (col >= minMax.min && col <= minMax.max) {
                    return true;
                }
            }
        }

        if (minAndMaxCols.has(col)) {
            const minMaxArray = minAndMaxCols.get(col)!;
            for (let minMax of minMaxArray) {
                if (row >= minMax.min && row <= minMax.max) {
                    return true;
                }
            }
        }

        return false;

    }

    let lagoonSize = 0;
    for (let line of lines) {
        // const hex = line.match(/[0-9a-f]{6}/)![0];
        // const dist = parseInt(hex.substring(0, 5), 16);
        // const dir = hex.charAt(5);

        const [dir, distString] = line.split(/\s+/, 2);
        const dist = Number(distString);
        switch (dir) {
            case '0':
            case 'R': { // R
                if (minAndMaxRows.has(currentPoint.y)) {
                    minAndMaxRows.get(currentPoint.y)!.push( {min: currentPoint.x, max: currentPoint.x + dist});
                } else {
                    minAndMaxRows.set(currentPoint.y, [{min: currentPoint.x, max: currentPoint.x + dist}]);
                }
                currentPoint = new Point(currentPoint.x + dist, currentPoint.y);
                maxX = Math.max(maxX, currentPoint.x);
                break;
            }
            case '2': 
            case 'L': { // L
                if (minAndMaxRows.has(currentPoint.y)) {
                    minAndMaxRows.get(currentPoint.y)!.push( {min: currentPoint.x - dist, max: currentPoint.x});
                } else {
                    minAndMaxRows.set(currentPoint.y, [{min: currentPoint.x - dist, max: currentPoint.x}]);
                }
                currentPoint = new Point(currentPoint.x - dist, currentPoint.y);
                minX = Math.min(minX, currentPoint.x);
                break;
            }
            case '1':
            case 'D': { // D
                if (minAndMaxCols.has(currentPoint.x)) {
                    minAndMaxCols.get(currentPoint.x)!.push( {min: currentPoint.y, max: currentPoint.y + dist});
                } else {
                    minAndMaxCols.set(currentPoint.x, [{min: currentPoint.y, max: currentPoint.y + dist}]);
                }
                currentPoint = new Point(currentPoint.x, currentPoint.y + dist);
                maxY = Math.max(maxY, currentPoint.y);
                break;
            }
            case '3':
            case 'U': { // U
                if (minAndMaxCols.has(currentPoint.x)) {
                    minAndMaxCols.get(currentPoint.x)!.push( {min: currentPoint.y - dist, max: currentPoint.y});
                } else {
                    minAndMaxCols.set(currentPoint.x, [{min: currentPoint.y - dist, max: currentPoint.y}]);
                }
                currentPoint = new Point(currentPoint.x, currentPoint.y - dist);
                minY = Math.min(minY, currentPoint.y);
                break;
            }
        }

        lagoonSize += dist;
    }
    console.dir(minAndMaxRows);

    console.dir(minAndMaxCols);



    console.log(`X: ${minX} -> ${maxX}, Y: ${minY} -> ${maxY}`);
    let interiorCount = 0;
    let minOfRow = Number.MAX_SAFE_INTEGER;
    let maxOfRow = Number.MIN_SAFE_INTEGER

    let currentInteriorCount = 0;
    for (let row = minY; row <= maxY; row++) {

        const minMax = minAndMaxRows.get(row);


        if (minMax) {
            for (let mm of minMax) {
                minOfRow = Math.min(minOfRow, mm.min);
                maxOfRow = Math.max(maxOfRow, mm.max);
            } 
            currentInteriorCount = 0;
        } else {
            if (currentInteriorCount != 0) {
                interiorCount += currentInteriorCount;
                continue;
            }
        }

        for (let col = minOfRow; col <= maxOfRow; col++) {

            if (!isInLagoon(row, col)) {
                let crossings = 0;
                let prevCorner = '.';
                for (let ray = col + 1; ray <= maxOfRow; ray++) {
                    if (!isInLagoon(row, ray)) {
                        continue;
                    }
                    // -
                    if (isInLagoon(row, ray - 1) && isInLagoon(row, ray + 1)) {
                        continue;
                    }
                    // |
                    if (isInLagoon(row - 1, ray) && isInLagoon(row + 1, ray)) {
                        crossings++;
                        continue;
                    }
                    
                    // F
                    if (isInLagoon(row + 1, ray) && isInLagoon(row, ray  +1)) {
                        prevCorner = 'F'
                        continue;
                    }

                    // L
                    if (isInLagoon(row - 1, ray) && isInLagoon(row, ray + 1)) {
                        prevCorner = 'L'
                        continue;
                    }

                    // J
                    if (isInLagoon(row - 1, ray) && isInLagoon(row, ray - 1)) {
                        if (prevCorner === 'F') {
                            crossings++;
                        }
                        prevCorner = '.';
                        continue;
                    }

                    // 7
                    if (isInLagoon(row + 1, ray) && isInLagoon(row, ray - 1)) {
                        if (prevCorner === 'L') {
                            crossings++;
                        }
                        prevCorner = '.';
                        continue;
                    }
                }

                
                if (crossings % 2 === 1) {
                    currentInteriorCount++;
                }
            }
        }
        interiorCount += currentInteriorCount;
    }
    console.log(`interior = ${interiorCount}`);
    console.log(`trench = ${lagoonSize}`);
    console.log(lagoonSize + interiorCount);
};


const part2b = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const vertices: Point[] = []; // Store vertices of the polygon
    
    let currentPoint = new Point(0, 0);

    let lagoonSize = 0;
    let leftShoelace = 0;
    let rightShoelace = 0;
    for (let line of lines) {
        const hex = line.match(/[0-9a-f]{6}/)![0];
        const dist = parseInt(hex.substring(0, 5), 16);
        const dir = hex.charAt(5);
        let nextPoint = new Point(0, 0);

        // const [dir, distString] = line.split(/\s+/, 2);
        // const dist = Number(distString);
        switch (dir) {
            case '0':
            case 'R': { // R
                nextPoint = new Point(currentPoint.x + dist, currentPoint.y);
                break;
            }
            case '2': 
            case 'L': { // L
                nextPoint = new Point(currentPoint.x - dist, currentPoint.y);
                break;
            }
            case '1':
            case 'D': { // D
                nextPoint = new Point(currentPoint.x, currentPoint.y + dist);
                break;
            }
            case '3':
            case 'U': { // U
                nextPoint = new Point(currentPoint.x, currentPoint.y - dist);
                break;
            }
        }

        // shoelace
        // x1y2 - y1x2

        vertices.push(nextPoint);

        // leftShoelace += nextPoint.x * currentPoint.y;
        // rightShoelace += nextPoint.y * currentPoint.x;
        lagoonSize += dist;
        currentPoint = nextPoint;
    }


    // console.log(`left: ${leftShoelace}`);
    // console.log(`right: ${rightShoelace}`);


   let shoelace = 0;
   for (let i = 0; i < vertices.length - 1; i++) {
       shoelace += vertices[i].x * vertices[i + 1].y - vertices[i + 1].x * vertices[i].y;
   }
   shoelace += vertices[vertices.length - 1].x * vertices[0].y - vertices[0].x * vertices[vertices.length - 1].y;
   const lagoonArea = (Math.abs(shoelace) + lagoonSize) / 2;


    console.log(`interior = ${lagoonArea}`);
    console.log(`trench = ${lagoonSize}`);
    console.log(lagoonArea + 1);
};

// part1();
part2b();