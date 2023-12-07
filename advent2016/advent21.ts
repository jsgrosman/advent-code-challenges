import { getFileContents } from "../Utils";
import { swapLettersByLetter, swapLettersByPosition, rotateStringLeft, rotateStringRight, moveLetterToPosition, rotateStringBasedOnX, reverseBetween } from "./advent21-functions";

let password = 'abcdefgh';


const contents = getFileContents();
const instructions = contents.trim().split(/\n/g);
let result: RegExpMatchArray | null = null;

console.log(password);
for (let instruction of instructions) {

    result = instruction.match(/swap position (\d+) with position (\d+)/);
    if (result) {
        const pos1 = Number(result[1]);
        const pos2 = Number(result[2]);
        password = swapLettersByPosition(pos1, pos2, password);
        console.log(`swapLettersByPosition: ${instruction} => ${password}`);
        continue;
    }

    result = instruction.match(/swap letter (\w) with letter (\w)/);
    if (result) {
        const char1 = result[1];
        const char2 = result[2];
        password = swapLettersByLetter(char1, char2, password);
        console.log(`swapLettersByLetter: ${instruction} => ${password}`);
        continue;
    }

    result = instruction.match(/rotate left (\d+) steps/);
    if (result) {
        const pos = Number(result[1]);
        password = rotateStringLeft(pos, password);
        console.log(`rotateStringLeft: ${instruction} => ${password}`);
        continue;
    }

    result = instruction.match(/rotate right (\d+) steps/);
    if (result) {
        const pos = Number(result[1]);
        password = rotateStringRight(pos, password);
        console.log(`rotateStringRight: ${instruction} => ${password}`);
        continue;
    }

    result = instruction.match(/rotate based on position of letter (\s)/);
    if (result) {
        const char = result[1];
        password = rotateStringBasedOnX(char, password);
        console.log(`rotateStringBasedOnX: ${instruction} => ${password}`);
        continue;
    }

    result = instruction.match(/reverse positions (\d+) through (\d+)/);
    if (result) {
        const pos1 = Number(result[1]);
        const pos2 = Number(result[2]);
        password = reverseBetween(pos1, pos2, password);
        console.log(`reverseBetween: ${instruction} => ${password}`);
        continue;
    }

    result = instruction.match(/move position (\d+) to position (\d+)/);
    if (result) {
        const pos1 = Number(result[1]);
        const pos2 = Number(result[2]);
        password =  moveLetterToPosition(pos1, pos2, password);
        console.log(`moveLetterToPosition: ${instruction} => ${password}`);
        continue;
    }
}

console.log(`password = ${password}`);