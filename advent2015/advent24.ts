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
const goal = sum / 3;
const results: number[][][] = [];

const equals = (a: number[], b: number[]) =>
  a.length === b.length &&
  a.every((v, i) => v === b[i]);

const sumGroup = (g: number[]) => g.reduce( (p, c) => p + c, 0);
const isValidSolution = (possibleSolution: number[][] ) => {
    const g1 = possibleSolution[0];
    const g2 = possibleSolution[1];
    const g3 = possibleSolution[2];

    const orderOfLengths = [g1.length, g2.length, g3.length].sort ( (a,b) => a - b);
    if (orderOfLengths[0] === orderOfLengths[1]) {
        return false;
    }

    for (let solution of results) {
        if (equals(g1, solution[0]) 
            && equals(g2, solution[1])
            && equals(g3, solution[2])) {
                return false;
            }
    }

    return true;
}




const transverse = (currentIndex: number, group1: number[], group2: number[], group3: number[], visitedIndices: number[]) => {
    const n = packages[currentIndex];
    const newGroup1 = [...group1];
    const newGroup2 = [...group2];
    const newGroup3 = [...group3];

    if (n + sumGroup(newGroup1) <= goal) {
        newGroup1.push(n);
    } else if (n + sumGroup(newGroup2) <= goal) {
        newGroup2.push(n);
    } else if (n + sumGroup(newGroup3) <= goal) {
        newGroup3.push(n);
    } 
   
    if (sumGroup(newGroup1) + sumGroup(newGroup2) + sumGroup(newGroup3) === sum
        && newGroup1.length > 0 && newGroup2.length > 0 && newGroup3.length > 0
    ) {     
        const solutionArray =  [
            [...newGroup1].sort( (a, b) => b - a),
            [...newGroup2].sort( (a, b) => b - a),
            [...newGroup3].sort( (a, b) => b - a)
        ].sort( (a, b) => a.length - b.length);

        if (isValidSolution(solutionArray)) {

            console.dir(solutionArray);
            results.push( solutionArray );
        }

        return;
    }

    const newVisitedIndices = [currentIndex, ...visitedIndices];
    for (let newIndex = 0; newIndex < packages.length; newIndex++) {
        if (!newVisitedIndices.includes(newIndex)) {
            transverse(newIndex, newGroup1, newGroup2, newGroup3, newVisitedIndices);
        }
    }

    
}


// console.dir(packages);
console.log(`sum = ${sum}`);
console.log(`goal = ${goal}`);


for (let i = 0; i < packages.length; i++) {
    transverse(i, [], [], [], []);
}


let minQE = 999999;
for (let solution of results) {
    const group1 = solution[0];
    const qe = group1.reduce( (p, c) => p * c);
    minQE = Math.min(qe); 
}

console.log(minQE);