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
const instructions = contents.trim().split(/\n/g);

const lightsArray: number[][] = [];

const toggle = (x1: number, y1: number, x2: number, y2: number) => {
    for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
            lightsArray[x][y] += 2;
        }
    }
}

const turnOn = (x1: number, y1: number, x2: number, y2: number) => {
    for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
            lightsArray[x][y] += 1;
        }
    }
}

const turnOff = (x1: number, y1: number, x2: number, y2: number) => {
    for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
            lightsArray[x][y]--;
            if (lightsArray[x][y] < 0) {
                lightsArray[x][y] = 0;
            }
        }
    }
}

// initialize
for (let row = 0; row < 1000; row++) {
    lightsArray[row] = [];
    for (let col = 0; col < 1000; col++) {
        lightsArray[row][col] = 0;
    }
}

for (let instruction of instructions) {
    if (instruction.startsWith('turn on')) {

        const turnOnCoords = instruction.replace('turn on ', '').split(' through ', 2).map( (v, i, a) => {
            return v.split(',', 2).map( (v1, i1, a1) => {
                return parseInt(v1, 10);
            })
        });

        console.debug('turnOn');
        console.dir(turnOnCoords);
        turnOn(turnOnCoords[0][0], turnOnCoords[0][1], turnOnCoords[1][0], turnOnCoords[1][1]);
    } else if (instruction.startsWith('turn off')) {

        const turnOffCoords = instruction.replace('turn off ', '').split(' through ', 2).map( (v, i, a) => {
            return v.split(',', 2).map( (v1, i1, a1) => {
                return parseInt(v1, 10);
            })
        });

        console.debug('turnOff');
        console.dir(turnOffCoords);
        turnOff(turnOffCoords[0][0], turnOffCoords[0][1], turnOffCoords[1][0], turnOffCoords[1][1]);

    } else {
        const toggleCoords = instruction.replace('toggle ', '').split(' through ', 2).map( (v, i, a) => {
            return v.split(',', 2).map( (v1, i1, a1) => {
                return parseInt(v1, 10);
            })
        });

        console.debug('toggle');
        console.dir(toggleCoords);
        toggle(toggleCoords[0][0], toggleCoords[0][1], toggleCoords[1][0], toggleCoords[1][1]);
    }
}

const result = lightsArray.reduce( (p, c, i, a ) => {
    return p + c.reduce( (p1, c1, i1, a1) => {
        return p1 + c1;
    }, 0);

}, 0);

console.log(result);