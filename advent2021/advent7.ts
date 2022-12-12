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

  let crabs = contents.split(",").map( (v, i, a) => { return parseInt(v, 10); });

  crabs.sort( (a, b) => a - b);
  console.log(crabs.length);

  // const median = (crabs[Math.floor(crabs.length / 2)] +  crabs[Math.ceil(crabs.length / 2)])/2;
  //console.log(`median = ${median}`);

  const calcTriangularNumber = ( n: number ) => {
      return ( n * (n + 1) ) / 2; 
  }
 
  let result = 999999999;
  let smallestMedian = 0;
  for (let median = 1; median < 10000; median++) {
    const dist = crabs.reduce( (p, c) => {
        return p + calcTriangularNumber(Math.abs(median - c));
    }, 0);


    if (dist < result) {
        result = dist;
        smallestMedian = median;
    }
}

console.log(`result = ${result}, median = ${smallestMedian}`);


