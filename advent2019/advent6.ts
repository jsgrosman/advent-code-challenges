import * as fs from "fs";
import * as yargs from "yargs";

const args = yargs.options({
    'file': { type: 'string', demandOption: true, alias: 'f' },
  }).argv;


const fullFilePath = `${process.cwd()}/${args['file']}`;

if (!fs.existsSync(fullFilePath)) {
    console.error("No such file: " + fullFilePath);
}

interface node {
    name: string;
    children: node[];
    depth: number;
};


const contents = fs.readFileSync(fullFilePath, 'utf8');
const planets = contents.trim().split(/\n/g).map( v => v.split(')', 2));
const planetDistances: Map<string, number> = new Map<string, number>();
const planetPaths: Map<string, string> = new Map<string, string>();


const addPlanet = ( tree: node, inner: string, outer: string, count: number, path: string ): number => {

    if (tree.name === inner) {
        tree.children.push(
            {
                name: outer,
                children: [],
                depth: count
            }
        )
        planetDistances.set(outer, count);
        planetPaths.set(outer, path);
        return 1;
    }
    else {
        if (tree.children.length === 0) {
            return 0;
        }
        else {
            for (let n of tree.children) {
                const planetCount = addPlanet(n, inner, outer, count + 1, path + '|' + n.name);
                if (planetCount > 0) {
                    return planetCount + 1;
                }
            }
            return 0;
        }
    }
} 

const solarsystem = {
    name: 'COM',
    children: [],
    depth: 0,
}

let total = 0;
let indexes: number[] = []
let currentLength = planets.length;

while (planets.length > 0) {
    for (let [index, [inner, outer]] of planets.entries()) {
        const result = addPlanet(solarsystem, inner, outer, 1, 'COM');
        if (result > 0) {
            total += result;
            indexes.push(index);
        }
    }

    for (let i of indexes.reverse()) {
        planets.splice(i, 1);
    }
    indexes = [];

    if (planets.length == currentLength) {
        console.log(`Something went wrong`);
        break;
    } else {
        currentLength = planets.length;
    }
}
console.log(`YOU distance: ` + planetDistances.get('YOU'));
console.log(`SAN distance: ` + planetDistances.get('SAN'));

console.log(`YOU path: ` + planetPaths.get('YOU'));
console.log(`SAN path: ` + planetPaths.get('SAN'));

const youElms =  planetPaths.get('YOU')?.split('|').reverse() || [];
const samPath = planetPaths.get('SAN');
const YOUdist = planetDistances.get('YOU') || 0;
const SANdist = planetDistances.get('SAN') || 0;


for (let elm of youElms) {
    if (samPath?.includes(elm)) {

        const commonAncestorDistance = planetDistances.get(elm) || 0;
        const YOUToElm = YOUdist - commonAncestorDistance;
        const SANToElm = SANdist - commonAncestorDistance;

        console.log(`found common ancestor: ${elm}, distance: ${commonAncestorDistance}`);

        console.log(`YOU -> ${elm}: ${YOUToElm}`);
        console.log(`SAN -> ${elm}: ${SANToElm}`);
        console.log(YOUToElm + SANToElm - 2);

        break;
    }
}


console.debug(total);


