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

const passPhrases = contents.trim().split(/\n/g).map( v => v.split(' ').map( s => s.split('').sort().join('')));
console.dir(passPhrases);
let total = 0;

PHRASE_LOOP:
for (let phrase of passPhrases) {
    for  (let i = 0; i < phrase.length - 1; i++) {

        if (phrase.slice(i + 1).includes(phrase[i])) {
            continue PHRASE_LOOP;
        }
    }
    total++;
}

console.log(`Total: ${total}`);
