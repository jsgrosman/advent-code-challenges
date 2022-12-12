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

interface reindeer {
    name: string,
    speed:  number,
    endurance: number,
    rest: number,
    distance: number,
    secondsToToggle: number,
    isRacing: boolean,
    points: number
};

const allReindeer: reindeer[] = [];

for (let line of lines) {
    let happinessUnits = parseInt(line.match(/\d+/)![0], 10);

    if (line.includes('lose')) {
        happinessUnits = -happinessUnits;
    }

    const name = line.match(/^(\w+)\b/)![0];
    const matches = line.match(/can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds/) || [];
    const speed = parseInt(matches[1], 10);
    const endurance = parseInt(matches[2], 10);
    const rest =parseInt(matches[3], 10);

    allReindeer.push({
        name,
        speed,
        endurance,
        rest,
        distance: 0,
        secondsToToggle: endurance,
        isRacing: true,
        points: 0
    });

   // console.log(`${name}, ${speed}, ${endurance}, ${rest}`);
}

const updatePoints = () => {
    let leadDistance = 0;
    for (let r of allReindeer) {
        leadDistance = Math.max(leadDistance, r.distance);
    }

    for (let r of allReindeer) {
        if (r.distance == leadDistance) {
            r.points++;
        }
    }
}

const findReindeerWithMostPoints = () => {
    let leadPoints = 0, leadReindeer: reindeer|undefined = undefined;
    for (let r of allReindeer) {
        if (r.points > leadPoints) {
            leadPoints = r.points;
            leadReindeer = r;
        }
    }

    return leadReindeer;
}

for (let i = 0; i < 2503; i++) {
    for (let r of allReindeer) {
        if (r.isRacing) {
            r.distance += r.speed;
            r.secondsToToggle--;
            if (r.secondsToToggle == 0) {
                r.isRacing = false;
                r.secondsToToggle = r.rest;
            }
        } else {
            r.secondsToToggle--;
            if (r.secondsToToggle == 0) {
                r.isRacing = true;
                r.secondsToToggle = r.endurance;
            }
        }
    }
    updatePoints();
}

console.dir(allReindeer);
console.dir(findReindeerWithMostPoints())





