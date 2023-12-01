import { getFileContents } from "../Utils";

const contents = getFileContents();
const exclusions = contents.trim().split(/\n/g);

const MAX = 9;

exclusions.sort( (a, b) => {
    const [aStart] = a.split('-', 1);
    const [bStart] = b.split('-', 1);

    return Number(aStart) - Number(bStart);
});
console.dir(exclusions);


let oldEnd = -1;
let allowedCount = 0

for (let index = 0; index < exclusions.length; index++) {

    const rule = exclusions[index];
    const [start, end] = rule.split('-').map(Number);
    if (oldEnd === -1 || start <= oldEnd + 1) {
        oldEnd = Math.max(oldEnd, end);
    } else {
        // console.log(`Minimum ${oldEnd + 1}`);
        for (let a = oldEnd + 1; a < start; a++) {
            console.log(`Allowing ${a}`);
            allowedCount++;
        }
        oldEnd = end;
       // break;
    }
}

for (let a = oldEnd + 1; a <= MAX; a++) {
    console.log(`Allowing ${a}`);
    allowedCount++;
}

console.log(`Allowed: ${allowedCount}`);
