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
const lines = contents.trim().split(/\n/g);
const buckets = contents.split(",").map( (v, i, a) => { return parseInt(v, 10); });
buckets.sort( (a, b) => b-a); // sort in reverse order

const totalToAimFor = 150;
const bucketList: number[][] = []

const transverse = (currentIndex: number, currentBuckets: number[]) => {

    currentBuckets.push(buckets[currentIndex]);

    const sum = currentBuckets.reduce( (p, v) => {
        return p + v;
    }, 0);

    if (sum > totalToAimFor) {
        currentBuckets.pop();
    }
    else if (sum === totalToAimFor) {
        bucketList.push( Object.assign( [], currentBuckets));
        currentBuckets.pop();
    }
    else {
        for (let nextIndex = currentIndex + 1; nextIndex < buckets.length; nextIndex++) {
            transverse(nextIndex, currentBuckets);
        }
        currentBuckets.pop();
    }
};

for (let i = 0; i < buckets.length; i++) {
    transverse(i, []);
}
console.log(bucketList.length);

let minContainers = 9999;
let num = 1;
for (let solution of bucketList) {
    const count = solution.length;
    if (count < minContainers) {
        minContainers = count;
        num = 1;
    } else if (count === minContainers) {
        num++;
    }
}

console.log(`MinContainers = ${minContainers}, number = ${num}`);