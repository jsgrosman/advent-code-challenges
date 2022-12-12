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

for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
        const memory: number[] = Object.assign([], cleanMemory);
        memory[1] = noun;
        memory[2] = verb;
        runIntcode(memory);
        if (memory[0] === 19690720) {
            console.log((100 * noun) + verb);
            process.exit(0);
        }
    }
}