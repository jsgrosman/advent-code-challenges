import { getFileContents, point, getNeigborPoints, pointCompare } from "../Utils";
import { doBFS } from "../BFS";

const knotHash = ( input: string, codeSize: number ) => {
    let code: number[] = [...new Array<number>(codeSize).keys()];

    let currentPos = 0;
    let skipSize = 0;
    const lengths = input.split('').map( v => Number(v.charCodeAt(0)));
    lengths.push(17, 31, 73, 47, 23);

    for (let round = 0; round < 64; round++) {
        for (const lengthOfCycle of lengths) {
            if (lengthOfCycle > 1) {
                code = [...code.slice(currentPos), ...code.slice(0, currentPos)];
                code = [...code.slice(0, lengthOfCycle).reverse(), ...code.slice(lengthOfCycle)];
                code = [...code.slice(-currentPos), ...code.slice(0, -currentPos)];
            }
            currentPos = (currentPos + lengthOfCycle + skipSize++) % codeSize;
        }
    }

    const denseHash: number[] = []
    for (let i = 0; i < codeSize; i += 16) {
        denseHash.push( code.slice(i, i + 16).reduce( (p,c) => p ^ c) );
    }
    return denseHash.map( v => v.toString(16) ).map( v => v.padStart(2, '0')).join('');
}

const convertToBinaryString = ( hexString: string ) => hexString.split('').map( v => parseInt(v, 16)).map( v => v.toString(2)).map( v => v.padStart(4, '0')).join('');

const grid: number[][] = [];

for (let row = 0; row < 128; row++) {
    const output = knotHash(`xlqgujun-${row}`, 256);
    const binaryOutput = convertToBinaryString(output);
    grid.push(binaryOutput.split('').map( v => Number(v)));
}

const getNeigbors = ( a: point ) => {
    const nextPoints = getNeigborPoints( a.y, a.x, grid, false);
    return nextPoints.filter( v => grid[v.y][v.x] == 1);
}

let regionCount = 0;
for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid.length; col++) {
        if (grid[row][col] === 1) {
            const region = doBFS({y: row, x: col}, undefined, pointCompare, getNeigbors);
            for (let r of region) {
                grid[r.data.y][r.data.x] = 0;
            }
            regionCount++;
        }

    }
}

console.dir(regionCount);

