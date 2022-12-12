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
  const commands = contents.trim().split(/\n/g);

  let currentVert = 0;
  let currentHoriz = 0;

  const result = commands.map((value, index, arr) => {
    const [direction, valueStr] = value.split(' ', 2);  
    return {
        direction,
        value: parseInt(valueStr, 10),
        horiz: 0,
        vert: 0
    };
  }).reduce((prev, cur, index, arr) => {

    switch(cur.direction) {
        case 'forward': {
            prev.horiz += cur.value;
            break;
        }
        case 'down': {
            prev.vert += cur.value;
            break;
        }
        case 'up': {
            prev.vert -= cur.value;
            break;  
        }
    };

    return prev;
  });

  

  console.log("Vert: " + result.vert);
  console.log("Horiz: " + result.horiz);
  console.log("Total: " + (result.vert * result.horiz));
