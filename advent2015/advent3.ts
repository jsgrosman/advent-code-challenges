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

var coordsMap = new Map();
coordsMap.set('0,0', 1);

let isSanta = true;
const result = contents.split('').reduce( (p,c,i,a) => { 
    
    let currentCoords = p.santa;
    if (!isSanta) {
        currentCoords = p.robot;
    }


    switch (c) {
        case '>':
            currentCoords.x++;
            break;
        case '<':
            currentCoords.x--;
            break;
        case '^':
            currentCoords.y++;
            break;
        case 'v':
            currentCoords.y--;
            break;
    }

    const key = currentCoords.x + ',' + currentCoords.y;
    coordsMap.set(key, 1);

    console.dir(p);

    isSanta = !isSanta;
    return p;
}, { santa: {x: 0, y: 0},
     robot: {x: 0, y: 0} });

console.log(coordsMap.size);

