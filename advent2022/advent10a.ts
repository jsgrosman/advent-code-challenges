import { getFileContents } from "../Utils";

const contents = getFileContents().trim().split(/\n/g);

let pixelPointer = 0;
let total = 0;
let regX = 1;
let instrBuffer: number[] = [];

let cycleNumber = 1;

do {
    const instr = contents.shift();
    if (instr) {
        if (instr === 'noop') {
            instrBuffer.unshift(0);
        } else {
            const [_, value] = instr.split(' ', 2);
            instrBuffer.unshift(Number(value), 0);
    
        }
    }

    process.stdout.write(pixelPointer >= regX - 1 && pixelPointer <= regX + 1 ? '█' : ' ');
    if (++pixelPointer % 40 === 0) {
        process.stdout.write('\n');
        pixelPointer = 0;
    }

    regX +=  instrBuffer.pop()!;
    cycleNumber++;

    if ([20, 60, 100, 140, 180, 220].includes(cycleNumber)) {
        total += (cycleNumber * regX);
    }
} while (instrBuffer.length > 0);

console.log(`Sum of Signal Strengths: ${total}`);
