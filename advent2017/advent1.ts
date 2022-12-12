import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

for (let line of lines) {

    const arr = (line).split('');
    
    const sum = arr.reduce( (c, p, i, a) => {
        const indexToCheck = (i + a.length/2) % a.length;
        if (p === a[indexToCheck]) {
            return c + Number(a[indexToCheck]);
        } else {
            return c;
        }
    }, 0);

    console.log(`${line}: ${sum}`);
}