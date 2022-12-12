
const getValue = (memory: number[], index: number, mode: string ) => {
    return mode === '0' ? memory[memory[index]] : memory[index];
}

const ADD = (memory: number[], pointer: number, modes: string) => {
    const value1 = getValue(memory, pointer + 1, modes.charAt(2));
    const value2 = getValue(memory, pointer + 2, modes.charAt(1));
    const destIndex = memory[pointer + 3];

    // console.log(`Adding ${value1} + ${value2} into ${destIndex}`); 
    memory[destIndex] = value1 + value2;
}

const MULTIPLY = (memory: number[], pointer: number, modes: string) => {
    const value1 = getValue(memory, pointer + 1, modes.charAt(2));
    const value2 = getValue(memory, pointer + 2, modes.charAt(1));
    const destIndex = memory[pointer + 3];

    // console.log(`Multiplying ${value1} * ${value2} into ${destIndex}`); 
    memory[destIndex] = value1 * value2;
}

const INPUT = (memory: number[], pointer: number, value: number) => {
    const destIndex = memory[pointer + 1];

    // console.log(`Putting ${value} into ${destIndex}`); 
    memory[destIndex] = value;
}

export const runIntcode = (memory: number[], inputValues: number[] = []) => {
    const outputValues: number[] = [];

    instructionLoop:
    for (let pointer = 0; pointer < memory.length;) {
        const instruction = String(memory[pointer]).padStart(5, '0');
        // console.log(instruction);
        const opCode = instruction.slice(-2);
        const modes = instruction.slice(0, -2);
        switch (opCode) {
            case '99':  // END 
                break instructionLoop;
            case '01':  // ADD
                ADD(memory, pointer, modes);
                pointer += 4;
                break;
            case '02': // MULTIPLY
                MULTIPLY(memory, pointer, modes);
                pointer += 4;
                break;
            case '03': // INPUT
                const nextInput = inputValues.length > 0 ? inputValues.shift()! : -1;
                INPUT(memory, pointer,  nextInput);
                pointer += 2;
                break;
            case '04': // OUTPUT    
                const output = getValue(memory, pointer + 1, modes.charAt(2));
                outputValues.push(output);
                // console.log(output);
                pointer += 2;
                break;
            case '05': // JUMP-IF-TRUE     
                getValue(memory, pointer + 1, modes.charAt(2)) !== 0 ? 
                    pointer = getValue(memory, pointer + 2, modes.charAt(1)) :
                    pointer += 3;
                break;
            case '06': // JUMP-IF-FALSE     
                getValue(memory, pointer + 1, modes.charAt(2)) === 0 ? 
                    pointer = getValue(memory, pointer + 2, modes.charAt(1)) :
                    pointer += 3;
                break;             
            case '07': { // LESS THAN
                const value1 = getValue(memory, pointer + 1, modes.charAt(2));
                const value2 = getValue(memory, pointer + 2, modes.charAt(1));
                const destIndex = memory[pointer + 3];
                value1 < value2 ? memory[destIndex] = 1 : memory[destIndex] = 0;
                pointer += 4;
                break; 
            }
            case '08': { // EQUALS
                const value1 = getValue(memory, pointer + 1, modes.charAt(2));
                const value2 = getValue(memory, pointer + 2, modes.charAt(1));
                const destIndex = memory[pointer + 3];
                value1 == value2 ? memory[destIndex] = 1 : memory[destIndex] = 0;
                pointer += 4;
                break; 
            }   
            default: 
                console.error(`Invalid Instruction: ${instruction}`);
                break instructionLoop;
        }
    }

    return outputValues;
}

