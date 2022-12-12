import { getFileContents } from "../Utils";

const instructions = getFileContents().trim().split(/\n+/);

const registers: Map<string, number> = new Map<string, number>();

let maxValue = 0;
for (let instr of instructions) {

    // b inc 5 if a > 1
    const [reg, operation, value, stmt, compareReg, compareOperation, compareValue] = instr.split(' ', 7);
    // console.log(`${reg}, ${operation}, ${value}, ${stmt}, ${compareReg}, ${compareOperation}, ${compareValue}`);

    let regValue = registers.has(reg) ? registers.get(reg)! : 0;
    let compareRegValue = registers.has(compareReg) ? registers.get(compareReg)! : 0;

    switch (compareOperation) {
        case '>':
            if (compareRegValue > Number(compareValue)) {
                regValue = operation === 'inc' ? regValue + Number(value) : regValue - Number(value);
            }
            break;
        case '<':
            if (compareRegValue < Number(compareValue)) {
                regValue = operation === 'inc' ? regValue + Number(value) : regValue - Number(value);
            }
            break;  
        case '>=':
            if (compareRegValue >= Number(compareValue)) {
                regValue = operation === 'inc' ? regValue + Number(value) : regValue - Number(value);
            }
            break; 
        case '<=':
            if (compareRegValue <= Number(compareValue)) {
                regValue = operation === 'inc' ? regValue + Number(value) : regValue - Number(value);
            }
            break; 
        case '==':
            if (compareRegValue == Number(compareValue)) {
                regValue = operation === 'inc' ? regValue + Number(value) : regValue - Number(value);
            }
            break; 
        case '!=':
            if (compareRegValue != Number(compareValue)) {
                regValue = operation === 'inc' ? regValue + Number(value) : regValue - Number(value);
            }
            break; 
        default:
            break;    
    }

    maxValue = Math.max(maxValue, regValue);
    registers.set(reg, regValue);

}

// console.dir(registers);
const maxValueAtEnd = Array.from(registers.values()).reduce( (p, v) => Math.max(p, v));
console.log(`Max Value At End = ${maxValueAtEnd}`);
console.log(`Max Value ever = ${maxValue}`);