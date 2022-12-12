import { getFileContents, point, getNeigborPoints, print2dArr } from "../Utils";
    
const contents = getFileContents().trim().split(/\n/g);

const hillMap: number[][] = [];

let row = 0; 
let col = 0;
const startingPoints: point[] = [];
const endingPoint =  { x: 0, y: 0};
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

// print2dArr(hillMap);

interface node {
    row: number;
    col: number;
    distance: number;
}

const getNodeFromSet = (row: number, col: number, s: Set<node>) => {
    for (const node of s) { 
        if (node.row === row && node.col === col) {
            return node;
        }
    }

    return null;
} 

console.log(`Number of starting points: ${startingPoints.length}`);

let minDistance = Number.MAX_VALUE;

const Visited: Set<node> = new Set<node>();
const ToBeVisted: Set<node> = new Set<node>();

while (startingPoints.length > 0) {
    const startingPoint = startingPoints.pop()!;
    Visited.clear();
    ToBeVisted.clear();

    ToBeVisted.add( { 
        row: startingPoint.y,
        col: startingPoint.x,
        distance: 0
    });

    while (ToBeVisted.size > 0) {

        let [currentNode] = ToBeVisted;
        for (const tbv of ToBeVisted) {
            if (tbv.distance < currentNode.distance) {
                currentNode = tbv;
            }
        }
        ToBeVisted.delete(currentNode);
        Visited.add(currentNode);

    //    console.log(`Visiting ${currentNode.row},${currentNode.col}: height = ${hillMap[currentNode.row][currentNode.col]} ${currentNode.distance} units away`)

        if (currentNode.row === endingPoint.y && currentNode.col === endingPoint.x) {
            console.log(`END: ${currentNode.distance}`);
            minDistance = Math.min(minDistance, currentNode.distance);
            break;
        }

        const currentHeight = hillMap[currentNode.row][currentNode.col];

        const nextPoints = getNeigborPoints( currentNode.row, currentNode.col, hillMap, false);
        for (const nextPoint of nextPoints) {
            const nextHeight =  hillMap[nextPoint.y][nextPoint.x];
            if (nextHeight <= currentHeight + 1) {
                if (!getNodeFromSet(nextPoint.y, nextPoint.x, Visited)) {
                    const neighbor = getNodeFromSet(nextPoint.y, nextPoint.x, ToBeVisted);
                    if (neighbor) {
                        if (neighbor.distance > currentNode.distance + 1) {
                            neighbor.distance = currentNode.distance + 1;
                        }
                    } else {
                        ToBeVisted.add( {
                            row: nextPoint.y,
                            col: nextPoint.x,
                            distance: currentNode.distance + 1
                        });
                    }
                }

            }
        }

    }
}

console.log(`Minimum Distance = ${minDistance}`);