import * as fs from "fs";
import * as yargs from "yargs";
import { runIntcode } from "./intcode";


const args = yargs.options({
    'file': { type: 'string', demandOption: true, alias: 'f' },
  }).argv;

  const fullFilePath = `${process.cwd()}/${args['file']}`;

if (!fs.existsSync(fullFilePath)) {
    console.error("No such file: " + fullFilePath);
}

const contents = fs.readFileSync(fullFilePath, 'utf8');

const cleanMemory = contents.split(',').map( (v) => parseInt(v, 10));

const permute = (permutation: number[]) => {
    var length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1, k, p;
  
    while (i < length) {
      if (c[i] < i) {
        k = i % 2 && c[i];
        p = permutation[i];
        permutation[i] = permutation[k];
        permutation[k] = p;
        ++c[i];
        i = 1;
        result.push(permutation.slice());
      } else {
        c[i] = 0;
        ++i;
      }
    }
    return result;
  }

  const allPermutations = permute([0,1,2,3,4]);

  let maxPhaseSetting = 0;
  let maxValue = 0;

  allPermutations.forEach( (settings) => {

    const memory: number[] = Object.assign([], cleanMemory);

    let currentOutput = 0;
    for (let phase of settings) {
        console.log(`Running with ${phase} and ${currentOutput}`);
        [currentOutput] = runIntcode(memory, [phase, currentOutput]); 
        console.log(`Output ${currentOutput}`);

    }
    console.log(`Final value: ${currentOutput}`);

    if (currentOutput > maxValue) {
        maxPhaseSetting = parseInt(settings.join(''), 10);
        maxValue = currentOutput;
    }
  });

console.log(`Phase Setting: ${maxPhaseSetting}`);
console.log(`Value: ${maxValue}`);
