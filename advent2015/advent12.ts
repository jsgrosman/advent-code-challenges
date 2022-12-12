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

const jsonObj = JSON.parse(contents);
// console.dir(jsonObj);




let sum = 0;
const transverse = (jsonObj: []|object|number|string) => {
    switch (typeof(jsonObj)) {
        case 'number': {
            sum += Number(jsonObj);
            break;
        }
        case 'string': {
            // ignore
            break;
        }
        case 'object': {
            if (jsonObj instanceof Array || !Object.values(jsonObj).includes("red")) {
                for (let child of Object.values(jsonObj)) {
                    transverse(child);
                }
            }
            break;
        
        }
    }
}

// const test = [1,{"c":"red","b":2},3];
transverse(jsonObj);
console.log(sum);