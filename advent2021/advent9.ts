import * as fs from "fs";
import yargs = require('yargs');
import {point, Basin} from "./Basin";

const args = yargs.options({
    'file': { type: 'string', demandOption: true, alias: 'f' },
  }).argv;
  
const fullFilePath = `${process.cwd()}/${args['file']}`;

if (!fs.existsSync(fullFilePath)) {
    console.error("No such file: " + fullFilePath);
}
const contents = fs.readFileSync(fullFilePath, 'utf8');
const lines = contents.trim().split(/\n/g);

const heightmap: number[][] = [];

let row = 0;
for (let line of lines) {
    heightmap[row++] = line.split('').map( (v) => parseInt(v, 10));
}
const numRows = heightmap.length;
const numCols = heightmap[0].length
console.log(`size = ${numRows}, ${numCols}`);

const getUpPoint = (loc: point) => {
    return {
        row: loc.row - 1,
        col: loc.col
    }
}

const getDownPoint = (loc: point) => {
    return {
        row: loc.row + 1,
        col: loc.col
    }
}

const getWestPoint = (loc: point) => {
    return {
        row: loc.row,
        col: loc.col - 1
    }
}

const getEastPoint = (loc: point) => {
    return {
        row: loc.row,
        col: loc.col + 1
    }
}

const getCellValue = (loc: point) => {
    if (loc.row >= 0 && loc.col >= 0 && loc.row < numRows && loc.col < numCols) {
        return heightmap[loc.row][loc.col];
    } else {
        return 9;
    }
}

const getIsLowest = (loc: point, searchValue: number) => {

    const neighbors = [
        getCellValue(getUpPoint(loc)),
        getCellValue(getDownPoint(loc)),
        getCellValue(getWestPoint(loc)),
        getCellValue(getEastPoint(loc)),
    ]

    return neighbors.filter( (v) => v <= searchValue).length === 0;
}


// console.dir(heightmap);

let riskLevel = 0;
let lowpointCount = 0;
const basinSizes: number[] = [];
for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
        const currentLoc = { row, col};
        const cellValue = getCellValue(currentLoc);
        
        if (getIsLowest(currentLoc, cellValue)) {
            riskLevel += 1 + cellValue;
            lowpointCount++;

            const b = new Basin(heightmap);
            b.generateBasin(currentLoc);
            console.log(`${row}, ${col}: basin size: ${b.getBasinSize()}`);
            basinSizes.push(b.getBasinSize());
        }
    }
}


console.log(`${lowpointCount} lowpoints, risk level: ${riskLevel}`);

basinSizes.sort( (a, b) => b - a);
console.dir(basinSizes);