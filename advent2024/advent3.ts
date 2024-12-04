import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();

    const results = Array.from(contents.matchAll(/mul\((\-?\d+),(\-?\d+)\)/g));
    const sum = results.reduce( (p, c) => p + (+c[1] * +c[2]), 0);
    console.log(sum);

};


const part2 = () => {
    const contents = getFileContents();

    const sum = Array.from(contents.matchAll(/mul\((\-?\d+),(\-?\d+)\)|don?'?t?\(\)/g)).reduce( ([sum,enabled], [instr, mult1, mult2]) => {
        if (instr === 'do()') {
            return [sum, true];
        } else if (instr === 'don\'t()') {
            return [sum, false];
        } else if (enabled) {
            return [+sum + (+mult1 * +mult2), enabled];
        } else {
            return [sum,enabled];
        }
    }, [0, true])[0];
    console.log(sum);
};

part1();
part2();