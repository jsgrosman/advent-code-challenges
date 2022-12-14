
const NUM_STEPS = 380;
const NUM_ROUNDS = 50000000;

const buffer = [0];

let valueAfter0 = 0;
let positionOf0 = 0;
let currentPosition = 0;
for (let round = 1; round <= NUM_ROUNDS; round++) {

    currentPosition = (currentPosition + NUM_STEPS) % round + 1;

    if (currentPosition === 1) {
        valueAfter0 = round;
    }

    // buffer.splice(currentPosition, 0, round);
    //console.log(`- ${buffer.join(' ')}`);

}

console.log(`Value = ${valueAfter0}`)

// // const surround = buffer.slice(currentPosition - 3, currentPosition + 4);
const surround = buffer.slice(0, 6);
console.dir(surround);
