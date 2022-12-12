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
  const elevationsStr = contents.trim().split(/\n/g);
  const numberOfIncreases = elevationsStr.map((value, index, arr) => {
      return parseInt(value, 10);
  }).reduce((prev, cur, index, arr) => {
    if (index > 0) {
        if (cur > arr[index - 1]) {
            return prev + 1 
        };
    }
    return prev;
  }, 0);

const rollingNumberOfIncreases = elevationsStr.map((value, index, arr) => {
    return parseInt(value, 10);
}).reduce((prev, cur, index, arr) => {
  if (index > 2) {
      const prevSum = arr[index - 3] + arr[index - 2] + arr[index - 1];
      const curSum = arr[index - 2] + arr[index - 1] + arr[index];  
      if (curSum > prevSum) {
          return prev + 1 
      };
  }
  return prev;
}, 0);  


console.log("Number of increases: " + numberOfIncreases);
console.log("Rolling number of increases: " + rollingNumberOfIncreases);
