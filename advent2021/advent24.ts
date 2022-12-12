import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);


interface unaryInstruction {
    type: 'unary'
    name: 'inp',
    register: string,
};

interface variableInstruction {
    type: 'variable'
    name: 'add' | 'mul' | 'div' | 'mod' | 'eql',
    register1: string,
    register2: string,
};

interface numberInstruction {
    type: 'number'
    name: 'add' | 'mul' | 'div' | 'mod' | 'eql',
    register1: string,
    register2: number,
};

type instruction = unaryInstruction | variableInstruction | numberInstruction;

const instructionList: instruction[] = [];
const digitMap = new Map<number, instruction[]>();
let currentDigit = 0;
let currentInstructions: instruction[] | undefined = undefined;
for (let line of lines) {
    const lineList: string[] = line.split(' ');

    switch (lineList[0]) {
        case 'inp': {
            if (currentInstructions !== undefined) {
                digitMap.set(currentDigit++, currentInstructions);
            }
            currentInstructions = [];
            currentInstructions.push({
                type: 'unary',
                name: 'inp',
                register: lineList[1]
            });
            break;
        }
       case 'add':
       case 'mul':
       case 'div':
       case 'mod':
       case 'eql': {
            if (/-?\d+/.test(lineList[2])) {
                currentInstructions!.push({
                    type: 'number',
                    name: lineList[0],
                    register1: lineList[1],
                    register2: Number(lineList[2])
                });
            } else {
                currentInstructions!.push({
                    type: 'variable',
                    name: lineList[0],
                    register1: lineList[1],
                    register2: lineList[2]
                });
            }
            
            break;
        }
    }
}
if (currentInstructions !== undefined) {
    digitMap.set(currentDigit, currentInstructions);
}
// console.dir(digitMap, {depth: null});

const getKey = (digit: number, registers:{ [n: string]: number }) => {
    return `|${digit}|${registers['w']}|${registers['x']}|${registers['y']}|${registers['z']}|`;
}

const executeDigit = (digit: number, registers:  { [n: string]: number }, inputArray: string[]) => {
    const instructionList = digitMap.get(digit)!;
    for (let instruction of instructionList) {
        switch (instruction.name) {
            case 'inp': {
                registers[instruction.register] = Number(inputArray.shift());
                break;
            }
            case 'add': {
                if (instruction.type === 'number') {
                    registers[instruction.register1] = registers[instruction.register1] + instruction.register2;
                } else {
                    registers[instruction.register1] = registers[instruction.register1] + registers[instruction.register2];
                }
                break;
            }
            case 'mul': {
                if (instruction.type === 'number') {
                    registers[instruction.register1] = registers[instruction.register1] * instruction.register2;
                } else {
                    registers[instruction.register1] = registers[instruction.register1] * registers[instruction.register2];
                }
                break;
            }
            case 'div': {
                if (instruction.type === 'number') {
                    registers[instruction.register1] = Math.trunc(registers[instruction.register1] / instruction.register2);
                } else {
                    registers[instruction.register1] = Math.trunc(registers[instruction.register1] / registers[instruction.register2]);
                }
                break;
            }
            case 'mod': {
                if (instruction.type === 'number') {
                    registers[instruction.register1] = registers[instruction.register1] % instruction.register2;
                } else {
                    registers[instruction.register1] = registers[instruction.register1] % registers[instruction.register2];
                }
                break;
            }
            case 'eql': {
                if (instruction.type === 'number') {
                    registers[instruction.register1] = registers[instruction.register1] === instruction.register2 ? 1 : 0;
                } else {
                    registers[instruction.register1] = registers[instruction.register1] === registers[instruction.register2] ? 1 : 0;
                }
                break;
            }
        }
    }
}
const execute = (input: number, w = 0, x = 0, y = 0, z = 0) => {

    const registers: { [n: string]: number } = {
        'w': w,
        'x': x,
        'y': y,
        'z': z,
    }

    const inputArray = String(input).split('');

    for (let [digit, instructionList] of digitMap.entries()) {
        executeDigit(digit, registers, inputArray);
    }

    return registers;
} 

// for (let MONAD = 99999999999999; MONAD > 10000000000000; MONAD--) {
//     if (!/0/.test(String(MONAD))) {
//         const results = execute(MONAD);
//         console.log(MONAD);
//         if (results['z'] === 0) {
//             break;
//         }
//     }

// }

// console.log(execute(13));
// console.log(execute(26));
// console.log(execute(16));

/*
m = 1, z = 8
m = 2, z = 9
m = 3, z = 10
m = 4, z = 11
m = 5, z = 12
m = 6, z = 13
m = 7, z = 14
m = 8, z = 15
m = 9, z = 16
*/


for (let z = 0; z < 26; z++) {
    for (let m = 1; m < 10; m++) {
        const result = execute(m, m, 0, 0, z);
        if  (result['z'] >= 8 && result['z'] <= 16) {
            console.log(`m = ${m}, z = ${z}`);
        }
    }
}


/*
    
    digit1
    x = (z % 26) + 10 
    x = 1
    y = 26



*/


// console.dir(execute(13579246899999));
