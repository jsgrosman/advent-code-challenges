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
const packages = contents.trim().split(/\n/g).map( (v) => parseInt( v, 10) ).sort( (a, b) => b - a);

const sum = packages.reduce( (p, c) => p + c, 0);
const goal = sum / 4;
const results: number[][][] = [];


const equals = (a: number[], b: number[]) =>
  a.length === b.length &&
  a.every((v, i) => v === b[i]);

let minQE = 13746962684390;
const sumGroup = (g: number[]) => g.reduce( (p, c) => p + c, 0);
const isValidSolution = (possibleSolution: number[][] ) => {
    const g1 = possibleSolution[0];
    const g2 = possibleSolution[1];
    const g3 = possibleSolution[2];
    const g4 = possibleSolution[3];

    // const orderOfLengths = [g1.length, g2.length, g3.length, g4.length].sort ( (a,b) => a - b);
    // if (orderOfLengths[0] === orderOfLengths[1]) {
    //     return false;
    // }

    for (let solution of results) {
        if (equals(g1, solution[0]) 
            && equals(g2, solution[1])
            && equals(g3, solution[2])
            && equals(g4, solution[3])) {
                return false;
            }
    }

    const qe = g1.reduce( (p, c) => p * c);
    if (qe >= minQE) {
        return false;
    } else {
        minQE = qe;
        console.log(`potential qe: ${minQE}`);
    }

    return true;
}




const transverse = (currentIndex: number, group1: number[], group2: number[], group3: number[], group4: number[]) => {
    const n = packages[currentIndex];



    if (sumGroup(group1) + sumGroup(group2) + sumGroup(group3) + sumGroup(group4) === sum
        && group1.length > 0 && group2.length > 0 && group3.length > 0 && group4.length > 0
    ) {     
        const solutionArray =  [
            [...group1].sort( (a, b) => b - a),
            [...group2].sort( (a, b) => b - a),
            [...group3].sort( (a, b) => b - a),
            [...group4].sort( (a, b) => b - a),
        ].sort( (a, b) => a.length - b.length);

        if (isValidSolution(solutionArray)) {

            // console.dir(solutionArray);

            results.push( solutionArray );
        }

        return;
    }

    if (n + sumGroup(group1) <= goal) {
        transverse(currentIndex + 1, [n, ...group1], [...group2], [...group3], [...group4]);
    }

    if (n + sumGroup(group2) <= goal) {
        transverse(currentIndex + 1, [...group1], [n, ...group2], [...group3], [...group4]);
    }

    if (n + sumGroup(group3) <= goal) {
        transverse(currentIndex + 1, [...group1], [...group2], [n, ...group3], [...group4]);
    }

    if (n + sumGroup(group4) <= goal) {
        transverse(currentIndex + 1, [...group1], [...group2], [...group3], [n, ...group4]);
    }
    
}


// console.dir(packages);
console.log(`sum = ${sum}`);
console.log(`goal = ${goal}`);

transverse(0, [], [], [], []);



for (let solution of results) {
    const group1 = solution[0];
    const qe = group1.reduce( (p, c) => p * c);
    minQE = Math.min(qe); 
}

console.log(minQE);