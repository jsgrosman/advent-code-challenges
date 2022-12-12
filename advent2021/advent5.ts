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
  const coordsString = contents.trim().split(/\n/g);

  var coordsMap = new Map();

  for (let line of coordsString) {
    const [x1y1, x2y2] = line.split(' -> ', 2);
    const [x1, y1] = x1y1.split(',', 2).map((v, i, a) => { return parseInt(v, 10); });
    const [x2, y2] = x2y2.split(',', 2).map((v, i, a) => { return parseInt(v, 10); });

    console.log(x1 + ',' + y1 + " : " + x2 + "," + y2);

    if (x1 === x2) {
        // vertical line
        const startY = Math.min(y1, y2);
        const endY = Math.max(y1, y2);

        for (let i = startY; i <= endY; i++) {
            const key = x1 + '-' + i;
            if (coordsMap.has(key)) {
                coordsMap.set(key, coordsMap.get(key) + 1);
            } else {
                coordsMap.set(key, 1);
            }

        }
    } else if (y1 === y2) {
        // horizontal line
        const startX = Math.min(x1, x2);
        const endX = Math.max(x1, x2);

        for (let i = startX; i <= endX; i++) {
            const key = i + '-' + y1;
            if (coordsMap.has(key)) {
                coordsMap.set(key, coordsMap.get(key) + 1);
            } else {
                coordsMap.set(key, 1);
            }
        }

    } else {
        // diagonal

        let startX, endX, currentY, addY;
        if (x1 < x2 && y1 < y2) {
                startX = x1;
                endX = x2;
                currentY = y1;
                addY = true;
        } else if (x1 < x2 && y1 > y2) {
                startX = x1;
                endX = x2;
                currentY = y1;
                addY = false;
        } else if (x1 > x2 && y1 < y2) {
                startX = x2;
                endX = x1;
                currentY = y2;
                addY = false;
        } else {
                startX = x2;
                endX = x1;
                currentY = y2;
                addY = true;
        }

        for (let currentX = startX; currentX <= endX; currentX++) {
            const key  = currentX + '-' + currentY;
            if (coordsMap.has(key)) {
                coordsMap.set(key, coordsMap.get(key) + 1);
            } else {
                coordsMap.set(key, 1);
            }

            if (addY) {
                currentY++;
            } else {
                currentY--;
            }
        }

    }

  }

  // console.dir(coordsMap);

  const l = Array.from(coordsMap.values()).filter((v) => v > 1).length;
  console.log("count: " + l);