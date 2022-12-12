import { getFileContents, getNeigborPoints } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

const transformations: point3[] = [];
const cubeMap = new Map<string, boolean>();

interface point3 {
    x: number;
    y: number;
    z: number;
}

interface min_max {
    minZ: number;
    maxZ: number;
    minY: number;
    maxY: number;
    minX: number;
    maxX: number;
}

const print3d = (minMax: min_max) => {
    for (let z = minMax.minZ; z <= minMax.maxZ; z++) {
        console.log(`z=${z}`);

        for (let y = minMax.minY; y <= minMax.maxY; y++) {
            let s = '';
            for (let x = minMax.minX; x <= minMax.maxX; x++) {
                if (cubeMap.has(`${z},${y},${x}`)) {
                    s += '#';
                } else {
                    s += '.';
                }
            }
            console.log(s);
        }
        console.log();
    }
}


const getNumberOfCubes = (cells: string[]) => {
    let result = 0;

    for (let cell of cells) {
        if (cubeMap.has(cell)) {
            result++;
        }
    }
    return result;
}

const getMinMax = () => {
    const result = {
        minZ: Number.POSITIVE_INFINITY,
        maxZ: 0,
        minY: Number.POSITIVE_INFINITY,
        maxY: 0,
        minX: Number.POSITIVE_INFINITY,
        maxX: 0,
    }

    for (let cubeLoc of cubeMap.keys()) {
        const [z, y, x] = cubeLoc.split(',').map(Number);
        result.minZ = Math.min(result.minZ, z);
        result.maxZ = Math.max(result.maxZ, z);
        result.minY = Math.min(result.minY, y);
        result.maxY = Math.max(result.maxY, y);
        result.minX = Math.min(result.minX, x);
        result.maxX = Math.max(result.maxX, x);
    }

    return result;
}





// initialize
for (let line of lines) {
    console.log(line);
    const match = line.match(/(on|off) x=(\-*\d+)\.\.(\-*\d+),y=(\-*\d+)\.\.(\-*\d+),z=(\-*\d+)\.\.(\-*\d+)/) || [];
    
    const instruction = match[1];
    const minX = Number(match[2]);
    const maxX = Number(match[3]);
    const minY = Number(match[4]);
    const maxY = Number(match[5]);
    const minZ = Number(match[6]);
    const maxZ = Number(match[7]);

    for (let z = minZ; z <= maxZ; z++) {
        for (let y = minY; y <= maxY; y++) {
            for (let x = minX; x <= maxX; x++) {
                if (x % 1000 === 0) {
                    process.stdout.write(".");
                }
                const key = `${z},${y},${x}`;

                if (instruction === 'on') {
                    cubeMap.set(key, true);
                } else {
                    cubeMap.delete(key);
                }
            }
        }
    }
    


}



console.log(`Number of active cubes: ${cubeMap.size}`);