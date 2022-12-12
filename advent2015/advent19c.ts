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

interface transformation {
    searchString: string,
    replacement: string
}


const transformationList: transformation[] = [];


for (let line of lines) {
    const [searchString, replacement] = line.split(' => ', 2);
    transformationList.push({
        searchString,
        replacement
    })
}

// console.dir(transformationList);
const initialString = 'CRnCaCaCaSiRnBPTiMgArSiRnSiRnMgArSiRnCaFArTiTiBSiThFYCaFArCaCaSiThCaPBSiThSiThCaCaPTiRnPBSiThRnFArArCaCaSiThCaSiThSiRnMgArCaPTiBPRnFArSiThCaSiRnFArBCaSiRnCaPRnFArPMgYCaFArCaPTiTiTiBPBSiThCaPTiBPBSiRnFArBPBSiRnCaFArBPRnSiRnFArRnSiRnBFArCaFArCaCaCaSiThSiThCaCaPBPTiTiRnFArCaPTiBSiAlArPBCaCaCaCaCaSiRnMgArCaSiThFArThCaSiThCaSiRnCaFYCaSiRnFYFArFArCaSiRnFYFArCaSiRnBPMgArSiThPRnFArCaSiRnFArTiRnSiRnFYFArCaSiRnBFArCaSiRnTiMgArSiThCaSiThCaFArPRnFArSiRnFArTiTiTiTiBCaCaSiRnCaCaFYFArSiThCaPTiBPTiBCaSiThSiRnMgArCaF';
const goalString = 'e';

const getListOfTransformations = (initialString: string) => {
    const result = new Set<string>();

    for (let t of transformationList) {
        let pos = 0;
        let index = -1;
        while ((index = initialString.indexOf(t.replacement, pos)) > -1) {   
            const before = initialString.substring(0, index);
            const after = initialString.substring(index + t.replacement.length);
            const newString = before + t.searchString + after;
            result.add(newString);
            pos = index + 1;
        }
    }

    return Array.from(result.values());
}

let currentStrings = [initialString];
let steps = 1;

loopLabel:
while (true) {
    
    const nextStrings = new Set<string>();

    for (let searchString of currentStrings) {
        const r = getListOfTransformations(searchString);
        if (r.includes(goalString)) {
            console.log(`success in ${steps} steps!`);
            break loopLabel;
        }

        r.forEach(item => nextStrings.add(item))
    }
   

    
    currentStrings = [...Array.from(nextStrings).sort( (a, b) => a.length - b.length).slice(0, 1000)];
    console.dir(currentStrings);
    console.log(`Step #${steps}... size = ${currentStrings.length}`);
    steps++;
}