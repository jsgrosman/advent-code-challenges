import { getFileContents } from "../Utils";

let scanners = getFileContents().trim().split(/\n/g).map( v => v.split(': ', 2).map( v => Number(v)));

let delay = 0;
MAIN_LOOP:
while (true) {
    delay++;

    for (const scanner of scanners) {
        const [layer, depth] = scanner;
        const frequency = (2 * depth) - 2;
        if ((layer + delay) % frequency === 0) {
            continue MAIN_LOOP;
        }
    }

    console.log(`delay for severity at 0: ${delay}`);
    break;
    
}


