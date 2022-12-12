import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

let currentMask = lines[0];
const memoryLocations = new Map<string, number>()

const updateMemoryLocations = (locIndex: number, memLoc: string, value: number) => {

    // console.log(memLoc);
    if (locIndex === memLoc.length) {
        memoryLocations.set(String(parseInt(memLoc, 2)), value);
    } else {
        if (memLoc.charAt(locIndex) !== 'X') {
            updateMemoryLocations(locIndex + 1, memLoc, value);
        } else {

            updateMemoryLocations(locIndex + 1, memLoc.substr(0, locIndex) + '0' + memLoc.substr(locIndex + 1), value);
            updateMemoryLocations(locIndex + 1, memLoc.substr(0, locIndex) + '1' + memLoc.substr(locIndex + 1), value);
        }
    }
    // console.dir(memoryLocations);
}


for (let line of lines) {
    if (line.startsWith('mask')) {
        currentMask = line.split(' = ')[1];
        // console.log(currentMask);
    }
    else if (line.startsWith('mem')) {
        const matches = line.match(/mem\[(\d+)\] = (\d+)/) || [];

        const memLocation = Number(matches[1]).toString(2).padStart(currentMask.length, '0')
        const memValue = Number(matches[2]);

        let newMemLocation = '';
        for (let maskIndex = 0; maskIndex < currentMask.length; maskIndex++) {
            if (currentMask.charAt(maskIndex) === '0') {
                newMemLocation += memLocation.charAt(maskIndex);
            } else {
                newMemLocation += currentMask.charAt(maskIndex);
            }
        }
        updateMemoryLocations(0, newMemLocation, memValue);
        
    }

}

const sum = Array.from(memoryLocations.values()).reduce( (v, p) => v + p, 0);
console.log(sum);