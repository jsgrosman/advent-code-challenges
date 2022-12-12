import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

interface point {
    x: number;
    y: number;
}

const pointExists = (haystack: point[], needle: point ) => {
    return haystack.find( (v) => v.x === needle.x && v.y === needle.y);
}

const print = (paper: point[]) => {
    for (let row = 0; row <= maxY; row++) {
        let s = '';
        for (let col = 0; col <= maxX; col++) {
            if (pointExists(paper, {x: col, y: row})) {
                s += '█';
            } else {
                s += ' ';
            }
        }
        console.log(s);
    } 

}


const transparentPaper: point[] = [];

let maxX = 0;
let maxY = 0;
for (let line of lines) {
    const [x, y] = line.split(',', 2).map( (v) => Number(v));
    transparentPaper.push({x, y});

    maxX = Math.max(x, maxX);
    maxY = Math.max(y, maxY);
}

// console.dir(transparentPaper);
const comparePoint = (v: point) => {
    
}




const instructions: point[] = [
    {x: 655, y: 0},
    {x:0, y:447},
    {x:327, y:0},
    {x:0, y:223},
    {x:163, y:0},
    {x:0, y:111},
    {x:81, y:0},
    {x:0, y:55},
    {x:40, y:0},
    {x:0, y:27},
    {x:0, y:13},
    {x:0, y:6}
];

// const instructions: point[] = [
//     {x: 0, y:7},
//     {x: 5, y:0}
// ];



let currentTransparentPaper: point[] = [...transparentPaper];
for (let instruction of instructions) {
    console.log(`\n\nFolding across x = ${instruction.x}, y = ${instruction.y}`);

    const foldY = instruction.y;
    const foldX = instruction.x;
    const newTransparentPaper: point[] = [];

    for (let p of currentTransparentPaper) {
        if (foldY > 0) {
            if (p.y > foldY) {
                const distance = p.y - foldY;
                const newPoint = {
                    x: p.x,
                    y: foldY - distance
                };
                // console.log(`Transforming ${p.x},${p.y} to ${newPoint.x},${newPoint.y}`);
                if (!pointExists(newTransparentPaper, newPoint)) {
                    newTransparentPaper.push(newPoint);
                }
            } else {
                if (!pointExists(newTransparentPaper, p)) {
                    newTransparentPaper.push({x: p.x, y: p.y});
                }
            }
        } else {
            if (p.x > foldX) {
                const distance = p.x - foldX;
                const newPoint = {
                    x: foldX - distance,
                    y: p.y
                };
                // console.log(`Transforming ${p.x},${p.y} to ${newPoint.x},${newPoint.y}`);
                if (!pointExists(newTransparentPaper, newPoint)) {
                    newTransparentPaper.push(newPoint);
                }
            } else {
                if (!pointExists(newTransparentPaper, p)) {
                    newTransparentPaper.push({x: p.x, y: p.y});
                }
            }
        }
    }

    if (foldY > 0) {
        maxY = (maxY / 2) + 1;
    } else {
        maxX = (maxX / 2) + 1;
    }

    currentTransparentPaper = [...newTransparentPaper];
    // print(currentTransparentPaper);
}

// console.dir(currentTransparentPaper, { depth: null})
// console.log(currentTransparentPaper.length);

print(currentTransparentPaper);