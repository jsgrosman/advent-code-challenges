import { getFileContents, point } from "../Utils";


const part1 = () => {
   
    interface node {
        x: number;
        y: number;
        path: string[];
    }

    // const codes = ['029A', '980A', '179A', '456A', '379A'];
    // const codes = ['029A'];
    const codes =['083A','935A','964A','149A','789A'];

    const numericKeypad:string[][] = [
        ['X', 'X', 'X', 'X', 'X'],
        ['X', '7', '8', '9', 'X'],
        ['X', '4', '5', '6', 'X'],
        ['X', '1', '2', '3', 'X'],
        ['X', 'X', '0', 'A', 'X'],
        ['X', 'X', 'X', 'X', 'X'],
    ];

    const arrowKeypad:string[][] = [
        ['X', 'X', 'X', 'X', 'X'],
        ['X', 'X', '^', 'A', 'X'],
        ['X', '<', 'v', '>', 'X'],
        ['X', 'X', 'X', 'X', 'X'],
    ];
        
    const memo: Map<string, number> = new Map<string, number>();
    const moveKeypad = (start: string, end: string, depth: number, keypad:string[][]) => {
        if (memo.has(`${start},${end},${depth}`)) {
            return memo.get(`${start},${end},${depth}`)!;
        }

        let startLoc = {x: 0, y: 0};
        let endLoc = {x: 0, y: 0};
        for (let row = 0; row < keypad.length; row++) {
            for (let col = 0; col < keypad[row].length; col++) {
                if (keypad[row][col] === start) {
                    startLoc = {x:col,y:row};
                }
                if (keypad[row][col] === end) {
                    endLoc = {x:col,y:row};
                }
            }
        }

        const NEXT: node[] = [];
        NEXT.push({x: startLoc.x, y: startLoc.y, path: []});
       
        let minPath = Number.MAX_SAFE_INTEGER;
        while (NEXT.length > 0) {
            const currentKey = NEXT.pop()!;

            if (currentKey.x == endLoc.x && currentKey.y === endLoc.y) {
                // console.log(currentKey.path.join('') + 'A');
                if (depth === 0) {
                    minPath = Math.min(minPath, currentKey.path.length + 1);
                } else {
                    let totalSteps = 0;
                    const pathArr = ['A', ...currentKey.path, 'A'];
                    for (let i = 0; i < pathArr.length - 1; i++) {
                        totalSteps += moveKeypad(pathArr[i], pathArr[i+1], depth - 1, arrowKeypad);
                    }
                    minPath = Math.min(minPath, totalSteps);
                }

            } else {
                const dirX = Math.sign(endLoc.x - currentKey.x);
                const dirY =  Math.sign(endLoc.y - currentKey.y);
                for (const [dx, dy] of [[dirX, 0], [0, dirY]]) {
                    if (dx !== 0 || dy !== 0) {
                        const nextKey = keypad[currentKey.y + dy][currentKey.x + dx];
                        if (nextKey !== 'X') {   
                            const dirString = dx === 1 ? '>' : dx === -1 ? '<' : dy === 1 ? 'v' : '^';
                            NEXT.push({x: currentKey.x + dx, y: currentKey.y + dy, path: [...currentKey.path, dirString]});
                        }
                    }
                }
            }
        }

        memo.set(`${start},${end},${depth}`, minPath);
        return minPath;
     }


    let complexity = 0;
    for (let code of codes) {
        let totalSteps = 0;
        const codeArr = ['A', ...code.split('')];
        for (let i = 0; i < codeArr.length - 1; i++) {
            totalSteps += moveKeypad(codeArr[i], codeArr[i+1], 25, numericKeypad);
        }
        console.log(`${code} ${totalSteps}`);
        complexity += Number(code.substring(0, code.length - 1)) * totalSteps;
    }
    console.log(`complexity = ${complexity}`);

};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);


};

part1();
// part2();
