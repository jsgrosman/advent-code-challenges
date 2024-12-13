import { getFileContents } from "../Utils";


const solve = (offset: number) => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    //  (b2 c1 − b1 c2) / (b2 a1 − b1 a2)
    const doSolveForA = (A1: number, B1: number, C1: number, A2: number, B2: number, C2: number) => ((B2 * C1) - (B1 * C2)) / ((B2 * A1) - (B1 * A2));

    //  (c1 a2 − c2 a1) / (b2 a1 − b1 a2)
    const doSolveForB= (A1: number, B1: number, C1: number, A2: number, B2: number, C2: number) => ((C2 * A1) - (C1 * A2)) / ((B2 * A1) - (B1 * A2)); 

    let total = 0;
    for (let index = 0; index < lines.length; index +=4) {
        const [_1, A1, A2] = lines[index + 0].match(/Button A: X\+(\d+), Y\+(\d+)/)!;
        const [_2, B1, B2] = lines[index + 1].match(/Button B: X\+(\d+), Y\+(\d+)/)!;
        const [_3, C1, C2] = lines[index + 2].match(/Prize: X=(\d+), Y=(\d+)/)!;

        const A = doSolveForA(+A1, +B1, +C1 + offset, +A2, +B2, +C2 + offset);
        const B = doSolveForB(+A1, +B1, +C1 + offset, +A2, +B2, +C2 + offset);

        if (Math.floor(A) === A && Math.floor(B) === B) {
            total += (3 * A) + B;
        }
    }
    console.log(`Number of tokens: ${total}`);
};


solve(0);
solve(10000000000000);
