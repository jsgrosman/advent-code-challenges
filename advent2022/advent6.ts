import { getFileContents } from "../Utils";

const contents = getFileContents().trim();


const areCharsUnique = ( s:string ) => {

    for (let i = 0; i < s.length - 1; i++) {
        if (s.substring(i + 1).includes(s.charAt(i))) {
            return false;
        }
    }
    return true;

};

const LENGTH_OF_MESSAGE = 14;
for (let i = 0; i < contents.length - LENGTH_OF_MESSAGE; i++) {
    const block = contents.substr(i, LENGTH_OF_MESSAGE);
    // console.log(`block: ${block}`);
    if (areCharsUnique(block)) {
        console.log(`Start of packer: ${i + LENGTH_OF_MESSAGE}`);
        break;
    }

}