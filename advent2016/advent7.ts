//find valid ip addresses w/ abba pattern but not [abba] pattern

import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);
 
const isItValid = (ip: string) => {
    
    let valid: boolean = false;
    const bigrams: string[] = [];
    const ipNew = ip.replace(/[^a-z]/g,'');
    //console.log(ip);
    for(let i = 0; i < ipNew.length; i += 2){
        const bigram: string = ipNew[i] + ipNew[i+1];
        //console.log(bigram);
        bigrams.push(bigram);
    }
    
    const abbaRegex = /(\w)(\w)(\2)(\1)/;

    //(\w)(\w)(\2)(\1)
    // abbaqrst

    // split (/[\[\]]/)

    // regxp = //
    // if (regex.test(in)
    // out, in, out, in

    for (let big of bigrams){
        const newRegex: RegExp = new RegExp('\[[a-z]*' + big + big.split('').reverse().join('') + '[a-z]*\]');
        console.dir(newRegex);
        const newerRegex: RegExp = new RegExp(big + big.split('').reverse().join(''));
        //console.log(newerRegex);
        if (ip.includes(`newRegex`)){
            console.log('bracket regex');
            valid = false;
        }
        else {
            console.log('no brackets, went to else');
            if (ip.includes(`newerRegex`)){
                console.log('no bracket regex');
                valid = true;
                if (big.split('')[0] == big.split('')[1]){
                    console.log('same letter');
                    valid = false;
                }
            }
            else {
                console.log('no \'abba\', went to else');
            }
        }
    }

    return valid;

}

let valids = 0;
for (let line of lines){
    console.log(line);
    if (isItValid(line)){
        //console.log(valids);
        valids ++;
    }
}

console.log(valids);