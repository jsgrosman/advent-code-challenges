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
const words = contents.trim().split(/\n/g);


const countVowels = (contents: string) => {
    return contents.match(/[aeiou]/gi)?.length || 0;
};

const hasDouble = (contents: string) => {

    for (let i=97,a='';i<123;) {
        const letter = String.fromCharCode(i++)
        if (contents.includes(letter + letter)) {
            return true;
        }
    } 

    return false;
};

const hasBadString = (contents: string) => {
    return contents.includes('ab') 
        || contents.includes('cd') 
        || contents.includes('pq') 
        || contents.includes('xy');
};

const hasRepeatedDouble = (contents: string) => {

    const chars = contents.split('');

    for (let index = 0; index < chars.length - 1; index++) {
        const searchTerm = chars[index] + chars[index + 1];

        if (contents.includes(searchTerm, index + 2)) {
            return true;
        }
    }

    return false;
};

const hasRepeatWithOneLetterGap = (contents: string) => {
    let result = false;
    if (contents) {
        if ((contents.match(/(\w)\w\1/) || []).length > 0) {
            result = true;
        }
    }
    return result;
};

const isNice = (contents: string) => {

    return countVowels(contents) >= 3 
        && hasDouble(contents)
        && !hasBadString(contents);
};


const isNice2 = (contents: string) => {

    return hasRepeatedDouble(contents) 
        && hasRepeatWithOneLetterGap(contents);
};

const result = words.reduce( (p, c,i, a) => {
    if (isNice2(c)) {
        console.log("nice: " + c);
        return p + 1;
    } else {
        console.log("naughty: " + c);
        return p;
    }
}, 0);

console.log(result);