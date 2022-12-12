import { getFileContents } from "../Utils";

const stream = getFileContents().trim().split('');

let inGarbage = false;
let depth = 0;
let score: number = 0;
let garbageCount: number = 0;
for (let i = 0; i < stream.length; i++) {

    switch (stream[i]) {
        case '!': 
            i++;
            break;
        case '<':
            if (inGarbage) {
                garbageCount++;
            }
            inGarbage = true;
            break;
        case '>':
            inGarbage = false;
            break;
        case '{':
            if (!inGarbage) {
                depth++;
            }  else {
                garbageCount++;
            }
            break;
        case '}':
            if (!inGarbage) {
                score += depth;
                depth--;
            } else {
                garbageCount++;
            }
            break;
        default:
            if (inGarbage) {
                garbageCount++;
            }
            break;    
    }

}

console.log(`score: ${score}`);
console.log(`garbage: ${garbageCount}`);