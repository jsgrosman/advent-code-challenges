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

const memory = contents.split(',').map( (v) => parseInt(v, 10));

runIntcode(memory, [5]);
