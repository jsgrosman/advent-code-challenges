import * as fs from "fs";
import * as yargs from "yargs";

const args = yargs.options({
    'file': { type: 'string', demandOption: true, alias: 'f' },
  }).argv;


const fullFilePath = `${process.cwd()}/${args['file']}`;

if (!fs.existsSync(fullFilePath)) {
    console.error("No such file: " + fullFilePath);
}

const contents = fs.readFileSync(fullFilePath, 'utf8');

const massList = contents.trim().split(/\n/g).map( v => parseInt(v, 10));
console.dir(massList);

const fuelList = massList.map( (v) => {
  let totalFuel = 0;
  let currentFuel = Math.floor(v / 3) - 2;

  while (currentFuel > 0) {
    totalFuel += currentFuel;
    currentFuel =  Math.floor(currentFuel / 3) - 2;
  }

  return totalFuel;
  
});
console.dir(fuelList);

const sum = fuelList.reduce( (a, c) => a + c);
console.debug(sum);