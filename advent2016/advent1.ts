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
const directions = contents.split(', ');

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

const locationMap = new Map<string, boolean>();
locationMap.set('0,0', true);

const addRouteToMap = (startX: number, startY: number, moveX: number, moveY: number) => {

    if (moveX > 0) {
        for (let x = startX + 1; x < startX + moveX; x++) {
            const key = `${x},${startY}`;
            if (locationMap.has(key)) {
                console.log(`Revisited: ${key}`);
            }

            locationMap.set(key, true);
        }
    }
    if (moveX < 0) {
        for (let x = startX - 1; x > startX + moveX; x--) {
            const key = `${x},${startY}`;
            if (locationMap.has(key)) {
                console.log(`Revisited: ${key}`);
            }

            locationMap.set(key, true);
        }
    }

    if (moveY > 0) {
        for (let y = startY + 1; y < startY + moveY; y++) {
            const key = `${startX},${y}`;
            if (locationMap.has(key)) {
                console.log(`Revisited: ${key}`);
            }

            locationMap.set(key, true);
        }
    }
    if (moveY < 0) {
        for (let y = startX - 1; y > startY + moveY; y--) {
            const key = `${startX},${y}`;
            if (locationMap.has(key)) {
                console.log(`Revisited: ${key}`);
            }

            locationMap.set(key, true);
        }
    }

}

const result = directions.reduce( (p, v) => {

    if (v.startsWith('R')) {
        p.facing = turnR90(p.facing);
    } else {
        p.facing = turnL90(p.facing);
    }
    
    const distance = parseInt(v.replace(/\w/, ''), 10);

    switch (p.facing) {
        case 'N':
            for (let y = 0; y < distance; y ++){
                p.vert --;
                const key = `${p.vert},${p.horiz}`;
                if (locationMap.has(key)) {
                    console.log('---------------');
                    console.dir(p);
                    console.log('---------------');
                }
                locationMap.set(key, true);
            }
            break;
        case 'E':
            for (let x = 0; x < distance; x ++){
                p.horiz ++;
                const key = `${p.vert},${p.horiz}`;
                if (locationMap.has(key)) {
                    console.log('---------------');
                    console.dir(p);
                    console.log('---------------');
                }
                locationMap.set(key, true);
            }
            break;
        case 'S':
            for (let y = 0; y < distance; y ++){
                p.vert ++;
                const key = `${p.vert},${p.horiz}`;
                if (locationMap.has(key)) {
                    console.log('---------------');
                    console.dir(p);
                    console.log('---------------');
                }
                locationMap.set(key, true);
            }
            break;
        case 'W':
            for (let x = 0; x < distance; x ++){
                p.horiz --;
                const key = `${p.vert},${p.horiz}`;
                if (locationMap.has(key)) {
                    console.log('---------------');
                    console.dir(p);
                    console.log('---------------');
                }
                locationMap.set(key, true);
            }
            break;

    }

    return p;

}, {vert: 0, horiz: 0, facing: 'N'})   

console.dir(locationMap);
console.dir(result);