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

const sections = contents.trim().split(/\n/g).map( v => v.split(',', 2));

let total = 0;
for (let sect of sections) {

    const [elf1, elf2] = sect;
    const [elf1Start, elf1End] = elf1.split('-',2).map( v => parseInt(v, 10));
    const [elf2Start, elf2End] = elf2.split('-',2).map( v => parseInt(v, 10));

    if ((elf1Start >= elf2Start && elf1Start <= elf2End) || 
        (elf1End <= elf2End && elf1End >= elf2Start)) {
        total++;
        continue;
    }

    if ((elf2Start >= elf1Start && elf2Start <= elf1End) || 
        (elf2End <= elf1End && elf2End >= elf1Start)) {
        total++;
        continue;
    }
}

console.log(`total = ${total}`);