import * as fs from "fs";
import yargs = require('yargs');

const args = yargs.options({
    'file': { type: 'string', demandOption: true, alias: 'f' },
  }).argv;
  
const fullFilePath = `${process.cwd()}/${args['file']}`;

if (!fs.existsSync(fullFilePath)) {
    console.error("No such file: " + fullFilePath);
}
const contents = fs.readFileSync(fullFilePath, 'utf8');
const lines = contents.trim().split(/\n/g);

const octopi: number[][] = [];
const flashMap = new Map<string, boolean>();

for (let line of lines) {
    octopi.push(line.split('').map( (v) => parseInt(v, 10)));
}
console.dir(octopi);

const increaseEnergyLevel = () => {
    for (let row = 0; row < octopi.length; row++) {
        for (let col = 0; col < octopi[0].length; col++) {
            incrementOctopus(row, col);
        }
    }
}

const incrementOctopus = (row: number, col: number) => {
    if (row >= 0 && col >= 0 && row < octopi.length && col < octopi[0].length) {
        if (octopi[row][col] < 10 && !flashMap.has(`${row},${col}`)) {
            octopi[row][col]++;
        }
    }
}

const flash = (row: number, col: number) => {
    octopi[row][col] = 0;
    flashMap.set(`${row},${col}`, true);

    incrementOctopus(row + 1, col - 1);
    incrementOctopus(row + 1, col);
    incrementOctopus(row + 1, col + 1);
    incrementOctopus(row - 1, col - 1);
    incrementOctopus(row - 1, col);
    incrementOctopus(row - 1, col + 1);
    incrementOctopus(row, col - 1);
    incrementOctopus(row, col + 1);
}

let totalFlashes = 0;
for (let step = 0; step < 100; step++) {
    flashMap.clear();
    increaseEnergyLevel();
    console.dir(octopi);

    let flashCount = 1;
    while (flashCount !== 0) {
        flashCount = 0;
        for (let row = 0; row < octopi.length; row++) {
            for (let col = 0; col < octopi[0].length; col++) {
                if (octopi[row][col] >= 10 && !flashMap.has(`${row},${col}`)) {
                    flash(row, col);
                    flashCount++;
                } else if (octopi[row][col] >= 10) {
                    octopi[row][col] = 9;
                }
            }
        }
        totalFlashes += flashCount;
    }

   
}

console.log(`Total Flashes = ${totalFlashes}`);