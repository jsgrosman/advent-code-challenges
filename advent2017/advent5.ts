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



const instructions: number[] = contents.trim().split(/\n/g).map( (v) => parseInt(v, 10) );
// console.dir(instructions);

let currentInstruction = 0;
let stepCount = 0;

while (currentInstruction >= 0 && currentInstruction < instructions.length) {
    stepCount++;
    
    const oldInstruction = currentInstruction;
    const offset = instructions[currentInstruction];
    currentInstruction += instructions[currentInstruction];

    // console.log(`Jumping to ${currentInstruction}`);

    if (offset >= 3) {
        instructions[oldInstruction]--;
    }
    else {
        instructions[oldInstruction]++;
    }
}

console.log(`Step Count: ${stepCount}`);