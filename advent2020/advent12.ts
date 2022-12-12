import * as fs from "fs";
import yargs = require('yargs');

const args = yargs.options({
    'file': { type: 'string', demandOption: true, alias: 'f' },
  }).argv;
  
const fullFilePath = `${process.cwd()}/${args['file']}`;

if (!fs.existsSync(fullFilePath)) {
    console.error("No such file: " + fullFilePath);
}
const contents = fs.readFileSync(fullFilePath, 'utf8');
const directions = contents.trim().split(/\n/g);

const turnR90 = (facing: string) => {
    switch (facing) {
        case 'N':
            return 'E';
        case 'E':
            return 'S';
        case 'S':
            return 'W';
        case 'W':
            return 'N';        
    }
    return facing;
}

const turnL90 = (facing: string) => {
    switch (facing) {
        case 'N':
            return 'W';
        case 'E':
            return 'N';
        case 'S':
            return 'E';
        case 'W':
            return 'S';        
    }
    return facing;
}


const result = directions.reduce( (p, v) => {
//    console.dir(p);

    let heading = v.charAt(0);
    const distance = parseInt(v.replace(/\w/, ''), 10);

    switch (heading) {
        case 'N':
            p.waypointVert += distance;
            break;
        case 'E':
            p.waypointHoriz += distance;
            break;
        case 'S':
            p.waypointVert -= distance;
            break;
        case 'W':
            p.waypointHoriz -= distance;
            break;
        case 'R':
            for (let i = 0; i < distance / 90; i++) {
                const tempHoriz = p.waypointHoriz;
                p.waypointHoriz = p.waypointVert;
                p.waypointVert = -tempHoriz;
            } 
            break;
        case 'L':
            for (let i = 0; i < distance / 90; i++) {
                const tempHoriz = p.waypointHoriz;
                p.waypointHoriz = -p.waypointVert;
                p.waypointVert = tempHoriz;
            } 
            break;
        case 'F':
            for (let i = 0; i < distance; i++) {
                p.vert += p.waypointVert;
                p.horiz += p.waypointHoriz;
            }
            break;
            
    }

    return p;

}, {vert: 0, horiz: 0, waypointVert: 1, waypointHoriz: 10, facing: 'E'})   

console.dir(result);
console.log(Math.abs(result.horiz) + Math.abs(result.vert));