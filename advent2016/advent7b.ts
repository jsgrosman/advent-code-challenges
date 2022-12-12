//find valid ip addresses w/ abba pattern but not [abba] pattern

import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);
 
const isItValid = (ip: string,num:number) => {
    
    console.log(ip);
    const inBracketsRegex = /\[\w*(\w)(\w)(\1)\w*\]/g;
    const inBracketsMatches = ip.matchAll(inBracketsRegex) || [];
    const killBrackets = ip.replace(/\[\w*\]/g, ' ');
    console.log(killBrackets);
    
    for (let blah of inBracketsMatches) {
        //console.dir(blah);
        const checkAba = `${blah[2]}${blah[1]}${blah[2]}`;
        
        console.log(checkAba);
        if (killBrackets.includes(checkAba) && blah[2] != blah[1]) {
            console.log('true');
            return true;
        } 
    }

    return false;
    
    
    

    // let valid: boolean = false;
    // let valid1: boolean = false;
    // let valid2: boolean = false;
    
    // const abbaRegex = /(\w)(\w)(\2)(\1)/;
    // const abaRegex = /(\w)(\w)(\1)/;

    // const stringMatch: string[] = ip.match(abaRegex) || [];
    // const babRegex: RegExp = new RegExp(stringMatch[2]+stringMatch[1]+stringMatch[2]);

    // const aaaaRegex = /(\w)(\1)(\1)(\1)/;
    // const aaaRegex = /(\w)(\1)(\1)/;

    // const ipNew = ip.replace(/\[/g,' ').replace(/\]/g,' ');
    // const ipList = ipNew.split(' ');

    // for (let i = 0; i < ipList.length; i ++){

        


    //     //console.log(`${num}: ${i}: ${ipList[i]}`);
    //     if (i%2 == 0){
    //         if(abaRegex.test(ipList[i])){
    //             if(!aaaRegex.test(ipList[i])){
    //                 valid1 = true;
    //             }
    //         }
    //     }
    //     else if(babRegex.test(ipList[i])){
    //         if(!aaaRegex.test(ipList[i])){
    //             valid2 = true;
    //         }
    //     }
    // }

    // valid = valid1 && valid2

    //(\w)(\w)(\2)(\1)
    // abbaqrst

    // split (/[\[\]]/)

    // regxp = //
    // if (regex.test(in)
    // out, in, out, in

    

    //return false;

}

let valids = 0;
for (let i = 0; i < lines.length; i ++){
    // console.log(`${lines} - ${isItValid(lines[i],i)}`);
    if (isItValid(lines[i],i)){
        //console.log(valids);
        valids ++;
    }
}

console.log(valids);