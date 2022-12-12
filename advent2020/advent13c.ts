import { getFileContents, getNeigborValues } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

const startTime = Number(lines[0]);
const busIds = lines[1].split(',');

// console.dir(busIds);

const indexOfMaxValue = busIds.reduce((iMax, cell, i, arr) => {
    return cell !== 'x' && Number(cell) > Number(arr[iMax]) ? i : iMax }
    , 0);
const maxValue = Number(busIds[indexOfMaxValue]);

console.log(`${indexOfMaxValue}, ${maxValue}`);

let startDeparture = startTime;
for (;;startDeparture++) {
    if (startDeparture % 39811 === 0) {
        break;
    }
}
console.log(`starting at ${startDeparture}`);

const indexMap = new Map<number, number>()
for (let busIndex = 0; busIndex < busIds.length; busIndex++) {
    if (busIds[busIndex] !== 'x') {
        indexMap.set(busIndex, Number(busIds[busIndex]));
    }
}
console.dir(indexMap);
// console.log(busIds.length);



endLoop:
for (let departure = startDeparture; ;departure += 39811) {

    const multiple = departure / maxValue;

    const startingDeparture = departure - indexOfMaxValue;
    // if (departure % 41 === 0) {
        
    //     console.log(departure / 41);
    // }
    
    console.log(`Testing ${departure} => ${maxValue} * ${multiple} `);
    
    for (let [busIndex, busId] of indexMap.entries()) {
        if ( (startingDeparture + busIndex) % busId !== 0) {
            continue endLoop;
        }
    }
   

    console.debug(`result = ${startingDeparture}`);
    break;

}