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
const diagnostics = contents.trim().split(/\n/g);


const result = new Array(diagnostics[0].length).fill(0);
console.dir(result);
diagnostics.map((v, i, a) => {
    const binaryToArray = v.split('');
    binaryToArray.map((v1, i1, a1) => {
        switch (v1) {
            case '0':
                result[i1]--;
                break;
            case '1': 
                result[i1]++;
                break;   
        }
    });   
});

const gamma = parseInt(result.map((v, i, a) => {
    if (v > 0) {
        return '1';
    }
    else {
        return '0'
    }
}).join(''), 2);

const epsilon = parseInt(result.map((v, i, a) => {
    if (v > 0) {
        return '0';
    }
    else {
        return '1'
    }
}).join(''), 2);


console.dir(gamma + " * " + epsilon + " = " + (gamma * epsilon));