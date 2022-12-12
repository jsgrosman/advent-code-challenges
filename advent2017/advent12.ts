import { getFileContents } from "../Utils";
    
const contents = getFileContents().trim().split(/\n/g);

const villages: Map<string, string[]> = new Map<string, string[]>();
const visited: Set<string> = new Set<string>();
const toBeVisited: Set<string> = new Set<string>();

for (const line of contents) {

    const [start, children] = line.split(' <-> ', 2);
    villages.set(start, children.split(', '));
}

let numberOfGroups = 0;
while (villages.size > 0) {

    toBeVisited.add(Array.from(villages.keys())[0]);
    while (toBeVisited.size > 0) {

        const [nextVillage] =  toBeVisited;
        toBeVisited.delete(nextVillage);
        visited.add(nextVillage);
        const neighbors = villages.get(nextVillage)!;

        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                toBeVisited.add(neighbor);
            }
        }
        villages.delete(nextVillage);
    }

    numberOfGroups++;
    console.log(`Group ${numberOfGroups}: ${JSON.stringify(Array.from(visited.values()))}`);
    visited.clear();
}

console.dir(numberOfGroups);