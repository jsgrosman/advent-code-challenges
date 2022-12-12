import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

interface node {
    bags: howManyBags[];
};

interface howManyBags {
    color: string;
    num: number;
};

const luggageMap = new Map<string, node>();

for (let line of lines) {

    // light red bags contain 1 bright white bag, 2 muted yellow bags.

    const [container, containing] = line.split(' contain ');
    const containerColor = container.replace(' bags', '');
    
    if (containing.includes('no other bags')) {
        luggageMap.set(containerColor, {
            bags: []
        });
    } else {
        for (let bags of containing.split(', ')) {
            const matches = bags.match(/(\d+) ([a-z ]+) bags?/);

            if (matches) {
                const containedNumber = matches[1];
                const containedColor = matches[2];

                if (luggageMap.has(containerColor)) {
                    luggageMap.get(containerColor)!.bags.push({
                        color: containedColor,
                        num: Number(containedNumber)
                    });
                } else {
                    luggageMap.set(containerColor, {
                        bags: [{
                            color: containedColor,
                            num: Number(containedNumber)
                        }]
                    });
                }
            }
        }
    }
}

// console.dir(luggageMap, { depth: null});

let result = 0;
const transverse = (color: string, numberOfBags: number) => {
    if (luggageMap.has(color)) {
        const bags = luggageMap.get(color)!.bags;
        for (let bag of bags) {
             const nextColor = bag.color;
             result += numberOfBags * bag.num;
             // console.log(`visiting ${nextColor} with ${bag.num} bag[s]`);
             transverse(nextColor, numberOfBags * bag.num);
        }
    }
}

transverse('shiny gold', 1);
console.log(result);

// const toBeVisited: string[] = [];
// const visited: string[] = [];

// const transverse = (color: string) => {
//     visited.push(color);

//     if (luggageMap.has(color)) {
//         const bags = luggageMap.get(color)!.bags;
//         for (let bag of bags) {
//             if (!toBeVisited.includes(bag) && !visited.includes(bag)) {
//                 toBeVisited.push(bag);
//             }
//         }
//     }

//     if (toBeVisited.length > 0) {
//         const nextBag = toBeVisited.shift();
//         if (nextBag) {
//             transverse(nextBag);
//         }
//     }
// }

// transverse('shiny gold');

// console.dir(visited);

// console.log(`How many bag colors can eventually contain at least one shiny gold bag? ${visited.length - 1}`)
