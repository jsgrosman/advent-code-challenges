import * as fs from "fs";
import yargs = require('yargs');
import { Board }  from "./Board";

const args = yargs.options({
    'file': { type: 'string', demandOption: true, alias: 'f' },
  }).argv;
  
  const fullFilePath = `${process.cwd()}/${args['file']}`;
  
  if (!fs.existsSync(fullFilePath)) {
      console.error("No such file: " + fullFilePath);
  }
  
  const contents = fs.readFileSync(fullFilePath, 'utf8');
  const lines = contents.trim().split(/\n/g);

  const calledNumbers = lines[0].split(',').map((v, i, a) => { return parseInt(v, 10); });
  console.dir(calledNumbers);

  const boards: Board[] = [];

  for (let lineNumber = 1; lineNumber < lines.length; lineNumber += 6) {
    
    const boardNumbers = [];
    for (let boardLineNumber = 1; boardLineNumber <= 5; boardLineNumber++) {
        boardNumbers.push(...
          lines[lineNumber + boardLineNumber].trim().split(/\s+/).map( (v, i, a) => { 
            return parseInt(v, 10); }
            )
          );
    }
    boards.push(new Board(boardNumbers, 5));
  }


  loop1:
  for (let calledNumber of calledNumbers) {
    console.debug("Calling: " + calledNumber);
    for (let i = 0; i < boards.length ; i++) {
        let b = boards[i];
        b.markSquare(calledNumber);
        // b.print();
        if (b.isWinner()) {
          if (boards.length > 1) {
            // console.log("Removing...");
            boards.splice(i, 1); // remove board
            i--;
          } else {
            console.log("Last one...");
            b.print();
            console.debug(b.getScore(calledNumber));
            break loop1;
          }
        }
    }

    
  }
  