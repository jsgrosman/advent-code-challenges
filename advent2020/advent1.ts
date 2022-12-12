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
const entries = contents.trim().split(/\n/g).map( (v) => parseInt(v, 10)).sort( (a, b) => a -b);

console.dir(entries);

for (let index = 0; index < entries.length; index++) {

    const entry = entries[index];

    for (let sumIndex = entries.length - 1; sumIndex > index; sumIndex--) {
        const entry2 = entries[sumIndex];
        if (entry + entry2 >= 2020) {
            continue;
        }

        for (let thirdIndex = sumIndex - 1; thirdIndex > index; thirdIndex--) {
            const entry3 = entries[thirdIndex];
            if (entry + entry2 + entry3 === 2020) {
                console.log(`${entry} + ${entry2} + ${entry3} = ${entry + entry2 + entry3}`);
                console.log(entry * entry2 * entry3);
            } else if (entry + entry2 + entry3 < 2020) {
                break;
            }
        }
    }
}