import { getFileContents, point } from "../Utils";
    
const contents = getFileContents().trim().split(/\n/g);

const getManhattanDistance = (p1: point, p2: point) => {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

const sensorDistances: Map<point, number> = new Map<point, number>();
const beacons: Map<string, boolean> = new Map<string, boolean>();

const MAX = 4000000;
let minX = Number.MAX_SAFE_INTEGER;
let maxX = 0;

for (const line of contents) {
    const coords = line.match(/\-?\d+/g) || [];
    const [sx, sy, bx, by] = coords.map( v => Number(v) );

    const distance = getManhattanDistance( {x: sx, y: sy}, {x: bx, y: by});
    sensorDistances.set({x: sx, y: sy}, distance);
    beacons.set(`${JSON.stringify({x: bx, y: by})}`, true);

    minX = Math.min(minX, sx - distance);
    maxX = Math.max(maxX, sx + distance);
}


const check = ( p: point ) => {
    if (p.y < 0 || p.y > MAX || p.x < 0 || p.x > MAX) {
        return false;
    }
    for ( const [sensor, dist] of sensorDistances.entries()) {
        const checkDistance = getManhattanDistance(sensor, p);
        if (checkDistance <= dist) {
            return false;
        }
    }
    console.log(JSON.stringify(p));
    console.log(`frequency = ${p.x * 4000000 + p.y}`);
    return true;
}

const getDiags = ( p: point, d: number ) => {

    let xOffset = 0;
    for (let row = p.y - d - 1; row <= p.y; row++ )
    {
        if (check( {x: p.x + xOffset, y: row}) || check( {x: p.x - xOffset, y: row})) {
            
            return true;
        }
        xOffset++;
    }

    xOffset = 0;
    for (let row = p.y + d + 1; row > p.y; row-- )
    {
        if (check( {x: p.x + xOffset, y: row}) || check( {x: p.x - xOffset, y: row})) {
            
            return true;
        }
        xOffset++;
    }

    return false;
}


// Count the number of spaces covered by sensors in the given row
// I've already calculated the min and max x when reading in the data.
let count = 0;
const row = 2000000;
for (let col = minX; col < maxX; col++) {
    const checkPoint = { x: col, y: row };
    for ( const [sensor, dist] of sensorDistances.entries()) {
        const checkDistance = getManhattanDistance(sensor, checkPoint);
        if (checkDistance <= dist && !beacons.has(`${JSON.stringify(checkPoint)}`)) {
            count++;
            break;
        }
    }
}
console.log(`dead spaces: ${count}`);

// for every sensor, just check right outside the bounding diamond
// the function will return true if it finds the spot outside of all the other sensors
for (const [sensor, distance] of sensorDistances.entries()) {
    if (getDiags(sensor, distance)) {
        break;
    }
}

