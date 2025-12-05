import { getFileContents } from "../Utils";

const mod = (n: number, d:number) => ((n % d) + d) % d;

const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const [_, answer] = lines.reduce( ([cur,count], instr) => {
        const [dir, rotateNum] = [instr[0] === 'R' ? 1 : -1, +instr.substring(1)];
        return [mod(cur + (rotateNum * dir), 100), mod(cur + (rotateNum * dir), 100) === 0 ? count + 1 : count];
    }, [50, 0]);

    console.log(`Part 1 Answer: ${answer}`);
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const [_, answer] = lines.reduce( ([cur,count], instr) => {
        let [dir, rotateNum, c] = [instr[0] === 'R' ? 1 : -1, +instr.substring(1) % 100, Math.floor(+instr.substring(1) / 100) ];
        let next = mod(cur + (rotateNum * dir), 100);
        console.log(`${cur} => ${next} (${instr})`);
        if (cur !== 0 && instr[0] === 'R' && next <= cur) {
            c++;
        } else if (cur !== 0 && instr[0] === 'L' && next >= cur) {
            c++;
        }
        
        return [next, count + c];
    }, [50, 0]);

    console.log(`Part 2 Answer: ${answer}`);
    
};

part1();
part2();