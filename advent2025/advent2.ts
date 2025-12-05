import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const ranges = contents.trim().split(/,/g);

    let total = 0;
    for (let range of ranges) {
        let [start, end] = range.split('-').map(Number);

        const idsInRange = Array(end - start + 1).fill(start).map((x, y) => x + y);
        const rangeTotal = idsInRange.filter( idNum => {
            const idToCheck = new String(idNum);
            const window = Math.floor(idToCheck.length / 2);
            return idToCheck.substring(0, window) == idToCheck.substring(window)
        }).reduce( (p, v) => p + v, 0);
        total += rangeTotal;
        
    }
    console.log(`Answer 1: ${total}`);

};


const part2 = () => {
    const contents = getFileContents();
    const ranges = contents.trim().split(/,/g);

    let total = 0;
    for (let range of ranges) {
        let [start, end] = range.split('-').map(Number);

        NEXT_ID:
        for (let idNum = start; idNum <= end; idNum++) {
            const idToCheck = new String(idNum);
            const largestWindow = Math.floor(idToCheck.length / 2);
            for (let window = largestWindow; window > 0; window--) {
                if (idToCheck.length % window === 0) {                
                    const pattern = idToCheck.substring(0, window);
                    if (pattern.repeat(idToCheck.length / window) == idToCheck) {
                        total += idNum;
                        continue NEXT_ID;
                    }
                }                
            }
        }
    }
    console.log(`Answer 2: ${total}`);
};

part1();
part2();