import * as fs from "fs";
import yargs = require('yargs');

const args = yargs.options({
    'file': { type: 'string', demandOption: true, alias: 'f' },
  }).argv;
  
const fullFilePath = `${process.cwd()}/${args['file']}`;

if (!fs.existsSync(fullFilePath)) {
    console.error("No such file: " + fullFilePath);
}

const shuffle = (array: number[]) => {
    {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
 }

const contents = fs.readFileSync(fullFilePath, 'utf8');
const packages = contents.trim().split(/\n/g).map( (v) => parseInt( v, 10) );
const sum = packages.reduce( (p, c) => p + c, 0);
const goal = sum / 3;
const sumGroup = (g: number[]) => g.reduce( (p, c) => p + c, 0);
const prodGroup = (g: number[]) => g.reduce( (p, c) => p * c, 1);
const isValidSolution = (g1: number[], g2: number[], g3: number[]) => 

console.log(`sum = ${sum}`);
console.log(`goal = ${goal}`);

let minQE = 999999;
for (let i = 0; i < 20000; i++) {
    shuffle(packages);

    const g1: number[] = [];
    const g2: number[] = [];
    const g3: number[] = [];

    let pkgSum = 0;
    for (let pkg of packages) {

        if (sumGroup(g1) + pkg < goal) {
            g1.push(pkg);
        } else if (sumGroup(g2) + pkg < goal) {
            g2.push(pkg);
        } else if (sumGroup(g3) + pkg < goal) {
            g3.push(pkg);
        } else {
            break;
        } 
    }

    if (sumGroup(g1) + sumGroup(g2) + sumGroup(g3) === sum) {
       
    }
}

console.log(`QE = ${minQE}`);

