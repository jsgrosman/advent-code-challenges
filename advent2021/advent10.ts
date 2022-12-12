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



let totalScore = 0;
let totalCompletionScore = 0;
const allCompletions = [];

const PAREN = '(';
const PAREN_CLOSED= ')';
const BRACKET = '[';
const BRACKET_CLOSED = ']';
const CURLY = '{';
const CURLY_CLOSED = '}';
const ANGLE = '<';
const ANGLE_CLOSED = '>';

for (let line of lines) {

    console.log(line);
    const characters = line.split('');

    const results = characters.reduce( (result, char) => {
        if (result.invalid) {
            return result;
        }

        if (char === PAREN || char === BRACKET || char === CURLY || char == ANGLE) {
            result.opens.push(char);
        } else {
            const nextOpenChar = result.opens.pop();
            if (char === PAREN_CLOSED && nextOpenChar !== PAREN) {
                totalScore += 3;
                result.invalid = true
            } else if (char === BRACKET_CLOSED && nextOpenChar !== BRACKET) {
                totalScore += 57;
                result.invalid = true
            } else if (char === CURLY_CLOSED && nextOpenChar !== CURLY) {
                totalScore += 1197;
                result.invalid = true
            } else if (char === ANGLE_CLOSED && nextOpenChar !== ANGLE) {
                totalScore += 25137;
                result.invalid = true
            }
        }
        return result;
    }, {opens: [] as string[], invalid: false});


    if (!results.invalid) {
        results.opens.reverse();

        totalCompletionScore = 0;
        for(let completion of results.opens) {
            totalCompletionScore = (totalCompletionScore * 5);
            switch (completion) {
                case PAREN:
                    totalCompletionScore += 1;
                    break;
                case BRACKET:
                    totalCompletionScore += 2;
                    break;    
                case CURLY:
                    totalCompletionScore += 3;
                    break;
                case ANGLE:
                    totalCompletionScore += 4;
                    break;    
            }
        }
        console.log(`Completion Score: ${totalCompletionScore}`);
        allCompletions.push(totalCompletionScore);
    }
}



console.log(`Total: ${totalScore}`);

allCompletions.sort( (a,b) => a - b);
console.log(`Median score = ${allCompletions[Math.floor(allCompletions.length / 2)]}`);