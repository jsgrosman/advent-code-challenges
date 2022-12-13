import { getFileContents } from "../Utils";
    
const contents = getFileContents().trim().split(/\n/g);

// Return -1, if they're in the correct order
// Return 1, if they're in reverse order
// Return 0 if we don't know yet
const comparePacketValues = (left: any, right: any): number => {
    if (Number.isInteger(left) && Number.isInteger(right)) {
        return left - right;
    } else if (Number.isInteger(left) && Array.isArray(right)) {
        left = [left];
    } else if (Array.isArray(left) && Number.isInteger(right)) {
        right = [right];
    }
    // now they should both be arrays
    for (let index = 0; index < left.length; index++) {
        // left is longer than right, so inputs are NOT in the right order
        if (index >= right.length) {
            return 1;
        } else {
            const result = comparePacketValues(left[index], right[index]);
            if (result !== 0) { // packets don't match
                return result;
            } // otherwise, continue to next index
        }
    }
    if (left.length === right.length) {
        return 0;
    } else {
        return -1;
    }
}

const allPackets: any[] = [];

let sum = 0;
let packetIndex = 0;
for (let lineNum = 0; lineNum < contents.length; lineNum += 3) {
    packetIndex++;

    const packet1 = JSON.parse(contents[lineNum]);
    const packet2 = JSON.parse(contents[lineNum + 1]);
    const result = comparePacketValues(packet1, packet2);
    if (result < 0) {
        sum += packetIndex;
    }

    allPackets.push(packet1, packet2);
    
}
const divider1 = [[2]];
const divider2 = [[6]];

allPackets.push(divider1, divider2);
allPackets.sort( comparePacketValues );
const indexOfDivider1 = allPackets.indexOf(divider1) + 1;
const indexOfDivider2 = allPackets.indexOf(divider2) + 1;

console.log(`sum of correctly ordered pairs: ${sum}`);
console.log(`decoder key: ${indexOfDivider1 * indexOfDivider2}`);
