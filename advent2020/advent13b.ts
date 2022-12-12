import { getFileContents, getNeigborValues } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);
const condense = lines[1].replace(/x,/g,'').replace(/,x/g,'');
const busIdCondense = lines[1].split(',').filter( (v) => v !== 'x').map(Number);


const startTime = Number(lines[0]);
const busIds = lines[1].split(',');

console.dir(busIds);
console.dir(busIdCondense);

const indexOfMaxValue = busIds.reduce((iMax, cell, i, arr) => {
    return cell !== 'x' && Number(cell) > Number(arr[iMax]) ? i : iMax }
    , 0);
// console.log(`${indexOfMaxValue}, ${busIds[indexOfMaxValue]}`);


const yes: boolean[] = [];
let busIndex = 0;
let start = 0;
const num = Math.floor(100000000000000/41);
let kTry = num;
for (let k = num; busIndex < busIdCondense.length-1; ){
    const n = busIdCondense[busIndex];
    console.log(`n: ${n}`);
    const m = busIdCondense[busIndex+1];
    console.log(`m: ${m}`);
    const indexOfN = busIds.indexOf(String(n));
    const indexOfM = busIds.indexOf(String(m));
    const spaceBetween = indexOfM - indexOfN;
    console.log(`x: ${spaceBetween}`);
    const possibleBusId1 = k * n;
    console.log(`possibleBusId1: ${possibleBusId1} + ${spaceBetween}`);
    const possibleBusId2 = spaceBetween + possibleBusId1; //doesn't work
    console.log(`possibleBusId2: ${possibleBusId2}`);
    const t = possibleBusId2 / m;
    if (busIndex == 0){
        start = possibleBusId1;
        kTry ++;
    }
    if (Math.floor(t) == t){
        busIndex ++;
        k = t;
    }
    else {
        busIndex = 0;
        k = kTry + 1;
    }
    console.log(`start: ${start}`);
}

// const num1 = 824973984;
// const num2 = 19;
// const num3 = num1 + num2;
// console.log(`sum test: ${num3}`);

