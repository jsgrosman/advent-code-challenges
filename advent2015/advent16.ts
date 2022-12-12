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

const constraints = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
};

nextLine:
for (let line of lines) {
    const name = line.substr(0, line.indexOf(':'));
    
    let jsonStr = '{' + line.substr(line.indexOf(':') + 2) + '}';
    jsonStr = jsonStr.replace(/\b(\w+):/g, '\"\$1\":');
    
    const jsonObj = JSON.parse(jsonStr);

    for (let [key, value] of Object.entries(jsonObj)) {

        const numVal = Number(value);
        switch (key) {
            case 'cats':
            case 'trees': {
                if (numVal <= constraints[key as keyof typeof constraints]) {
                    continue nextLine;
                }
                break;
            }
            case 'pomeranians':
            case 'goldfish': {
                if (numVal >= constraints[key as keyof typeof constraints]) {
                    continue nextLine;
                }
                break;
            }
            default: {
                if (constraints[key as keyof typeof constraints] !== numVal) {
                    continue nextLine;
                }
            }
        }
        
    }

    console.log(line);
    // break;
}