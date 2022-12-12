import { getFileContents, point, getNeigborPoints, pointCompare } from "../Utils";
import { doBFS } from "../BFS";
    
const contents = getFileContents().trim().split(/\n/g);

const hillMap: number[][] = [];

let row = 0; 
let col = 0;
const startingPoints: point[] = [];
const endingPoint =  { x: 0, y: 0 };
for (const line of contents) {
    hillMap.push(line.split('').map( v => {
        let ret = 0;
        if (v === 'S' || v === 'a') {
            startingPoints.push({x: col, y: row});
            ret = 0;
        } else if (v === 'E') {
            endingPoint.x = col;
            endingPoint.y = row;
            ret = 26;
        } else {
            ret = v.charCodeAt(0) - 97;
        }
        col++;
        return ret;
    }));
    row++;
    col = 0;
}

const getNeigbors = ( a: point ) => {
    const aHeight = hillMap[a.y][a.x];
    const nextPoints = getNeigborPoints( a.y, a.x, hillMap, false);
    return nextPoints.filter( v => hillMap[v.y][v.x] <= aHeight + 1);
}


let minDistance = Number.MAX_VALUE;
while (startingPoints.length > 0) {
    const startingPoint = startingPoints.pop()!;
    const result = doBFS( startingPoint, endingPoint, pointCompare, getNeigbors);
    minDistance = Math.min(result!.distance, minDistance);
}
console.log(`Minimum Distance = ${minDistance}`);