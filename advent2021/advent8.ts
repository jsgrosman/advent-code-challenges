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
  const lines = contents.trim().split(/\n/g);
  
  const alphabetize = (s: string) => {
       return s.split('').sort( (a, b) => a.localeCompare(b) ).join('');
  }

  const containsString = (needle: string, haystack: string) => {
      const n = needle.split('');

      for (let n1 of n) {
          if (!haystack.includes(n1)) {
              return false;
          }
      }
      return true;
  }
  

  // remove everything from a that is b
  const findOutliers = (a: string, b: string) => {
      const bArray = b.split('');

      let result = a;
      for (let b1 of bArray) {
        result = result.replace(b1, '');
      }
      return result;
  }

  const getAnswer = (answers: string[], word: string) => {
      return answers.indexOf(word);
  }

  let total = 0;
  for (let line of lines) {
    const [before, after] = line.split(' | ');

    let answers: string[] = Array(10).fill('')
    const clues = before.split(' ').map ( (v) => alphabetize(v));
    const puzzles = after.split(' ').map ( (v) => alphabetize(v));

   // console.dir(clues);

    for (let signal of clues) {
        if (signal.length === 2) {
            answers[1] = signal;
        } else if (signal.length === 3) {
            answers[7] = signal;
        } else if (signal.length === 4) {
            answers[4] = signal;
        } else if (signal.length === 7) {
            answers[8] = signal;
        }
    } 

    clues.splice(clues.indexOf(answers[1]), 1);
    clues.splice(clues.indexOf(answers[7]), 1);
    clues.splice(clues.indexOf(answers[4]), 1);
    clues.splice(clues.indexOf(answers[8]), 1);

    for (let signal of clues) {
        if (signal.length === 5 && containsString(answers[1], signal)) {
            answers[3] = signal;
        }

        if (signal.length === 6 && containsString(answers[4], signal)) {
            answers[9] = signal;
        }
    }

    clues.splice(clues.indexOf(answers[3]), 1);
    clues.splice(clues.indexOf(answers[9]), 1);

    for (let signal of clues) {
        if (signal.length === 6 && containsString(answers[7], signal)) {
            answers[0] = signal;
        }
    }
    clues.splice(clues.indexOf(answers[0]), 1);

    for (let signal of clues) {
        if (signal.length === 6) {
            answers[6] = signal;
        }
    }
    clues.splice(clues.indexOf(answers[6]), 1);



    const remainingLetters = findOutliers(clues[0], clues[1]);

    if (containsString(remainingLetters, answers[6])) {
        answers[5] = clues[0];
        answers[2] = clues[1];
    } else {
        answers[2] = clues[0];
        answers[5] = clues[1];
    }

    // console.dir(Object.entries(answers));

    let result = '';
    for (let signal of puzzles) {
        result += String(getAnswer(answers, signal));
    }
    console.log(`${after}: ${result}`);
    total += parseInt(result, 10);
    
  }

  console.log(`total: ${total}`);
