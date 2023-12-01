
const NUM_ELVES = 3017957;


function highestOneBit(value: number): number {
    if (value <= 0) {
        return 0;
    }

    let result = 1;

    while (value > 1) {
        value >>>= 1; // Right shift the bits to the right
        result <<= 1; // Left shift the result to the left
    }

    return result;
}


const getSafePosition = (n: number) => {
	// find value of L for the equation
	const valueOfL = n - highestOneBit(n);
	return 2 * valueOfL  + 1;
}

console.log(getSafePosition(NUM_ELVES));

// let happyElves = [...Array(NUM_ELVES + 1).keys()];
// happyElves = happyElves.filter( (v, i) => {
//     return i % 2 === 1;
// });

// while (happyElves.length > 1) {
//     console.log(happyElves);

//     if (happyElves.length % 2 === 0) {
//         happyElves = happyElves.filter( (v, i) => {
//             return i % 2 === 0;
//         });
//     } else {
//         happyElves = happyElves.filter( (v, i) => {
//             return i % 2 === 1;
//         });
//     }
// }
// console.log(happyElves);

// let currentStep = 2;
// let count = 0;
// while (count++ < 5) {
//     console.dir(happyElves);
//     console.log(currentStep);

//     let i = happyElves.length;
//     while (i--) {
//         (i + 1) % currentStep === 0 && (happyElves.splice(i, 1));
//     }

//     if (happyElves.length == 1) {
//         break;
//     }

//     currentStep = currentStep * 2;
// }
// console.log(happyElves);


// const sadElves: number[] = [];
// let currentElf = 0;

// while (true) {

//     let nextElf = (currentElf + 1) % NUM_ELVES;
//     while (sadElves.includes(nextElf)) {
//         nextElf = (nextElf + 1) % NUM_ELVES;
//     }
//     console.log(`Sad Elf: ${nextElf + 1} Remaining Elves = ${NUM_ELVES - sadElves.length}`);
//     sadElves.push(nextElf);

//     if (sadElves.length === NUM_ELVES - 1) {
//         console.log(`Winner Elf: ${currentElf + 1}`);
//         break;
//     }


//     nextElf = (nextElf + 1) % NUM_ELVES;
//     while (sadElves.includes(nextElf)) {
//         nextElf = (nextElf + 1) % NUM_ELVES;
//     }
//     currentElf = nextElf;
// }

// currentElf = 0;
// let currentStep = 2;
// let numSadElves = 0;
// while (true) {

//     for (currentElf = currentStep; currentElf < NUM_ELVES; currentElf += currentStep) {
//         numSadElves++;
//     }

//     currentStep *= 2;
// }

