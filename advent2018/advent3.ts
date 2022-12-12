import { getFileContents } from "../Utils";

const contents = getFileContents();
const claims = contents.trim().split(/\n/g);

const locations: number[][][] = [];
const locationsStr: string[][] = [];
const allCoords: number[][] = [];
const allCoordsStr: string[] = [];

for (let claim of claims) {
    const claimList = claim.split(': ');
    const startCoord = claim.split(' ')[2];
    console.dir(startCoord);
    const size = claimList[1].split('x');
    console.dir(size);
    const startHoriz = Number(startCoord.split(',')[0]);
    const startVert = Number(startCoord.split(',')[1].split(':')[0]);
    const coordinates: number[][] = [];
    const coordinatesStr: string[] = [];
    const sizeHoriz = Number(size[0]);
    const sizeVert = Number(size[1]);
    for (let i = 0; i < sizeHoriz; i ++){
        for (let b = 0; b < sizeVert; b ++){
            const coord = [startHoriz+i,startVert+b];
            const coordStr = String(coord.join(','));
            coordinates.push(coord);
            coordinatesStr.push(coordStr);
            allCoords.push(coord);
            allCoordsStr.push(coordStr);
        }
    }
    locations.push(coordinates);
    locationsStr.push(coordinatesStr);
}

//console.dir(allCoords);
const uniqueCoords: number [][] = [];
const uniqueCoordsStr: string[] = [];
const overlapCoords: number[][] = [];
const overlapCoordsStr: string[] = [];

for (let location of locations){
    //console.dir(location);
    for (let coord of location){
        //console.dir(coord);
        //console.log(uniqueCoords.indexOf(coord));
        if (uniqueCoords.indexOf(coord) == -1){
            uniqueCoords.push(coord);
            //console.log('unique');
        }
        else if (!overlapCoords.indexOf(coord) || overlapCoords.indexOf(coord) == 0){
            overlapCoords.push(coord);
        }
    }
}
for (let location of locationsStr){
    //console.dir(location);
    for (let coord of location){
        //console.dir(coord);
        //console.log(uniqueCoordsStr.indexOf(coord));
        if (uniqueCoordsStr.indexOf(coord) == -1){
            uniqueCoordsStr.push(coord);
            //console.log('unique');
        }
        else if (!overlapCoordsStr.indexOf(coord) || overlapCoordsStr.indexOf(coord) == 0){
            overlapCoordsStr.push(coord);
        }
    }
}
//console.dir(uniqueCoords);
console.dir(uniqueCoordsStr);

const overlaps = overlapCoords.length;
const overlapsStr = overlapCoordsStr.length;
//console.log(overlaps);
console.log(overlapsStr);