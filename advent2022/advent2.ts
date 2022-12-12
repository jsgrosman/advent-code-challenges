import * as fs from "fs";
import * as yargs from "yargs";

const args = yargs.options({
    'file': { type: 'string', demandOption: true, alias: 'f' },
  }).argv;


const fullFilePath = `${process.cwd()}/${args['file']}`;

if (!fs.existsSync(fullFilePath)) {
    console.error("No such file: " + fullFilePath);
}

const VILLIAN_ROCK = 'A';
const VILLIAN_PAPER = 'B';
const VILLIAN_SCISSORS = 'C';
const HERO_LOSE = 'X';
const HERO_TIE = 'Y';
const HERO_WIN = 'Z';

const LOSE_SCORE = 0;
const TIE_SCORE = 3;
const WIN_SCORE = 6;

const ROCK_SCORE = 1;
const PAPER_SCORE = 2;
const SCISSORS_SCORE = 3;

const contents = fs.readFileSync(fullFilePath, 'utf8');
const rounds = contents.trim().split(/\n/g).map( v => v.split(' ', 2));


const getResult = (villian: string, hero: string) => {

    switch (villian) {
        case VILLIAN_ROCK: 
            if (hero === HERO_LOSE) { 
                return LOSE_SCORE + SCISSORS_SCORE
            } else if (hero === HERO_TIE) {
                return TIE_SCORE + ROCK_SCORE;
            } else {
                return WIN_SCORE + PAPER_SCORE;
            }
            break;
        case VILLIAN_PAPER:
            if (hero === HERO_LOSE) { 
                return LOSE_SCORE + ROCK_SCORE;
            } else if (hero === HERO_TIE) {
                return TIE_SCORE + PAPER_SCORE;
            } else {
                return WIN_SCORE + SCISSORS_SCORE;
            }
            break;  
        case VILLIAN_SCISSORS:
            if (hero === HERO_LOSE) { 
                return LOSE_SCORE + PAPER_SCORE
            } else if (hero === HERO_TIE) {
                return TIE_SCORE + SCISSORS_SCORE;
            } else {
                return WIN_SCORE + ROCK_SCORE;
            }
            break;      
    }
    return 0;
}

let totalScore = 0;
rounds.forEach ( v => {
    const [villian, hero] = v;
    const result = getResult(villian, hero);
    totalScore += result;
});

console.debug(`Score = ${totalScore}`);