import * as fs from "fs";
import * as yargs from "yargs";
import { point, line } from "../Utils";


const args = yargs.options({
    'file': { type: 'string', demandOption: true, alias: 'f' },
  }).argv;

  const fullFilePath = `${process.cwd()}/${args['file']}`;

if (!fs.existsSync(fullFilePath)) {
    console.error("No such file: " + fullFilePath);
}

const contents = fs.readFileSync(fullFilePath, 'utf8');
const [line1, line2] = contents.trim().split(/\n/g, 2);


interface pointWithDistance{
    x: number;
    y: number;
    dist: number;
};


const wire1 = line1.split(',');
const wire2 = line2.split(',');



const isBetween = (a: number, b: number, c: number) =>  {
    return (c > Math.min(a, b)) && (c < Math.max(a,b))
};


const generateLineSegments = (wirePath: string[]) => {
    let totalDistance = 0;
    let currentPoint: point  = {x: 0, y: 0};
    const horiz: line[] = [];
    const vert: line[] = [];
    wirePath.forEach( (v) => {
        const nextPoint = Object.assign({}, currentPoint);
        const dir = v.charAt(0);
        const dist = parseInt(v.substring(1), 10);
        totalDistance += dist;
        switch (dir) {
            case 'U':
                nextPoint.y += dist;
                vert.push({
                    start: currentPoint,
                    end: nextPoint,
                    dist: totalDistance,
                });
                break;
            case 'D':
                nextPoint.y -= dist;
                vert.push({
                    start: currentPoint,
                    end: nextPoint,
                    dist: totalDistance,
                });
                break;
            case 'L':
                nextPoint.x -= dist;
                horiz.push({
                    start: currentPoint,
                    end: nextPoint,
                    dist: totalDistance,
                });
                break;
            case 'R':
                nextPoint.x += dist;
                horiz.push({
                    start: currentPoint,
                    end: nextPoint,
                    dist: totalDistance,
                });
                break;
        }
        currentPoint = Object.assign({}, nextPoint);
    });

    return [horiz, vert];
};


const [horiz1, vert1] = generateLineSegments(wire1);
const [horiz2, vert2] = generateLineSegments(wire2);
const matches: pointWithDistance[] = [];

// console.dir(horiz1);
// console.dir(vert1);
// console.dir(horiz2);
// console.dir(vert2);


// check horiz against vert
for (let h = 0; h < horiz1.length; h++) {
    for (let v = 0; v < vert2.length; v++) {
        if (isBetween(horiz1[h].start.x, horiz1[h].end.x, vert2[v].start.x) &&
        isBetween(vert2[v].start.y, vert2[v].end.y, horiz1[h].start.y)
        ) {
            const intersection = {
                x: vert2[v].start.x,
                y: horiz1[h].start.y,
                dist: horiz1[h].dist + vert2[v].dist - Math.abs(vert2[v].end.y - horiz1[h].start.y) - Math.abs(horiz1[h].end.x - vert2[v].start.x),
            }
            matches.push(intersection);
            // console.debug(`MATCH: ${intersection.x}, ${intersection.y}`);
        }
    }
}

// check vert against horiz
for (let v = 0; v < vert1.length; v++) {
    for (let h = 0; h < horiz2.length; h++) {
        if (isBetween(vert1[v].start.y, vert1[v].end.y, horiz2[h].start.y) &&
        isBetween(horiz2[h].start.x, horiz2[h].end.x, vert1[v].start.x)
        ) {
            const intersection = {
                x: vert1[v].start.x,
                y: horiz2[h].start.y,
                dist: horiz2[h].dist + vert1[v].dist - Math.abs(vert1[v].end.y - horiz2[h].start.y) - Math.abs(horiz2[h].end.x - vert1[v].start.x),
            }
            matches.push(intersection);
            // console.debug(`MATCH: ${intersection.x}, ${intersection.y}`);
        }
    }
}

console.dir(matches);
let minDist = Number.MAX_VALUE;

matches.forEach( (v) => {
    minDist = Math.min(v.dist, minDist);
});
console.log(minDist);