import * as fs from "fs";
import yargs = require('yargs');

const args = yargs.options({
    'file': { type: 'string', demandOption: true, alias: 'f' },
  }).argv;
  
const fullFilePath = `${process.cwd()}/${args['file']}`;

if (!fs.existsSync(fullFilePath)) {
    console.error("No such file: " + fullFilePath);
}

//     1
//   2 3 4
// 5 6 7 8 9
//   A B C
//     D

const contents = fs.readFileSync(fullFilePath, 'utf8');
const lines = contents.trim().split(/\n/g);

const up = (key: string) => {
    switch(key){
        case '1':
        case '2':
        case '4':
        case '5':
        case '9':
            return key;
        case '3':
            return '1';
        case '6':
            return '2';
        case '7':
            return '3';
        case '8':
            return '4';
        case 'A':
            return '6';
        case 'B':
            return '7';
        case 'C':
            return '8';
        case 'D':
            return 'B';
        default:
            return key;
    }
}
const down = (key: string) => {
    switch(key){
        case '5':
        case '9':
        case 'A':
        case 'C':
        case 'D':
            return key;
        case '1':
            return '3';
        case '2':
            return '6';
        case '3':
            return '7';
        case '4':
            return '8';
        case '6':
            return 'A';
        case '7':
            return 'B';
        case '8':
            return 'C';
        case 'B':
            return 'D';
        default:
            return key;
    }
}
const right = (key: string) => {
    switch(key){
        case '1':
        case '4':
        case '9':
        case 'C':
        case 'D':
            return key;
        case 'A':
            return 'B';
        case 'B':
            return 'C';
        default:
            return String(parseInt(key,10)+1);
    }
}
const left = (key: string) => {
    switch(key){
        case '1':
        case '2':
        case '5':
        case 'A':
        case 'D':
            return key;
        case 'B':
            return 'A';
        case 'C':
            return 'B';
        default:
            return String(parseInt(key,10)-1);
    }
}

let currentNum: string = '5';
for (let line of lines) {
    const directions = line.split('');
    // for each direction go up, right, left, or down
    for (let direction of directions){
        switch(direction){
            case 'U':
                currentNum = up(currentNum);
                break;
            case 'D':
                currentNum = down(currentNum);
                break;
            case 'R':
                currentNum = right(currentNum);
                break;
            case 'L':
                currentNum = left(currentNum);
                break;
        }
        //console.log(`line ${lines.indexOf(line)},direction: ${direction},currentNum: ${currentNum}`);
    }
    console.log(currentNum);
}