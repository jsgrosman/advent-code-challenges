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

const calories = contents.trim().split(/\n/g).map( v => parseInt(v, 10));
calories.push(NaN);

console.dir(calories);

let elfCalories = 0;
let maxCalories = 0;
for (let i = 0; i < calories.length; i = i + 1) {
    const numberOfCalories = calories[i];
    console.log("number of calories " + numberOfCalories);

    if (!isNaN(numberOfCalories)) {
        elfCalories = elfCalories + numberOfCalories;
        console.log("elfCalories " + elfCalories);
    } else {
        console.log ("ran out of elf");
        if (elfCalories > maxCalories) {
            maxCalories = elfCalories;
            console.log("setting new max calories to " + elfCalories);
        }
        elfCalories = 0;
    }

}
console.log("maxCalories = " + maxCalories);

// const calorieCounts: number[] = [];

// calories.reduce( (a: number, c: number) => {
//     if (isNaN(c)) {
//         calorieCounts.push(a);
//         return 0;
//     }
//     else {
//         return a + c;
//     }
// });

// calorieCounts.sort((a, b) => b - a);
// console.log(calorieCounts[0]);
// console.log(calorieCounts.slice(0,3).reduce( (a, c) => a + c));