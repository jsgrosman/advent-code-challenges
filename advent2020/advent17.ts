import { getFileContents, getNeigborPoints } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

const transformations: point4[] = [];
const cubeMap = new Map<string, boolean>();

interface point4 {
    x: number;
    y: number;
    z: number;
    w: number;
}

interface min_max {
    minZ: number;
    maxZ: number;
    minY: number;
    maxY: number;
    minX: number;
    maxX: number;
    minW: number;
    maxW: number;
}

const print3d = (minMax: min_max) => {
    for (let w = minMax.minW; w <= minMax.maxW; w++) {
        for (let z = minMax.minZ; z <= minMax.maxZ; z++) {
            console.log(`z=${z}, w=${w}`);

            for (let y = minMax.minY; y <= minMax.maxY; y++) {
                let s = '';
                for (let x = minMax.minX; x <= minMax.maxX; x++) {
                    if (cubeMap.has(`${w},${z},${y},${x}`)) {
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
}

const getNeighbors = (cube: string) => {

    const [w, z, y, x] = cube.split(',').map(Number);
    const result: string[] = [];

    for (let t of transformations) {
        const transform = `${w + t.w},${z + t.z},${y + t.y},${x + t.x}`;
        result.push(transform);
    }

    return result;
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
        minW: Number.POSITIVE_INFINITY,
        maxW: 0,
    }

    for (let cubeLoc of cubeMap.keys()) {
        const [w, z, y, x] = cubeLoc.split(',').map(Number);
        result.minZ = Math.min(result.minZ, z);
        result.maxZ = Math.max(result.maxZ, z);
        result.minY = Math.min(result.minY, y);
        result.maxY = Math.max(result.maxY, y);
        result.minX = Math.min(result.minX, x);
        result.maxX = Math.max(result.maxX, x);
        result.minW = Math.min(result.minW, w);
        result.maxW = Math.max(result.maxW, w);
    }

    return result;
}

// create transformation array
for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
            for (let w = -1; w <= 1; w++) {
                if (!(x === 0 && y === 0 && z === 0 && w === 0)) {
                    transformations.push( {x, y, z, w} );
                }
            }
        }
    }
}


// initialize
for (let y = 0; y < lines.length; y++) {
    const dots = lines[y].split('');
    for (let x = 0; x < dots.length; x++) {
        if (dots[x] === '#') {
            cubeMap.set(`0,0,${y},${x}`, true);
        }
    }
}

print3d(getMinMax());

for (let round = 0; round < 6; round++) {
    const newCubes: string[] = [];
    const minMax = getMinMax();
    for (let w = minMax.minW - 1; w <= minMax.maxW + 1; w++) { 
        for (let z = minMax.minZ - 1; z <= minMax.maxZ + 1; z++) {
            for (let y = minMax.minY - 1; y <= minMax.maxY + 1; y++) {
                for (let x = minMax.minX - 1; x <= minMax.maxX + 1; x++) {
                    const cubeLoc = `${w},${z},${y},${x}`;
                    const neighborPoints = getNeighbors(cubeLoc);
                    const activeCount = getNumberOfCubes(neighborPoints);
                    if (cubeMap.has(cubeLoc)) {
                        if (activeCount === 2 || activeCount === 3) {
                            newCubes.push(cubeLoc);
                        }
                    } else {
                        if (activeCount === 3) {
                            newCubes.push(cubeLoc);
                        }
                    }
                }
            }
        }
    }
    cubeMap.clear();
    for (let cubeLoc of newCubes) {
        cubeMap.set(cubeLoc, true);
    }

    print3d(getMinMax());
}

console.log(`Number of active cubes: ${cubeMap.size}`);