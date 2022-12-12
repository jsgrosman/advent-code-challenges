import { getFileContents, point, pointCompare, getNeigborPoints, print2dArr } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

const caveMap: number[][] = [];
const riskMap: number[][] = [];
const distanceMap: number[][] = [];

for (let line of lines) {
    caveMap.push(line.split('').map(Number));
}

const originalRowLength = caveMap.length;
const originalColLength = caveMap[0].length;

for (let n = 0; n < 4; n++)
{
    for (let caveRow of caveMap) {
        caveRow.push(...caveRow.slice(-originalRowLength).map( (v) => {
            if (v === 9) {
                return 1;
            } else {
                return v + 1;
            }
        }));
    }
}

for (let n = 0; n < 4; n++)
{
    caveMap.push(...caveMap.slice(-originalColLength).map( (v) => {
        return v.map( (v1) => {
            if (v1=== 9) {
                return 1;
            } else {
                return v1 + 1;
            }
        });
    }))
}

for (let caveRow of caveMap) {
    riskMap.push(new Array(caveRow.length).fill(Number.POSITIVE_INFINITY));
}



const finalPoint = {
    y: caveMap.length - 1,
    x: caveMap[0].length - 1
};

for (let row = 0; row < caveMap.length; row++ ) {
    distanceMap[row] = [];
    for (let col = 0; col < caveMap[0].length; col++) {
        distanceMap[row][col] = Math.sqrt(Math.pow(finalPoint.y - col, 2) + Math.pow(finalPoint.x - row, 2));
    }
}

// print2dArr(distanceMap);

// print2dArr(caveMap);
// print2dArr(riskMap);
const heuristic = (p: point) => {
    const risk = riskMap[p.y][p.x];
    const distance = distanceMap[p.y][p.x] * 10;
    return  risk + distance;
}


const toBeVisited: point[] = [];
const alreadyVisited: point[] = [];

let count = 0;
const visit = () => {

    // print2dArr(riskMap);

    let minRisk = Number.POSITIVE_INFINITY;
    let minIndex = -1;
    for (let i = 0; i < toBeVisited.length; i++) {
        const p = toBeVisited[i];
        if (heuristic(p) <= minRisk) {
            minIndex = i;
            minRisk = heuristic(p);
        }
    }
    

    

    if (minIndex >= 0) {
        const currentPoint = toBeVisited[minIndex];
        console.log(`Getting closer: ${ distanceMap[currentPoint.y][currentPoint.x]}`);

        if (pointCompare(currentPoint, {
            y: riskMap.length - 1,
            x: riskMap[0].length - 1
        })) {
            toBeVisited.splice(0,toBeVisited.length);
            return;
        }

        const currentRisk = riskMap[currentPoint.y][currentPoint.x];
        toBeVisited.splice(minIndex, 1);
        alreadyVisited.push(currentPoint);

        const neighbors = getNeigborPoints(currentPoint.y, currentPoint.x, caveMap, false);
        for (let n of neighbors) {
            // console.log(`n:  ${n.x},${n.y}`);
            if (!alreadyVisited.some( (v) => pointCompare(n, v)) ) {
                const neighborRisk = riskMap[n.y][n.x];
                if (currentRisk + caveMap[n.y][n.x] < neighborRisk) {
                    riskMap[n.y][n.x] = currentRisk + caveMap[n.y][n.x];
                    // console.log(`Updating ${n.x},${n.y} with risk (${currentRisk} + ${caveMap[n.y][n.x]}) from ${currentPoint.x},${currentPoint.y}`)
                }
                if (!toBeVisited.some( (v) => pointCompare(n, v)) ) {
                    toBeVisited.push(n);
                }
            }
        }
        // print2dArr(riskMap);
    }


}

toBeVisited.push( { x: 0, y: 0});
riskMap[0][0] = 0;
while (toBeVisited.length > 0) {
    visit();
}


// print2dArr(caveMap);

console.log(riskMap[riskMap.length - 1][riskMap[0].length - 1]);