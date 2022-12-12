import { getFileContents } from "../Utils";

const contents = getFileContents();
const freqs = contents.trim().split(/\n/g).map( (v) => parseInt(v, 10) )

const foundFreqs: number[] = [0];

let keepGoing = true;
while (keepGoing) {

    for (let freq of freqs) {
        const result = foundFreqs[foundFreqs.length - 1] + freq;
        if (foundFreqs.includes(result)) {
            console.log(result);
            keepGoing = false;
            break;
        } 
        foundFreqs.push(result);
    }
}