import { getFileContents } from "../Utils";

const contents = getFileContents().trim().split(/\n/g);

let pixelBuffer: string[] = [];
let pixelPointer = 0;
let total = 0;
let regX = 1;
let instrBuffer: number[] = [];

let cycleNumber = 1;
for (let instr of contents) {
    if (instr === 'noop') {
        instrBuffer.unshift(0);
    } else {
        const [_, value] = instr.split(' ', 2);
        instrBuffer.unshift(Number(value), 0);

    }
}

while (instrBuffer.length > 0) {
    pixelBuffer.push(pixelPointer >= regX - 1 && pixelPointer <= regX + 1 ? '█' : ' ');
    if (++pixelPointer % 40 === 0) {
        console.log(pixelBuffer.join(''));
        pixelBuffer = [];
        pixelPointer = 0;
    }

    regX +=  instrBuffer.pop()!;
    cycleNumber++;

    if ([20, 60, 100, 140, 180, 220].includes(cycleNumber)) {
        total += (cycleNumber * regX);
    }
}

console.log(`Sum of Signal Strengths: ${total}`);
