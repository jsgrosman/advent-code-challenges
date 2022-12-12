import { getNeigborValues, getNeigborPoints, print2dArr } from "../Utils";


const target = 265149;
const size = 11;

let spiral: number[][] = [];

for (let i = 0; i < size; i++) {

    spiral[i] = new Array<number>(size);
    spiral[i] = spiral[i].fill(0);
}

let currentX = Math.floor(size / 2);
let currentY = Math.floor(size / 2);

spiral[currentY][currentX] = 1;
print2dArr(spiral);



// right, up, left, down
let currentDir = 'RIGHT';
let lengthOfCurrentDirection = 1;
let currentStepsAlongDirection = 0;
let numberOfTimesInCurrentDirection = 0;

for (let i = 0; i < (size * size - 1); i++) {
    // console.log(`y,x ${currentY}, ${currentX} ${currentDir}`);
    // console.log(`l: ${lengthOfCurrentDirection}, c: ${currentStepsAlongDirection}, n: ${numberOfTimesInCurrentDirection}`);

    currentStepsAlongDirection++;
    
    switch (currentDir) {
        case 'RIGHT':
            currentX++;
            spiral[currentY][currentX] = getNeigborValues(currentY, currentX, spiral, true).reduce( (p, v) => p + v);
            if (currentStepsAlongDirection >= lengthOfCurrentDirection) {
                currentDir = 'UP';
                currentStepsAlongDirection = 0;
            }
            break;
        case 'UP':
            currentY--;
            spiral[currentY][currentX] = getNeigborValues(currentY, currentX, spiral, true).reduce( (p, v) => p + v);
            if (currentStepsAlongDirection >= lengthOfCurrentDirection) {
                currentDir = 'LEFT';
                currentStepsAlongDirection = 0;
                lengthOfCurrentDirection++;
            }
            break;
        case 'LEFT':
            currentX--;
            spiral[currentY][currentX] = getNeigborValues(currentY, currentX, spiral, true).reduce( (p, v) => p + v);
            if (currentStepsAlongDirection >= lengthOfCurrentDirection) {
                currentDir = 'DOWN';
                currentStepsAlongDirection = 0;
            }
            break;
        case 'DOWN':
            currentY++;
            spiral[currentY][currentX] = getNeigborValues(currentY, currentX, spiral, true).reduce( (p, v) => p + v);
            if (currentStepsAlongDirection >= lengthOfCurrentDirection) {
                currentDir = 'RIGHT';
                currentStepsAlongDirection = 0;
                lengthOfCurrentDirection++;
            }
            break;
        default:
            console.log('huh?');
    }

    if (spiral[currentY][currentX] > target) {
        console.log(`FOUND IT: ${spiral[currentY][currentX]}`);
        break;
    }



}
print2dArr(spiral);


// for (let i = 3, j = 1; i <= 515; i += 2, j++) {

//     // get lower corner
//     const lowerCorner = i*i;
//     console.log(`lower corner = ${lowerCorner}`);
//     console.log(`number of steps = ${j} left, ${j} up`);

//     if (lowerCorner > target) {
       
//         const previousCorner = (i - 2) * (i -2);
//         console.log(`Previous corner ${previousCorner}`);
        
//         // for (let k = previousCorner + 1; k <= lowerCorner; k++) {
//         //     console.log(`${k} ${k === target?'*':''}`);
//         //     if (k % (i-1) == 0) {
//         //         console.log('----');
//         //     }
            
//         // }
        
//         break;


//     }

    
// }
// // 265149 - 264968

// // 181 + 257