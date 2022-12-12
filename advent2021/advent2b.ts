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
  let aim = 0;

  for (let command of commands) {
    const [direction, valueStr] = command.split(' ', 2);
    const value = parseInt(valueStr, 10);

    switch(direction) {
        case 'forward': {
            currentHoriz += value;
            currentVert += (aim * value);
            break;
        }
        case 'down': {
            aim += value;
            break;
        }
        case 'up': {
            aim -= value;
            break;  
        }
    };
   
  }

  console.log("Vert: " + currentVert);
  console.log("Horiz: " + currentHoriz);
  console.log("Total: " + (currentVert * currentHoriz));
