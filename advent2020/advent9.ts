import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

const isSum = (goal: number, arr: number[]) => {

    arr.sort( (a, b) => a - b);
    for (let index = 0; index < arr.length; index++) {

        const entry1 = arr[index];
    
        for (let sumIndex = arr.length - 1; sumIndex > index; sumIndex--) {
            const entry2 = arr[sumIndex];
            if (entry1 + entry2 < goal) {
                continue;
            }
            if (entry1 + entry2 === goal) {
                return true;
            }
        }
    }

    return false;
}

const windowSize = 25;
const XMAS: number[] = [];
const allNums: number[] = [];
let result = 0;

for (let line of lines) {
    
    allNums.push(Number(line));

    if (XMAS.length < windowSize) {
        XMAS.push(Number(line));
    } else {
        const goalNumber = Number(line);
        if (!isSum(goalNumber, [...XMAS])) {
            console.log(`result: ${goalNumber}`);
            result = goalNumber;
            break;
        } else {
            XMAS.shift();
            XMAS.push(goalNumber);
        }
    }
}


endLoop:
for (let startingIndex = 0; startingIndex < allNums.length;) {
    for (let endingIndex = 1; endingIndex < allNums.length;) {
        const subArray = allNums.slice(startingIndex, endingIndex);
        console.dir(subArray);
        const sum = subArray.reduce( (p, v) => p + v, 0);
        console.log(sum);
        if (sum === result) {
            subArray.sort( (a,b) => a - b);

            console.log(`${subArray[0]} + ${subArray[subArray.length - 1]} = ${subArray[0] + subArray[subArray.length - 1]}`);
            break endLoop;
        } else if (sum < result) {
            endingIndex++;
        } else {
            startingIndex++;
        }

    }
}
