import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();

    const results = Array.from(contents.matchAll(/mul\((\-?\d+),(\-?\d+)\)/g));
    const sum = results.reduce( (p, c) => p + (+c[1] * +c[2]), 0);
    console.log(sum);

};


const part2 = () => {
    const contents = getFileContents();
    const results = Array.from(contents.matchAll(/mul\((\-?\d+),(\-?\d+)\)|don?\'?t?/g));

    let doMult = true;
    const sum = results.reduce( (p, c) => {
        if (c[0] === 'do') {
            doMult = true;
        } else if (c[0] === 'don\'t') {
            doMult = false;
        } else if (doMult) {
            return p + (+c[1] * +c[2]);
        } 
        return p;
    }, 0);
    console.log(sum);
};

part1();
part2();