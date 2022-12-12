import { getFileContents } from "../Utils";

const contents = getFileContents();
const passwords = contents.trim().split(/\n/g);

const getLetterCount = (word: string, letter: string) => {
    return (word.match(new RegExp(letter, 'g')) || []).length;
}

const checkPos = (word: string, letter: string, existsIndex1: number, existsIndex2: number) => {
    const p1 = word.charAt(existsIndex1 - 1) === letter;
    const p2 = word.charAt(existsIndex2 - 1) === letter

    return ( ( p1 && !p2 ) || ( !p1 && p2 ) );

}

const result = passwords.reduce( (count, pw) => {
    const [policy, password] = pw.split(': ', 2);
    const [limits, letter] = policy.split(' ', 2);
    const [min, max] = limits.split('-', 2).map( (v) => parseInt(v, 10));

    if (password && letter) {
        if (checkPos(password, letter, min, max)) {
            return count + 1;
        }
    }
    return count;
}, 0);

console.log(result);