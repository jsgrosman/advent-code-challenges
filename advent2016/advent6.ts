//find most common letter in each column

import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);
 
const mostFrequent = (arr: string[]) => {
    
    const frequency = new Map<string,number>();
    
    for (let char of arr){
        if (!frequency.has(char)){
            frequency.set(char,1);
        }
        else {
            const wand = frequency.get(char);
            frequency.delete(char);
            if (wand){
                frequency.set(char,wand+1);
            }
        }
    }

    const counts: number[] = [];
    for (let value of arr){
        const pusher = frequency.get(value);
        if (pusher){
            counts.push(pusher);
        }
    }

    //console.dir(frequency);
    const min = Math.min(...counts);
    //console.log(max);

    //WHYYYY no work???
    //return Object.keys(frequency).find(key => frequency.get(key) == max);
    for (let value of arr){
        if (frequency.get(value) && frequency.get(value) == min){
            return value;
        }
    }
    return 'none';

}
 
//console.log(mostFrequent(['a','b','c','a']));

let columns: string[][] = [[],[],[],[],[],[],[],[]];
for (let i = 0; i < lines[0].length; i ++){
    let count = 0;
    for (let b = 0; b < lines.length; b++){
        if (columns[i]){
            columns[i].push(lines[b][i]);
        }
    }
}

for (let column of columns){
    console.log(mostFrequent(column));
}

//console.dir(columns);