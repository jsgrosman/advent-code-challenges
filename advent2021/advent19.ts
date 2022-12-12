import { getFileContents, point } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);
lines.push('');

interface scanner {
    id: number;
    beacons: point[];
    distances: number[];
};

const distanceSet = new Set<number>();

// 
const setDistances = (s: scanner) => {
    for (let i = 0; i < s.beacons.length; i++) {
        for (let j = i + 1; j < s.beacons.length; j++) {
            const b1 = s.beacons[i];
            const b2 = s.beacons[j];
            const dist = Math.sqrt(Math.pow(b2.y - b1.y, 2) + Math.pow(b2.x - b1.x, 2));
         
            s.distances.push(dist);
            distanceSet.add(dist);
        }
    }
}

const allScanners: scanner[] = [];

let currentScannerId = 0;
let beacons: point[] = [];
for (let line of lines) {
    if (line.startsWith('--- scanner')) {
        currentScannerId = Number(line.split(' ')[2]);
        beacons = [];
    } else if (line.trim() === '') {
        const newScanner = {
            id: currentScannerId,
            beacons,
            distances: []
        };
        setDistances(newScanner);

        allScanners.push(newScanner);
    } else {
        const [x, y] = line.split(',').map(Number);
        beacons.push({
            x, y
        });
    }
}

console.dir(allScanners, { depth: null });
console.log(`Discrete distances = ${distanceSet.size}`)