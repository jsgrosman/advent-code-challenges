import { getFileContents } from "../Utils";
import { init, Context } from "z3-solver";


const part1 = () => {
    type node = {
        xorValue: number;
        buttonPushes: number;
    };

    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    let answer = 0;
    let lineNo = 0;

    // [.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
    for (let line of lines) {
        const goal = line.substring(line.indexOf('[') + 1, line.indexOf(']'));
        const bitLength = goal.length;
        const targetNumber = parseInt(goal.split('').map( (v) => v === '.' ? '0' : 1).join(''), 2);

        const buttons: number[] = [];
        
        let currentIndex = line.indexOf('(');
        while (currentIndex != -1) {
            let nextIndex = line.indexOf(')', currentIndex);
            const buttonPresses = line.substring(currentIndex + 1, nextIndex).split(',').map(Number);

            const buttonArray: string[] = Array(bitLength).fill("0");
            for (let b of buttonPresses) {
                buttonArray[b] = "1";
            }
            const buttonValue = parseInt(buttonArray.join(''), 2);
            buttons.push(buttonValue);
 
            currentIndex = line.indexOf('(', nextIndex);
        }
        // console.dir(buttons);


        
        const visited: Set<number> = new Set<number>();
        const queue: node[] = buttons.map(v => { return {
            xorValue: v ^ 0,
            buttonPushes: 1
        };});     

        while (queue.length > 0) {
            const nextAttempt = queue.shift()!;
            if (nextAttempt.xorValue === targetNumber) {
                answer += nextAttempt.buttonPushes;
                console.log(`Line ${lineNo}: found!`);
                break;
            }

            for (let b of buttons) {
                const newVal = b ^ nextAttempt.xorValue;
                if (!visited.has(newVal)) {
                    visited.add(newVal);
                    queue.push({
                        xorValue: newVal,
                        buttonPushes: nextAttempt.buttonPushes + 1
                    });
                }
            }
        }
        lineNo++;
    }
    console.log(`Answer 1: ${answer}`);

};


const part2 = async () => {
    type node = {
        buttons: number[];
        current: number;
        buttonPushes: number;
    };


    const solve = async (lineNum: number, buttons: number[][], goal: number[]) => {
        let { Context } = await init();
        let ctx = Context(`aoc${lineNum}`);
        let opt = new ctx.Optimize();

        const nButtons = buttons.length;
        const nDims = goal.length;

        const xs = buttons.map((_, i) => {
            const v = ctx.Int.const(`x_${i}`);
            opt.add(v.ge(0)); // non-negative presses
            return v;
        });

        for (let dim = 0; dim < nDims; dim++) {
            let sum: any = ctx.Int.val(0);
            for (let i = 0; i < nButtons; i++) {
                const coeff = ctx.Int.val(buttons[i][dim]);
                sum = sum.add(xs[i].mul(coeff));
            }
            opt.add(sum.eq(goal[dim]));
        }

        const totalPresses = xs.reduce((p, v) => p.add(v), ctx.Int.val(0));
        opt.minimize(totalPresses);

        const result = await opt.check();

        const model = opt.model();

        let answer = 0;
        xs.forEach((x, i) => {
            const val = model.get(x);
            answer += Number(val);
            // console.log(`Button ${i}: ${val.toString()}`);
        });
        return answer;
    }
  
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    let answer = 0;
    let lineNo = 0;
    for (let line of lines) {

        const goal = line.substring(line.indexOf('{') + 1, line.indexOf('}')).split(',').map(Number);
        const bitLength = goal.length;

        const buttons: number[][] = [];

        let currentIndex = line.indexOf('(');
        while (currentIndex != -1) {
            let nextIndex = line.indexOf(')', currentIndex);
            const buttonPresses = line.substring(currentIndex + 1, nextIndex).split(',').map(Number);

            const buttonArray: number[] = Array(bitLength).fill(0);
            for (let b of buttonPresses) {
                buttonArray[b] = 1;
            }
            buttons.push(buttonArray);
 
            currentIndex = line.indexOf('(', nextIndex);
        }

        const a = await solve(lineNo, buttons, goal);
        console.log(`${lineNo}: ${a}`);
        answer += a;
        lineNo++;
        
    }
    console.log(`Answer 2: ${answer}`);

};

// part1();
part2();