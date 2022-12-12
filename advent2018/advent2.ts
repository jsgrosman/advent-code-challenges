import { getFileContents, letterFrequencyCount } from "../Utils";


const contents = getFileContents();
const boxIds = contents.trim().split(/\n/g);

const compare = (s1: string, s2:string) => {

    let mismatches = 0;
    for (let i1 = 0; i1 < s1.length; i1++) {
       if (s1.charAt(i1) !== s2.charAt(i1)) {
           mismatches++;
       }
    }

    return mismatches;
}

const removeMismatches = (s1: string, s2:string) => {

    let newString = '';
    for (let i1 = 0; i1 < s1.length; i1++) {
       if (s1.charAt(i1) === s2.charAt(i1)) {
            newString += s1.charAt(i1);
       }
    }

    return newString;
}


for (let i1 =0; i1 < boxIds.length; i1++) {
    for (let i2 =i1 + 1; i2 < boxIds.length; i2++) {
        const id1 = boxIds[i1];
        const id2 = boxIds[i2];

        if (compare(id1, id2) === 1) {
            console.log(`${id1}, ${id2}`);
            console.log(removeMismatches(id1, id2));
        }
    }

  
}


