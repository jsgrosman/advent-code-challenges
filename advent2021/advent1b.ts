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
  const elevations = contents.trim().split(/\n/g);

  let currentElevation = 0;
  let currentSum = 0;
  let numberOfIncreases = 0;

  let part1 = 0;
  let part2 = 0;
  let part3 = 0;

  for (let elevation of elevations) {
    const elevationNum = parseInt(elevation, 10);
    
    part1 = part2;
    part2 = part3;
    part3 = elevationNum;
    currentSum = part1 + part2 + part3

    let slidingWindow = false;
    if (part1 > 0 && part2 > 0 && part3 > 0) {
        slidingWindow = true;
    }

    if (slidingWindow && currentElevation > 0 && currentSum > currentElevation) {
        numberOfIncreases++;
        console.debug(currentSum + " (increased)");
    } else if (slidingWindow && currentElevation == 0) {
        console.debug(currentSum + " (N/A - no previous measurement)");
    } else if (slidingWindow && currentSum == currentElevation) {
        console.debug(currentSum + " (no change)");
    } else if (slidingWindow) {
        console.debug(currentSum + " (decreased)");
    }

    if (slidingWindow) {
        currentElevation = currentSum;
    }
  }

  console.log("Number of increases: " + numberOfIncreases);
