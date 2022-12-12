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

interface instruction {
    name: string,
    register: string,
    offset: number,
};

const programList: instruction[] = [];

for (let line of lines) {
    const lineList: string[] = line.split(' ');
    const nameVar = lineList[0];
    let registerVar = '';
    let offsetVar = 0;
    if (/[-+]\d+/.test(lineList[1])){
        offsetVar = parseInt(lineList[1],10);
    }
    else {
        registerVar = lineList[1].substring(0,1);
    }
    if (lineList[2]) {
        offsetVar = parseInt(lineList[2],10);
    }
    const inst: instruction = {
        name: nameVar,
        register: registerVar,
        offset: offsetVar,
    };
    programList.push(inst);
}

const registers: { [key: string] : number} = {
    'a': 1,
    'b': 0
};

// console.dir(registers);
// const check = 'a';
// const check2 = programList[0].register;
// const whatAmI = registers[check2];
// console.log(whatAmI % 2);
//console.log(registers[check2]%2);

for (let i = 0; i < programList.length;){

    console.dir(programList[i]);
    console.log(i);
    const nameName = programList[i].name;
    const regReg = programList[i].register;
    // console.log(registers[regReg]);
    const offOff = programList[i].offset;
    if (nameName == 'jmp'){
        i += offOff;
    }
    else if (nameName == 'jio'){
        if (registers[regReg] == 1){
            i += offOff;
        }
        else {
            i ++;
        }
    }
    else if (nameName == 'jie'){
        if (registers[regReg]%2 == 0){
            i += offOff;
        }
        else {
            i ++;
        }
    }
    else if (nameName == 'hlf'){
        registers[regReg] = registers[regReg]/2;
        i ++;
    }
    else if (nameName == 'tpl'){
        registers[regReg] = registers[regReg]*3;
        i ++;
    }
    else if (nameName == 'inc'){
        registers[regReg] ++;
        i ++;
    }
    else{
        i ++;
    }

    console.dir(registers);
}

console.dir(registers);