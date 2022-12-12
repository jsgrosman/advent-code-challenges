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
const result = new Set<string>();

for (let line of lines) {
    const [searchString, replacement] = line.split(' => ', 2);
    transformationList.push({
        searchString,
        replacement
    })
}

console.dir(transformationList);
const initialString = 'CRnCaCaCaSiRnBPTiMgArSiRnSiRnMgArSiRnCaFArTiTiBSiThFYCaFArCaCaSiThCaPBSiThSiThCaCaPTiRnPBSiThRnFArArCaCaSiThCaSiThSiRnMgArCaPTiBPRnFArSiThCaSiRnFArBCaSiRnCaPRnFArPMgYCaFArCaPTiTiTiBPBSiThCaPTiBPBSiRnFArBPBSiRnCaFArBPRnSiRnFArRnSiRnBFArCaFArCaCaCaSiThSiThCaCaPBPTiTiRnFArCaPTiBSiAlArPBCaCaCaCaCaSiRnMgArCaSiThFArThCaSiThCaSiRnCaFYCaSiRnFYFArFArCaSiRnFYFArCaSiRnBPMgArSiThPRnFArCaSiRnFArTiRnSiRnFYFArCaSiRnBFArCaSiRnTiMgArSiThCaSiThCaFArPRnFArSiRnFArTiTiTiTiBCaCaSiRnCaCaFYFArSiThCaPTiBPTiBCaSiThSiRnMgArCaF';

for (let t of transformationList) {
    let pos = 0;
    let index = -1;
    while ((index = initialString.indexOf(t.searchString, pos)) > -1) {   
        const before = initialString.substring(0, index);
        const after = initialString.substring(index + t.searchString.length);
        const newString = before + t.replacement + after;
        result.add(newString);
        pos = index + 1;
    }
}
console.dir(result);
console.log(`Result Size: ${result.size}`);