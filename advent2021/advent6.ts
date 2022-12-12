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

  for (let days = 0; days < 80; days++) {
    let newFish = 0;
    lanternFish = lanternFish.map( (age, index, arr) => {

        if (age === 0) {
            newFish++;
            return 6;
        } else {
            return age - 1;
        }

    });
    for (let i = 0; i < newFish; i++) {
        lanternFish.push(8);
    }
    console.log("Day " + (days + 1));
    // console.dir(lanternFish);
}

console.log("Fish Count = " + lanternFish.length);