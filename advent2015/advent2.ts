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

const dimensions = contents.trim().split(/\n/g);

const wrappingPaper = dimensions.map((dimString, index, arr) => {
    const [l, w, h] = dimString.split('x').map((v,i,a) => { return parseInt(v, 10); });
    const sqft = 2*l*w + 2*w*h + 2*h*l;

    const arrayToSort = [l, w, h];
    arrayToSort.sort(function(a, b) {
        return a - b;
      });
     
    const extra = arrayToSort[0] * arrayToSort[1];


    console.log(dimString + " == " + sqft + " + " + (l * w) + " = " + extra);
    return sqft + extra;
}).reduce( (p, c, i, a) => {
    return p + c;
}, 0);

const ribbon = dimensions.map((dimString, index, arr) => {
    const [l, w, h] = dimString.split('x').map((v,i,a) => { return parseInt(v, 10); });

    const arrayToSort = [l, w, h];
    arrayToSort.sort(function(a, b) {
        return a - b;
      });
     
    const ribbon = 2 * (arrayToSort[0] + arrayToSort[1]); 
    const bow = l * w * h;


    console.log(dimString + " == " + ribbon + " + " + bow + " = " + (ribbon + bow));
    return ribbon + bow;
}).reduce( (p, c, i, a) => {
    return p + c;
}, 0);

console.log("wrapping paper: " + wrappingPaper);
console.log("ribbon: " + ribbon);

