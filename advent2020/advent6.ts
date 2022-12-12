import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);
lines.push('');

let result = 0;
const answerMap = new Map<string, number>();
let groupSize = 0;
for (let line of lines) {
    if (line.trim() === '') {
        // solve
        // console.dir(answerMap);
        // console.log(`group size: ${groupSize}`)
        for (let ansNum of answerMap.values()) {
            if (ansNum === groupSize) {
                result++;
            }
        }

        // clear
        answerMap.clear();
        groupSize = 0;
    }
    else {
       line.split('').forEach( (v) => {
            if (answerMap.has(v)) {
                answerMap.set(v, answerMap.get(v)! + 1)
            } else {
                return answerMap.set(v, 1);
            }
       });
       groupSize++;
    }
}

console.log(`Result: ${result}`);