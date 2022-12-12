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

const result = contents.split('').reduce( (p,c,i,a) => { 
    
    let floor = p;
    if (c === '(') {
        floor++;
    } else {
        floor--;
    }

    if (floor === -1) {
        console.log('Entering floor -1 at index ' + (i + 1));
    }

    return floor;

}, 0);

console.log(result);

