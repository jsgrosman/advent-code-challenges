import { getFileContents } from "../Utils";

let password = 'abcdefgh';

const rotateStringLeft = (str: string, n: number): string => str.slice(n % str.length) + str.slice(0, n % str.length);
const rotateStringRight = (str: string, n: number): string => str.slice(-n % str.length) + str.slice(0, -n % str.length);


const contents = getFileContents();
const instructions = contents.trim().split(/\n/g);
let result: RegExpMatchArray | null = null;

for (let instruction of instructions) {

    result = instruction.match(/swap position (\d+) with position (\d+)/);
    if (result) {
        const pos1 = Number(result[1]);
        const pos2 = Number(result[2]);
        
        let char1 = password.charAt(pos1)
        let char2 = password.charAt(pos2);
        password = password.substring(0, pos2) + char1 + password.substring(pos2 + 1);
        password = password.substring(0, pos1) + char2 + password.substring(pos1 + 1);
        continue;
    }

    result = instruction.match(/swap letter (\w) with letter (\w)/);
    if (result) {
        const char1 = result[1];
        const char2 = result[2];
        
        const pos1 = password.indexOf(char1);
        const pos2 = password.indexOf(char2);
        password = password.substring(0, pos2) + char1 + password.substring(pos2 + 1);
        password = password.substring(0, pos1) + char2 + password.substring(pos1 + 1);

        continue;
    }

    result = instruction.match(/rotate left (\d+) steps/);
    if (result) {
        const pos = Number(result[1]);
        password = rotateStringLeft(password, pos);

        continue;
    }

    result = instruction.match(/rotate right (\d+) steps/);
    if (result) {
        const pos = Number(result[1]);
        password = rotateStringRight(password, pos);

        continue;
    }

    result = instruction.match(/rotate based on position of letter (\s)/);
    if (result) {
        const char = result[1];
        const pos = password.indexOf(char);


        password = password.substring(password.length - pos, password.length) + password.substring(0, password.length - pos);

        continue;
    }

    result = instruction.match(/reverse positions (\d+) through (\d+)/);

    result = instruction.match(/move position (\d+) to position (\d+)/);
    if (result) {
        const pos1 = Number(result[1]);
        const pos2 = Number(result[2]);
        
        let char1 = password.charAt(pos1)

        password = password.substring(0, pos2) + char1 + password.substring(pos2 + 1);
        password = password.substring(0, pos1) + password.substring(pos1 + 1);

        continue;
    }

}