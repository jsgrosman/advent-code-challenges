import * as fs from "fs";
import yargs = require('yargs');

const args = yargs.options({
    'file': { type: 'string', demandOption: true, alias: 'f' },
  }).argv;
  
const fullFilePath = `${process.cwd()}/${args['file']}`;

if (!fs.existsSync(fullFilePath)) {
    console.error("No such file: " + fullFilePath);
}

//no one side can be greater than the sum of the others

const contents = fs.readFileSync(fullFilePath, 'utf8');
const lines = contents.trim().split(/\n/g);

let count = 0;
const superLine1: number[] = [];
const superLine2: number[] = [];
const superLine3: number[] = [];
for (let line of lines) {
    const sides = line.trim().split(/\s+/).map( (v) => parseInt(v, 10));
    superLine1.push(sides[0]);
    superLine2.push(sides[1]);
    superLine3.push(sides[2]);
    
    //console.dir(sides);
    //if (sides[0]+sides[1]>sides[2]){
    //    count ++;
    //}
}
for (let list of [superLine1,superLine2,superLine3]){
    for (let i = 0; i < list.length; i += 3){
        const max = Math.max(list[i],list[i+1],list[i+2]);
        const sum = list[i] + list[i+1] + list[i+2];
        //console.log(`1.${list[i]},2.${list[1+1]},3.${list[i+2]}`);
        console.log(sum);
        console.log(max);
        console.log(sum - max);
        if ((sum-max) > max){
            count ++;
        }
        //count ++;
    }
}
console.log(count);