import { getFileContents, getNeigborValues } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

const startTime = Number(lines[0]);
const busIds = lines[1].split(',');

// console.dir(busIds);

const indexOfMaxValue = busIds.reduce((iMax, cell, i, arr) => {
    return cell !== 'x' && Number(cell) > Number(arr[iMax]) ? i : iMax }
    , 0);
// console.log(`${indexOfMaxValue}, ${busIds[indexOfMaxValue]}`);


endLoop:
for (let departure = 100000000000511; ;departure += Number(busIds[indexOfMaxValue])) {

    const startingDeparture = departure - indexOfMaxValue;

    console.log(`Testing ${departure}`);
    for (let busIndex = 0; busIndex < busIds.length; busIndex++) {
        if (busIds[busIndex] !== 'x') {
            const busId = Number(busIds[busIndex]);
            // console.log(`${departure + busIndex} / ${busId}`);
            if ( (startingDeparture + busIndex) % busId !== 0) {
                continue endLoop;
            }
        }
    }

    console.debug(`result = ${departure}`);
    break;

}