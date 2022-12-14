import { getFileContents } from "../Utils";

const ONE_BILLION = 1000000000;


let directions = getFileContents().trim().split(',');

let cycle = 0;

let dancers: string[] = [...new Array<number>(16).keys()].map( v => String.fromCharCode(v + 97) );

const danceMap: Map<string, string> = new Map<string, string>();

const danceRound = () => {
    for (const dir of directions) {

        if (dir.startsWith('s')) {
            const spinSize = Number(dir.substring(1));
            dancers.unshift(...dancers.splice(-spinSize, spinSize));
        } else if (dir.startsWith('x')) {
            const [pos1, pos2] = dir.substring(1).split('/', 2).map(v => Number(v));
            let placeholder = dancers[pos1];
            dancers[pos1] = dancers[pos2];
            dancers[pos2] = placeholder;
        } else if (dir.startsWith('p')) {
            const [dancer1, dancer2] = dir.substring(1).split('/', 2);
            const pos1 = dancers.indexOf(dancer1);
            const pos2 = dancers.indexOf(dancer2);

            let placeholder = dancers[pos1];
            dancers[pos1] = dancers[pos2];
            dancers[pos2] = placeholder;
        }
    }
}




const startingDancers = dancers.join('');
for (let round = 1; round <= ONE_BILLION; round++) {
    const currentDance = dancers.join('');
    if (danceMap.has(currentDance)) {
        dancers = danceMap.get(currentDance)!.split('');
    } else {
        danceRound();
        danceMap.set(currentDance,  dancers.join(''));
    }

    if (startingDancers === dancers.join('')) {
        cycle = round;
        break;
    }

    if (round % 1000000 === 0) {
        console.log(`${round}: ${dancers.join('')}`);
    }
}

// const cycleMod
// console.log(ONE_BILLION % cycle);

const lastRoundStart = Math.floor(ONE_BILLION / cycle) * (cycle);
// const lastRoundStart = (Math.floor(ONE_BILLION/(cycle+1))-1) * (cycle+1);
for (let round = lastRoundStart + 1; round <= ONE_BILLION; round++) {
    danceRound();
    console.log(`${round}: ${dancers.join('')}`);
}

console.log(dancers.join(''));

