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

let codeCount = 0;
let charCount = 0;
for (let line of lines) {
    const code = line.length;
    codeCount += code;

    const replacement = line.replace(/\\\\/g, 'S')
        .replace(/\\\"/g, 'Q')
        .replace(/\\x[0-9a-f][0-9a-f]/g, 'H')
        .replace(/^\"/g, '')
        .replace(/\"$/g, '');

    charCount += replacement.length;    

    // console.debug(line + ":" + replacement + " -- " + code + "," + replacement.length);
}
console.log(codeCount + " - " + charCount + ' = ' + (codeCount - charCount));


codeCount = 0;
let encodeCount = 0;
for (let line of lines) {
    const code = line.length;
    codeCount += code;

    const replacement = line.replace(/\\\\/g, 'SSSS')
        .replace(/\\\"/g, 'QQQQ')
        .replace(/\\x[0-9a-f][0-9a-f]/g, 'HHHHH')
        .replace(/^\"/g, 'QQQ')
        .replace(/\"$/g, 'QQQ');

    encodeCount += replacement.length;    

    console.debug(line + ":" + replacement + " -- " + code + "," + replacement.length);
}

console.log(encodeCount + " - " + codeCount + ' = ' + (encodeCount - codeCount));
