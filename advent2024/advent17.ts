import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const registers: Map<string,number> = new Map<string,number>();

    registers.set('A', +lines[0].split(': ', 2)[1]);
    registers.set('B', +lines[1].split(': ', 2)[1]);
    registers.set('C', +lines[2].split(': ', 2)[1]);

    let combo = (value: number) => {
        switch (value) {
            case 0:
            case 1:
            case 2:
            case 3:
                return value;
            case 4:
                return registers.get('A')!;
            case 5:
                return registers.get('B')!; 
            case 6:
                return registers.get('B')!;           
            default:
                return -1;
        }
    }

    const program: number[] = lines[4].split(': ', 2)[1].split(',').map(Number);
    // console.dir(program);
    // console.dir(registers);

    let instrPointer = 0;

    while (instrPointer < program.length) {
        const opCode = program[instrPointer];
        const operand = program[instrPointer + 1];

        switch (opCode) {
            case 0: { //adv
                const numerator = registers.get('A')!;
                const denominator = Math.pow(2, combo(operand));
                const result = Math.trunc(numerator/denominator);
                registers.set('A', result);
                instrPointer += 2;
                break;
            }
            case 1: { //bxl
                registers.set('B', registers.get('B')! ^ operand);
                instrPointer += 2;
                break;
            }
            case 2: { //bst
                registers.set('B', combo(operand) % 8);
                instrPointer += 2;
                break;
            }
            case 3: { //jnz
                if (registers.get('A')! !== 0) {
                    instrPointer = operand;
                } else {
                    instrPointer += 2;
                }
                break;
            }
            case 4: { //bxc
                registers.set('B', registers.get('B')! ^ registers.get('C')!);
                instrPointer += 2;
                break;
            }
            case 5: { //out
                process.stdout.write(`${combo(operand) % 8},`);
                instrPointer += 2;
                break;
            }
            case 6: { //bdv
                const numerator = registers.get('A')!;
                const denominator = Math.pow(2, combo(operand));
                const result = Math.trunc(numerator/denominator);
                registers.set('B', result);
                instrPointer += 2;
                break;
            }
            case 7: { //cdv
                const numerator = registers.get('A')!;
                const denominator = Math.pow(2, combo(operand));
                const result = Math.trunc(numerator/denominator);
                registers.set('C', result);
                instrPointer += 2;
                break;
            }
        }
    }

    process.stdout.write("\n");
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const registers: Map<string,bigint> = new Map<string,bigint>();

    registers.set('A', BigInt(+lines[0].split(': ', 2)[1]));
    registers.set('B', BigInt(+lines[1].split(': ', 2)[1]));
    registers.set('C', BigInt(+lines[2].split(': ', 2)[1]));
    const program: number[] = lines[4].split(': ', 2)[1].split(',').map(Number);


    let combo = (value: number, A: bigint, B: bigint, C: bigint) => {
        switch (value) {
            case 0:
            case 1:
            case 2:
            case 3:
                return BigInt(value);
            case 4:
                return A;
            case 5:
                return B;
            case 6:
                return C; 
            default:
                return -1n;
        }
    }

    const calculate = (A: bigint) => {
        const output: number[] = [];

        let B = 0n;
        let C = 0n;
        
        while (true) {
            B = A % 8n; // 2 4 bst A mod 8
            B = B ^ 1n; // 1 1 bxl (if even, add one. Otherwise, subtract one)
            C = A / (2n ** B); // 7 5 cdv - A divided by 2^B
            A = A / (2n ** 3n); // 0 3 A divided by 8
            B = B ^ 4n; // 1 4 bxc B ^ 4
            B = B ^ C; // 4 5 bxc B ^ C
            output.push(Number(B % 8n)); // 5 5 out
            if (A === 0n) { // 3 0 jnx
                break;
            }
        }
        
        return output;
    }
    
    

    const execute = (program: number[], A: bigint, B: bigint, C: bigint) => {
        let instrPointer = 0;

        const output: number[] = [];
        while (instrPointer < program.length) {
            const opCode = program[instrPointer];
            const operand = program[instrPointer + 1];

            switch (opCode) {
                case 0: { //adv
                    const numerator = A;
                    const denominator = BigInt(2) ** combo(operand, A, B, C);
                    const result = BigInt.asIntN(64, numerator/denominator);
                    A = result;
                    instrPointer += 2;
                    break;
                }
                case 1: { //bxl
                    B = B ^ BigInt(operand);
                    instrPointer += 2;
                    break;
                }
                case 2: { //bst
                    B = combo(operand,A,B,C) % BigInt(8);
                    instrPointer += 2;
                    break;
                }
                case 3: { //jnz
                    if (A !== BigInt(0)) {
                        instrPointer = operand;
                    } else {
                        instrPointer += 2;
                    }
                    break;
                }
                case 4: { //bxc
                    B = B ^ C;
                    instrPointer += 2;
                    break;
                }
                case 5: { //out
                    output.push(Number(combo(operand, A, B, C) % BigInt(8)));
                    instrPointer += 2;
                    break;
                }
                case 6: { //bdv
                    const numerator = A
                    const denominator =  BigInt(2) ** combo(operand, A, B, C);
                    const result = BigInt.asIntN(64, numerator/denominator);
                    B = result;
                    instrPointer += 2;
                    break;
                }
                case 7: { //cdv
                    const numerator = A;
                    const denominator =  BigInt(2) ** combo(operand, A, B, C);
                    const result = BigInt.asIntN(64, numerator/denominator);
                    C = result;
                    instrPointer += 2;
                    break;
                }
            }
        }
        return output;
    }

    const isEqual = (a: unknown[], b: unknown[]): boolean => {
        if (a.length !== b.length) return false
       
        return a.every((item, index) => item === b[index])
    }

    let dfs = (A: bigint, B: bigint, C: bigint, program: number[], digit: number, ADigits: number[]) => {
        // console.log(ADigits.join(''));

        if (digit < 0) {
            return true;
        }

        for (let i = 0n; i < 8n; i++) {
            let output = calculate(A + i);
            
            if (output[0] === program[digit]) {
                const newA = A + i << 3n;
                // console.log(`newA = ${newA}`);
                ADigits.push(Number(i));
                if (dfs(newA, B, C, program, digit - 1, ADigits)) {
                    return true;
                }
                ADigits.pop();
            }
        }
        return false;
    }
    
    console.log(program);
    const ADigits:number[] = [];
    if (dfs(0n, registers.get('A')!, registers.get('B')!, program, program.length - 1, ADigits)) {
        console.log(parseInt(ADigits.join(''), 8));
    }

    registers.set('A', BigInt(parseInt(ADigits.join(''), 8)));
    const result = execute(program, registers.get('A')!, registers.get('B')!, registers.get('C')!);
    console.dir(result);
};

// part1();
part2();