const A_START = 873;
const B_START = 583;
const COMPARE_COUNT = 5000000;

const generatorCycle = ( value: number, factor: number ) => value * factor % 2147483647;
const generatorA = ( value: number ) => generatorCycle(value, 16807);
const generatorB = ( value: number ) => generatorCycle(value, 48271);

let count = 0;
let a = A_START;
let b = B_START;
let compareA: number[] = [];
let compareB: number[] = []
let numberOfCompares = 0;
while (numberOfCompares < COMPARE_COUNT) {
    do {
        a = generatorA(a);
    } while (a % 4 !== 0);

    do {
        b = generatorB(b);
    } while (b % 8 !== 0);

    numberOfCompares++;
    // console.log(`${a} ${b}`);
    if ((a & 0xFFFF) === (b & 0xFFFF)) {
        console.log(`${numberOfCompares}: ${a} <=> ${b} -- ${count}`);
        count++;
    }
}

// console.dir(compareA);
// console.dir(compareB);

// for (a of compareA) {
//     b = compareB.shift() || 0;

//     // console.dir(`${a}       ${b}`);

//     if ((a & 0xFFFF) === (b & 0xFFFF)) {
//         count++;
//     }
// }

// const firstAResult = generatorA(A_START);
// const last16Bits = firstAResult & 0xFFFF;
// console.log(firstAResult.toString(2).padStart(32, '0'));
// console.log(last16Bits.toString(2).padStart(16, '0'));


console.log(`count = ${count}`);
