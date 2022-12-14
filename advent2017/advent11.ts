import { getFileContents } from "../Utils";

let directions = getFileContents().trim();



let verticalDistance = 0;
let horizontalDistance = 0;

const getDistance = () => {
    const absoluteVert =  Math.abs(verticalDistance);
    const absoluteHoriz = Math.abs(horizontalDistance);
    return absoluteHoriz + Math.max(0, (absoluteVert - absoluteHoriz)/2);
}

let maxDistance = 0;
for (let dir of directions.split(',')) {

    switch (dir) {
        case 'n':
            verticalDistance += 2;
            break;
        case 's':
            verticalDistance -= 2;
            break;
        case 'ne':
            horizontalDistance += 1;
            verticalDistance += 1;
            break;
        case 'nw':
            horizontalDistance -= 1;
            verticalDistance += 1;
            break;
        case 'se':
            horizontalDistance += 1;
            verticalDistance -= 1;
            break;        
        case 'sw':
            horizontalDistance -= 1;
            verticalDistance -= 1;
            break;
    }

    maxDistance = Math.max(maxDistance, getDistance());
}

console.log(`Distance = ${getDistance()}`);
console.log(`Max: ${maxDistance}`);