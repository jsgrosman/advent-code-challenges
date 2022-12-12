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

// convert the input into an array of bit arrays
let oxygenMap = diagnostics.map((v, i, a) => {
    return v.split('');
});

let carbonDioxideMap = diagnostics.map((v, i, a) => {
    return v.split('');
});

// for each column...
for (let diagnosticIndex = 0; diagnosticIndex < diagnostics[0].length; diagnosticIndex++) {

    // store the parity value of 0's and 1's. 
    // negative value indicate more 0's
    // positive value indicate more 1's
    let columnOxygenResult = 0;
    oxygenMap.map((v1, i1, a1) => {
        switch (v1[diagnosticIndex]) {
            case '0':
                columnOxygenResult--;
                break;
            case '1': 
            columnOxygenResult++;
                break;   
        }
    });
    
    // store the parity value of 0's and 1's. 
    // negative value indicate more 0's
    // positive value indicate more 1's
    let columnCarbonDioxideResult = 0;
    carbonDioxideMap.map((v1, i1, a1) => {
        switch (v1[diagnosticIndex]) {
            case '0':
                columnCarbonDioxideResult--;
                break;
            case '1': 
            columnCarbonDioxideResult++;
                break;   
        }
    });

    // Filter out lines that don't coincide with the parity value
    if (oxygenMap.length > 1) {
        if (columnOxygenResult < 0) {
            oxygenMap = oxygenMap.filter( (v, i, a) => {
                return v[diagnosticIndex] === '0';
            });
        } else {
            oxygenMap = oxygenMap.filter( (v, i, a) => {
                return v[diagnosticIndex] === '1';
            });
        }
    }

    // Filter out lines that don't coincide with the parity value. 
    // This is reverse of the oxygen code
    if (carbonDioxideMap.length > 1) {
        if (columnCarbonDioxideResult < 0) {
            carbonDioxideMap = carbonDioxideMap.filter( (v, i, a) => {
                return v[diagnosticIndex] === '1';
            });
        } else {
            carbonDioxideMap = carbonDioxideMap.filter( (v, i, a) => {
                return v[diagnosticIndex] === '0';
            });
        }
    }
}

// convert to decimals
const oxygen = parseInt(oxygenMap[0].join(''), 2);
const carbonDioxide = parseInt(carbonDioxideMap[0].join(''), 2);

console.dir(oxygen + " * " + carbonDioxide + " = " + (oxygen * carbonDioxide));