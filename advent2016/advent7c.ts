//find valid ip addresses w/ abba pattern but not [abba] pattern

import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

let valids = 0;

for (let line of lines) {

    const sections = line.split(/\W/);
    console.dir(sections);

    let isInsideBrackets = false;
    let currentAbaList = new Set<string>();

    for (let section of sections) {
        
        if (!isInsideBrackets) {
            for (let index = 0; index < section.length - 2; index++) {
                if (section.charAt(index) === section.charAt(index + 2)
                    && section.charAt(index) !== section.charAt(index + 1) ) {
                        currentAbaList.add(section.substr(index, 3));
                    }
            }
        }
        
        isInsideBrackets = !isInsideBrackets;
    }
    console.dir(currentAbaList);

    isInsideBrackets = false;
    for (let section of sections) {
        
        if (isInsideBrackets) {
            for (let aba of currentAbaList.values()) {
                const bab = aba.charAt(1) + aba.charAt(0) + aba.charAt(1);
                
                if (section.includes(bab)) {
                    console.log("valid");
                    valids++;
                    break;
                } 
            }

        }
        
        isInsideBrackets = !isInsideBrackets;
    }

   
}

console.log(valids);