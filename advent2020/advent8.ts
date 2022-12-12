import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);
// console.dir(lines);

let accumulator = 0;

for (let i = 0; i < lines.length; i++) {
    accumulator = 0;

    let newLine = lines[i];
    if (newLine.includes('nop')) {
        newLine = newLine.replace('nop', 'jmp');
    } else if (newLine.includes('jmp')) {
        newLine = newLine.replace('jmp', 'nop');
    }

    const program = [...lines.slice(0, i), newLine, ...lines.slice(i+1)];
    
    const visitedLines: number[] = [];
    let infiniteLoop = false;
    for (let lineNumber = 0; lineNumber < program.length;) {

        if (visitedLines.includes(lineNumber)) {
            infiniteLoop = true;
            break;
        } else {
            visitedLines.push(lineNumber);
        }

        const [instruction, value] = program[lineNumber].split(' ', 2);

        switch (instruction) {
            case 'nop':
                lineNumber++;
                break;
            case 'acc':
                accumulator += parseInt(value, 10);
                lineNumber++;
                break;
            case 'jmp':
                lineNumber += parseInt(value, 10);
                break;        
        }
    }

    if (!infiniteLoop) {
        break;
    }
}

console.debug(accumulator);