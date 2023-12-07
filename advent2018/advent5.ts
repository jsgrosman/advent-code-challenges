import { getFileContents } from "../Utils";


const part1 = () => {
    let contents = getFileContents().trim().split('');
 
    console.log(contents.length);
    let currentLength = contents.length;
    let newLength = 0;

    while (currentLength != newLength) {
        currentLength = contents.length;

        for (let index = contents.length - 1; index > 0; index--) {
            const letter1 = contents[index];
            const letter2 = contents[index - 1];
        
            if (letter1 != letter2 && letter1.toLowerCase() === letter2.toLowerCase()) {
                contents.splice(index - 1, 2);
                index--;
            }

        }

        newLength = contents.length;

        console.log(contents.length);
    }   
    


};


const part2 = () => {
    const contents = getFileContents().trim();

    const collapse = (polymer:string[]) => {
        let currentLength = polymer.length;
        let newLength = 0;
    
        while (currentLength != newLength) {
            currentLength = polymer.length;
    
            for (let index = polymer.length - 1; index > 0; index--) {
                const letter1 = polymer[index];
                const letter2 = polymer[index - 1];
            
                if (letter1 != letter2 && letter1.toLowerCase() === letter2.toLowerCase()) {
                    polymer.splice(index - 1, 2);
                    index--;
                }
    
            }
    
            newLength = polymer.length;
        }  

        return newLength;
    }

    let minPolymerLength = Number.MAX_VALUE;

    for (let letterCode = 'a'.charCodeAt(0); letterCode <= 'z'.charCodeAt(0); letterCode++) {

        const letter = String.fromCharCode(letterCode);
        const newPolymer = contents.replace(new RegExp(letter, 'g'), '').replace(new RegExp(letter.toUpperCase(), 'g'), '');

        const polymerLength = collapse(newPolymer.split(''));
        minPolymerLength = Math.min(polymerLength, minPolymerLength);
    }

    console.log(`min polymer length: ${minPolymerLength}`);

};

// part1();
part2();