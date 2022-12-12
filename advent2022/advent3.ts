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

const sacks = contents.trim().split(/\n/g);

let part1Total = 0;
sacks.forEach( (v) => {
    const pocket1 = v.substring(0, v.length / 2);
    const pocket2 = v.substring(v.length / 2);

    const [letter] = pocket1.split('').filter( (v) => pocket2.includes(v));
    letter == letter.toLowerCase() ? part1Total += letter.charCodeAt(0) - 96 : part1Total += letter.charCodeAt(0) - 38;
} );

let part2Total = 0;
for (let i = 0; i < sacks.length; i += 3) {
        const sack1 = sacks[i], sack2 = sacks[i + 1], sack3 = sacks[i + 2];
        const [letter] = sack1.split('').filter( (v) => sack2.includes(v) && sack3.includes(v));
        letter == letter.toLowerCase() ? part2Total += letter.charCodeAt(0) - 96 : part2Total += letter.charCodeAt(0) - 38;
}
console.log(`Part 1 Total = ${part1Total}`);
console.log(`Part 2 Total = ${part2Total}`);

