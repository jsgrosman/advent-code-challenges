import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const patterns = lines[0].split(', ').sort( (a,b) => b.length - a.length);
    const towels: string[] = lines.slice(2);

    let searchRuns = 0;
  
    const memo: Map<string,boolean> = new Map<string,boolean>();
    const search = (remainingTowel: string, availablePatterns: string[]) => {

        if (memo.has(remainingTowel)) {
            return memo.get(remainingTowel);
        } 

        for (let pattern of availablePatterns) {
            if (pattern === remainingTowel) {
                return true;
            } else if (remainingTowel.startsWith(pattern)) {
                const nextTowel = remainingTowel.substring(pattern.length);
                const nextPatterns = availablePatterns.filter( (c) => nextTowel.indexOf(c) > -1);
                if (search(nextTowel, nextPatterns)) {
                    memo.set(nextTowel, true);
                    return true;
                }
            }
        }

        memo.set(remainingTowel, false);
        return false;

    }

    let count = 0;
    for (let towel of towels) {
        searchRuns = 0;
        const availablePatterns = patterns.filter( (c) => towel.indexOf(c) > -1);
       
        if (search(towel, availablePatterns)) {
            console.log(`${towel}`);
            count++;
        }
        
    }
    console.log(`count = ${count}`);

};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const patterns = lines[0].split(', ').sort( (a,b) => b.length - a.length);
    const towels: string[] = lines.slice(2);

    let searchRuns = 0;
  

    const memo: Map<string,number> = new Map<string,number>();
    const search = (remainingTowel: string, availablePatterns: string[]) => {


        if (memo.has(remainingTowel)) {
            return memo.get(remainingTowel)!;
        }


        let count = 0;
        for (let pattern of availablePatterns) {
            if (pattern === remainingTowel) {
                count++;
            } 
            
            if (remainingTowel.startsWith(pattern)) {
                const nextTowel = remainingTowel.substring(pattern.length);
                const nextPatterns = availablePatterns.filter( (c) => nextTowel.indexOf(c) > -1);
                count += search(nextTowel, nextPatterns);
            }
        }

        memo.set(remainingTowel, count);
        return count;
    }

    let total = 0;
    for (let towel of towels) {
        const availablePatterns = patterns.filter( (c) => towel.indexOf(c) > -1);
        total += search(towel, availablePatterns);
    }
    console.log(`total = ${total}`);


};

// part1();
part2();

// 1411250704 - too low