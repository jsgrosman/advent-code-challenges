import { getFileContents } from "../Utils";

let directions = getFileContents().trim();

directions = directions.replace(/se,sw/g, 's');
directions = directions.replace(/sw,se/g, 's');
directions = directions.replace(/ne,nw/g, 'n');
directions = directions.replace(/nw,ne/g, 'n');


let verticalDistance = 0;
let horizontalDistance = 0;

for (let dir of directions.split(',')) {

    if (dir.includes('n')) {
        verticalDistance++;
    } else if (dir.includes('s')) {
        verticalDistance--;
    }

    if (dir.includes('e')) {
        horizontalDistance++;
    } else if (dir.includes('w')) {
        horizontalDistance--;
    }

}

const absoluteVert =  Math.abs(verticalDistance);
const absoluteHoriz = Math.abs(horizontalDistance);

console.log(`ah: ${absoluteHoriz}, av: ${absoluteVert}`);

let dist = absoluteHoriz + Math.max(0, (absoluteVert - absoluteHoriz));
console.log(`Distance = ${dist}`);