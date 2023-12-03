import { getFileContents } from "../Utils";
import Point from '../lib/Point';

const part1 = () => {
    const contents = getFileContents();
    const schematic = contents.trim().split(/\n/g);

    let total = 0;
    for (let y = 0; y < schematic.length; y++) {
        const row = schematic[y];
        const numbersInRow = Array.from(row.matchAll(/(\d+)/g));
        if (numbersInRow) {
            NEXT_PART_NUM:
            for (const result of numbersInRow) {
                const indexOfPart = result.index!;
                const possiblePartNum = result[0];
                for (let x = indexOfPart; x < indexOfPart + possiblePartNum.length; x++) {
                    const neighbors = new Point(x, y).getAllNeighbors(schematic[y].length - 1, schematic.length - 1);
                    for (const p of neighbors) {
                        if (!schematic[p.y].charAt(p.x).match(/\d/) && schematic[p.y].charAt(p.x) != '.') {
                            total += Number(possiblePartNum);
                            continue NEXT_PART_NUM;
                        }
                    }
                }
            }
        }
    }

    console.log(`part number total = ${total}`);
};

const part2 = () => {
    const contents = getFileContents();
    const schematic = contents.trim().split(/\n/g);

    const gearMap: Map<string,Set<number>> = new Map<string, Set<number>>();

    let total = 0;
    for (let y = 0; y < schematic.length; y++) {
        const row = schematic[y];
        const numbersInRow = Array.from(row.matchAll(/(\d+)/g));
        if (numbersInRow) {
            for (const result of numbersInRow) {
                const indexOfPart = result.index!;
                const possiblePartNum = result[0];
                for (let x = indexOfPart; x < indexOfPart + possiblePartNum.length; x++) {
                    const neighbors = new Point(x, y).getAllNeighbors(schematic[y].length - 1, schematic.length - 1);
                    for (const p of neighbors) {
                        if (schematic[p.y].charAt(p.x) == '*') {
                            if (gearMap.has(p.toString())) {
                                gearMap.get(p.toString())!.add(Number(possiblePartNum));
                            } else {
                                gearMap.set(p.toString(), new Set([Number(possiblePartNum)]));
                            }
                        }
                    }
                }
            }
        }
    }

    // for all gears next to exactly 2 parts, multiply them together and add to the total
    [...gearMap.values()].filter( p => p.size === 2).map( (gearSet) => { 
        total += [...gearSet].reduce((p, c) => p * c)
    });

    console.log(`gear ratio total = ${total}`);


};

part1();
part2();