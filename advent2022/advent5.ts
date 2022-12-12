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

const stacks: Map<number, string[]> = new Map<number, string[]>();
stacks.set(1, ['G', 'J', 'W', 'R', 'F', 'T', 'Z']);
stacks.set(2, ['M', 'W', 'G']);
stacks.set(3, ['G', 'H', 'N', 'J']);
stacks.set(4, ['W', 'N', 'C', 'R', 'J']);
stacks.set(5, ['M', 'V', 'Q', 'G', 'B', 'S', 'F', 'W']);
stacks.set(6, ['C', 'W', 'V', 'D', 'T', 'R', 'S']);
stacks.set(7, ['V', 'G', 'Z', 'D', 'C', 'N', 'B', 'H']);
stacks.set(8, ['C', 'G', 'M', 'N', 'J', 'S']);
stacks.set(9,  ['L', 'D', 'J', 'C', 'W', 'N', 'P', 'G']);

const instructions = contents.trim().split(/\n/g);

for (let instruct of instructions) {
    const [count, start, end] = instruct.matchAll(/\d+/g);
    console.log(`${count}, ${start}, ${end}`);

    const crane: string[] = [];
    for (let i = 0; i < Number(count); i++) {

        const box = stacks.get(Number(start))!.shift()!;
        crane.push(box);
        
    }
    stacks.get(Number(end))!.unshift(...crane);
}

console.dir(stacks);
