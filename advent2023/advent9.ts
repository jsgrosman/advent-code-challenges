import { getFileContents } from "../Utils";


const part1 = () => {

    const processLine = (currentSeq: number[]): number => {
        const nextLineSeq: number[] = [];

        for (let index = 0; index < currentSeq.length - 1; index++) {
            nextLineSeq.push(currentSeq[index + 1] - currentSeq[index]);
        }

        if (nextLineSeq.filter( v => v === 0).length === nextLineSeq.length) {
            return currentSeq[currentSeq.length - 1];
        } else {
            return currentSeq[currentSeq.length - 1] + processLine(nextLineSeq);
        }
    }

    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    let total = 0;
    for (const line of lines) {
        const sequence = line.split(/\s+/).map(Number);
        total += processLine(sequence);;
    }
    console.log(`sum of next values: ${total}`);

};


const part2 = () => {
    const processLine = (currentSeq: number[]): number => {
        const nextLineSeq: number[] = [];

        for (let index = 0; index < currentSeq.length - 1; index++) {
            nextLineSeq.push(currentSeq[index + 1] - currentSeq[index]);
        }

        if (nextLineSeq.filter( v => v === 0).length === nextLineSeq.length) {
            return currentSeq[0];
        } else {
            return currentSeq[0] - processLine(nextLineSeq);
        }
    }

    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    let total = 0;
    for (const line of lines) {
        const sequence = line.split(/\s+/).map(Number);
        total += processLine(sequence);;
    }
    console.log(`sum of previous values: ${total}`);
};

part1();
part2();