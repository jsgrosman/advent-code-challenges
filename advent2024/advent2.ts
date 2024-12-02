import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    let compareIncreasing = (a: number[]) => 
        a.every((val, i) => i === a.length - 1 || (val < a[i + 1] && Math.abs(a[i + 1] - val) <= 3));
    

    let compareDecreasing = (a: number[]) => 
        a.every((val, i) => i === a.length - 1 || (val > a[i + 1] && Math.abs(a[i + 1] - val) <= 3));
    

    let numSafe = 0;
    for (let line of lines) {
        const levels = line.split(/\s+/).map(Number);
        if (compareIncreasing(levels) || compareDecreasing(levels)) {
            numSafe++;
            continue;
        }
    }   
      

    console.log(`num safe: ${numSafe}`);

};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    let compareIncreasing = (a: number[]) => 
        a.every((val, i) => i === a.length - 1 || (val < a[i + 1] && Math.abs(a[i + 1] - val) <= 3));
    

    let compareDecreasing = (a: number[]) => 
        a.every((val, i) => i === a.length - 1 || (val > a[i + 1] && Math.abs(a[i + 1] - val) <= 3));

    let numSafe = 0;
    for (let line of lines) {
        const levels = line.split(/\s+/).map(Number);
        if (compareIncreasing(levels) || compareDecreasing(levels)) {
            numSafe++;
            continue;
        }
        for (let i = 0; i < levels.length; i++) {
            const newLevels = levels.toSpliced(i, 1);
            if (compareIncreasing(newLevels) || compareDecreasing(newLevels)) {
                numSafe++;
                break;
            }
        }
    }
      

    console.log(`num safe: ${numSafe}`);


};

// part1();
part2();