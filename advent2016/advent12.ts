import { getFileContents } from "../Utils";

const contents = getFileContents();
const instructions = contents.trim().split(/\n/g);


const registers: Map<string, number> = new Map<string, number>();
registers.set('a', 0);
registers.set('b', 0);
registers.set('c', 1);
registers.set('d', 0);



let count  = 0;

/*
cpy x y copies x (either an integer or the value of a register) into register y.
inc x increases the value of register x by one.
dec x decreases the value of register x by one.
jnz x y jumps to an instruction y away (positive means forward; negative means backward), but only if x is not zero.
*/

for (let index = 0; index < instructions.length; index++) {
    count++;

    const instruction = instructions[index];
    // console.log(`${index}: ${instruction}`);

    if (instruction.startsWith('cpy')) {
        const [_, x, y] = instruction.split(/\s+/, 3);

        if (x.match(/^\d+$/)) {
            registers.set(y, Number(x));
        } else {
            if (registers.has(x)) {
                registers.set(y, registers.get(x)!);
            } else {
                registers.set(y, 0);
            }
           
        }
    }

    if (instruction.startsWith('inc')) {
        const [_, x] = instruction.split(/\s+/, 2);
        registers.set(x, registers.get(x)! + 1);
    }

    if (instruction.startsWith('dec')) {
        const [_, x] = instruction.split(/\s+/, 2);
        registers.set(x, registers.get(x)! - 1);
    }

    if (instruction.startsWith('jnz')) {
        const [_, x, y] = instruction.split(/\s+/, 3);
        
        let valueOfX = 0;
        if (x.match(/^\d+$/)) {
            valueOfX = Number(x);
        } else {
            if (registers.has(x)) {
                valueOfX = registers.get(x)!;
            }
        }

        if (valueOfX !== 0) {
            index = index + Number(y) - 1;
            // console.log(`Jumping to ${index + 1} / a: ${registers.get('a')} b: ${registers.get('b')}`);
            continue;
        }
    }
    // console.dir(registers);

}

console.dir(registers);