import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    let ranges: number[][] = [];
    let ingredients: number[] = [];

    for (let line of lines) {
        if (line.includes('-')) {
           ranges.push(line.split('-', 2).map(Number));
        } else if (line != '') {
            ingredients.push(Number(line));
        }
    }

    ranges.sort( ([aStart, aEnd], [bStart, bEnd]) => aStart - bStart);

    let newRanges: number[][] = [ranges.shift()!];
    while (ranges.length > 0) {
        const [start1, end1] = newRanges.pop()!;
        const [start2, end2] = ranges.shift()!;
        if (start2 <= end1) {
            newRanges.push([Math.min(start1,start2),Math.max(end1, end2)]);
        } else {
            newRanges.push([start1,end1], [start2,end2]);
        }
    }
    ranges = newRanges;

    let count = 0;
    for (let ingr of ingredients) {
        for (const [start, end] of ranges) {
            if (ingr >= start && ingr <= end) {
                count++;
                break;
            } 
        }
    }
    console.log(`Answer 1: ${count}`);
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    let ranges: number[][] = [];

    for (let line of lines) {
        if (line.includes('-')) {
           ranges.push(line.split('-', 2).map(Number));
        } 
    }

    ranges.sort( ([aStart, aEnd], [bStart, bEnd]) => aStart - bStart);

    let newRanges: number[][] = [ranges.shift()!];
    while (ranges.length > 0) {
        const [start1, end1] = newRanges.pop()!;
        const [start2, end2] = ranges.shift()!;
        if (start2 <= end1) {
            newRanges.push([Math.min(start1,start2),Math.max(end1, end2)]);
        } else {
            newRanges.push([start1,end1], [start2,end2]);
        }
    }
    ranges = newRanges;

    const count = ranges.reduce( (p, [start, end]) => p + (end - start) + 1, 0);
    console.log(`Answer 2: ${count}`);

};

part1();
part2();