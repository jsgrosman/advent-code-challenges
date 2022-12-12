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

  let lanternFish = contents.split(",").map( (v, i, a) => { return parseInt(v, 10); });
  
  // initialize map
  const laternFishMap = new Map();
  for (let i = 0; i <= 8; i++) {
    laternFishMap.set(i, 0);
  }


  for (let age of lanternFish) {
    laternFishMap.set(age, laternFishMap.get(age) + 1);
  }

  // console.dir(laternFishMap);

  for (let days = 0; days < 256; days++) {
    let countOfNextAge = -1;
    for (let ageIndex = 8; ageIndex >= 0; ageIndex--) {
        const currentCount = laternFishMap.get(ageIndex)!;
        if ( countOfNextAge >= 0 ) {
            laternFishMap.set(ageIndex, countOfNextAge);
        }
        countOfNextAge = currentCount;
    }
    laternFishMap.set(8, countOfNextAge); // add new children
    laternFishMap.set(6, laternFishMap.get(6)! + countOfNextAge);
    // console.dir(laternFishMap);
}

const result = Array.from(laternFishMap.values()).reduce( (p, c, i, a ) => {
    return p + c;
}, 0);

console.log('Total Number of Fish: ' + result);