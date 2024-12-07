import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const operators = [' + ', ' * '];


    let solve = ( expression: string, arr: number[], goal: number) => {

        if (arr.length === 1) {
            console.log(`Checking ${expression + arr[0] + ')'}`);
            if ( eval(expression + arr[0] + ')') === goal ) {
                return true;
            } else {
                return false;
            }
        } else {
            for (let op of operators) {
                if (solve(expression + arr[0] + ')' + op, arr.slice(1), goal)) {
                    return true;
                }
            }
        }
    }


    let total = 0;
    for (let line of lines) {
        const solution = +line.split(':', 1)[0];
        const terms = line.split(': ', 2)[1].split(/\s+/).map(Number);

        if (solve('('.repeat(terms.length), terms, solution)) {
            console.log(`${terms} = ${solution}`);
            total += solution;
        }        

    }

    console.log(total);



};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const operators = ['+', '*', '||'];

    let solve = ( expression: string[], arr: number[], currentIndex: number, goal: number) => {
        if (currentIndex === arr.length - 1) {   
            const newExp = [...expression, '' + arr[currentIndex]];

            let total = +newExp[0];
            for (let i = 1; i < newExp.length; i += 2) {
                if (newExp[i] === '+') {
                    total += +newExp[i + 1];
                } else if (newExp[i] === '*') {
                    total *= +newExp[i + 1];
                } else {
                    total = +(String(total) + newExp[i + 1])
                }

                // short circuit
                if (total > goal) {
                    return false;
                }
            }
            return total === goal;          
        } else {
            for (let op of operators) {
                if (solve([...expression, '' + arr[currentIndex], op], arr, currentIndex + 1, goal)) {
                    return true;
                }
            }
        }
    }


    let total = 0;
    for (let line of lines) {
        const solution = +line.split(':', 1)[0];
        const terms = line.split(': ', 2)[1].split(/\s+/).map(Number);
        if (solve([], terms, 0, solution)) {
            total += solution;
        }        
    }

    console.log(total);

};

// part1();
part2();