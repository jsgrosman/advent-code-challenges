interface point {
    x: number,
    y: number
}

const startingCode = 20151125;

const generateNext = (num: number) => {
    return (num * 252533) % 33554393;
}

const generateDiagonals = (num: number) => {
    const result: point[] = [];


    for (let y = num, x = 1; y >= 1; y--, x++) {
            result.push( {x, y});
    }

    return result;
}

// console.dir(generateDiagonals(4));

// console.log(generateNext(20151125));

const destX = 3075;
const destY = 2981;

let step = 1;
let currentCode = startingCode;
endLoop:
while (true) {

    const diagonals = generateDiagonals(step);

    for (let p of diagonals) {
        if (p.x === destX && p.y === destY) {
            break endLoop;
        }

        currentCode = generateNext(currentCode);
    }

    step++;

}




console.log(`Answer: ${currentCode}`);