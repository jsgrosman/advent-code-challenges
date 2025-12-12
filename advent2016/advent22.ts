import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const diskHash: Map<string, number[]> = new Map<string, number[]>();
    const availableSizes: number[] = [];
    const usedSizes: number[] = [];

    let count = 0;

    // /dev/grid/node-x0-y0     89T   67T    22T   75%
    for (let line of lines) {
        const result = line.match(/x(\d+)\-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)/);
        if (result) {
            const coord = `x${result[1]},y${result[2]}`;
            const totalSize = Number(result[3]);
            const usedSize = Number(result[4]);
            const availSize = Number(result[5]);
            const userPercentage = Number(result[6]);

            diskHash.set(coord, [usedSize, availSize]);

            availableSizes.push(availSize);
            usedSizes.push(usedSize);
            if (usedSize !== 0 && availSize >= usedSize) {
                count--;
            }

        }
    }

    availableSizes.sort((a,b) => a - b);
    usedSizes.sort( (a,b) => a - b);
    console.log(usedSizes);
    console.log(availableSizes);


    for (let s of usedSizes) {
        if (s === 0) {
            continue;
        }
        for (let i = availableSizes.length - 1; i >= 0; i--) {
            if (s <= availableSizes[i]) {
                count++;
            } else {
                break;
            }
        }
    }

    console.log(`Answer 1: ${count}`);

};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);


};

part1();
// part2();