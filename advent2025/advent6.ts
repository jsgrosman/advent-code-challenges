import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const operations: string[] = lines[lines.length - 1].split(/\s+/);
    const answers: number[] = operations.map( (v) => v === "+" ? 0 : 1);

    for (let row = 0; row < lines.length - 1; row++) {
        const values = lines[row].trim().split(/\s+/).map(Number);
        for (let col = 0; col < values.length; col++) {
            if (operations[col] === '+') {
                answers[col] += values[col];
            } else {
                answers[col] *= values[col];
            }
        }
    }

    const result = answers.reduce( (p,c) => p + c, 0);
    console.log(`Answer 1: ${result}`);

};


const part2 = () => {
    const contents = getFileContents();

    const lines = contents.split(/\n/g);

    const operations: string[] = [];
    const answerCols: number[] = [];
    const opRow = lines[lines.length - 1];
    for (let i = 0; i < opRow.length; i++) {
        if (opRow.charAt(i) !== ' ') {
            operations.push(opRow.charAt(i));
            answerCols.push(i);
        }
    }
    answerCols.push(opRow.length + 1);

    let result = 0;
    for (let i = 0; i < answerCols.length - 1; i++) {
        const startIndex = answerCols[i];
        const endIndex = answerCols[i + 1];
        const oper = operations[i];

        let value = oper === '+' ? 0 : 1;
        for (let col = startIndex; col < endIndex - 1; col++) {
            let term = '';
            for (let row = 0; row < lines.length - 1; row++) {
                term += lines[row][col];
            }
            if (oper === '+') {
                value += Number(term);
            } else {
                value *= Number(term);
            }
        }
        result += value;
    }
   
    console.log(`Answer 2: ${result}`);
};

part1();
part2();