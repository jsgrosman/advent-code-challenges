import { getFileContents, getNeigborPoints } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

const cubeMap = new Map<string, boolean>();





const getNumberOfCubes = (cells: string[]) => {
    let result = 0;

    for (let cell of cells) {
        if (cubeMap.has(cell)) {
            result++;
        }
    }
    return result;
}


interface reboot {
    id: number;
    instruction: string;
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    minZ: number;
    maxZ: number;
}

const allReboots: reboot[] = [];

let trueMinX = Number.MAX_VALUE, trueMaxX = Number.MIN_VALUE;
let trueMinY = Number.MAX_VALUE, trueMaxY = Number.MIN_VALUE;
let trueMinZ = Number.MAX_VALUE, trueMaxZ = Number.MIN_VALUE;

// initialize
let id = 1;
for (let line of lines) {
    
    //  console.log(line);
    const match = line.match(/(on|off) x=(\-*\d+)\.\.(\-*\d+),y=(\-*\d+)\.\.(\-*\d+),z=(\-*\d+)\.\.(\-*\d+)/) || [];
    
    const instruction = match[1];
    const minX = Number(match[2]);
    const maxX = Number(match[3]);
    const minY = Number(match[4]);
    const maxY = Number(match[5]);
    const minZ = Number(match[6]);
    const maxZ = Number(match[7]);

    trueMinX = Math.min(minX, trueMinX);
    trueMinY = Math.min(minY, trueMinY);
    trueMinZ = Math.min(minZ, trueMinZ);
    trueMaxX = Math.max(maxX, trueMaxX);
    trueMaxY = Math.max(maxY, trueMaxY);
    trueMaxZ = Math.max(maxZ, trueMaxZ);

    allReboots.push({
        id: id++,
        instruction,
        minX,
        maxX,
        minY,
        maxY,
        minZ,
        maxZ
    });
}

console.log(`${trueMinX},${trueMaxX},${trueMinY},${trueMaxY},${trueMinZ},${trueMaxZ}`);
console.log( (trueMaxX - trueMinX) * (trueMaxY - trueMinY) );
// we're gonna do this one plane at a time



let totalCubes = 0;
const Xmemo = new Map<String, number>();
for (let x = trueMinX; x <= trueMaxX; x++) {
    const xReboots = allReboots.filter( v => v.maxX >= x && v.minX <= x);
    if (xReboots.length === 0) {
        continue;
    }
    const XKey = xReboots.map( v => v.id ).join();
    if (Xmemo.has(XKey)) {
        totalCubes += Xmemo.get(XKey)!;
        continue;
    }

    let YCubes = 0;
    const Ymemo = new Map<String, number>();
    for (let y = trueMinY; y <= trueMaxY; y++) {
        const yReboots = xReboots.filter( v => v.maxY >= y && v.minY <= y);
        if (yReboots.length === 0) {
            continue;
        }

        const Ykey = yReboots.map( v => v.id ).join();
        if (Ymemo.has(Ykey)) {
            YCubes += Ymemo.get(Ykey)!;
            continue;
        }

        const ZMap = new Map<number, boolean>();

        for (let reboot of yReboots) {

             // we're in the Z plane
            for (let z = reboot.minZ; z <= reboot.maxZ; z++) {
                if (reboot.instruction === 'on') {
                    ZMap.set(z, true);
                } else {
                    ZMap.delete(z);
                }
            }
        }

        console.log(`${x},${y}, z = ${ZMap.size}, y = ${yReboots.length}`);
        YCubes += ZMap.size;
        // console.log(`setting ${YCubes} at ${x} for key ${Ykey}`);
        Ymemo.set(Ykey, ZMap.size);

    }
    totalCubes += YCubes;
    Xmemo.set(XKey, YCubes);
}

console.log(totalCubes);

// for (let z = minZ; z <= maxZ; z++) {
//     for (let y = minY; y <= maxY; y++) {
//         for (let x = minX; x <= maxX; x++) {
//             if (x % 1000 === 0) {
//                 process.stdout.write(".");
//             }
//             const key = `${z},${y},${x}`;

//             if (instruction === 'on') {
//                 cubeMap.set(key, true);
//             } else {
//                 cubeMap.delete(key);
//             }
//         }
//     }
// }

