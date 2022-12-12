import { getFileContents, print2dArr } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);
lines.push('');

const stripBorder = (tile: string[][]) => {

    tile.shift();
    tile.pop();

    for (let line of tile) {
        line.shift();
        line.pop();
    }

}

interface tile {
    id: number;
    up: number[];
    down: number[];
    left: number[];
    right: number[];

    tile: string[][];
    matches: number;

    horizontal: Set<number>;
    vertical: Set<number>;
};

const allTiles = new Map<number, tile>();

let currentTile = 0;
let tile: string[][] = [];
for (let line of lines) {

    if (line.startsWith('Tile')) {
        currentTile = Number(line.split(' ')[1].replace(':', ''));
        tile = [];
    } else if (line.trim() === '') {
        
        const up = parseInt(tile[0].map( (v) => v === '#' ? '1' : '0').join(''), 2);
        const down  = parseInt(tile[tile.length - 1].map( (v) => v === '#' ? '1' : '0').join(''), 2);
        const left = parseInt(tile.map( v => v[0]).map( (v) => v === '#' ? '1' : '0').join(''), 2);
        const right = parseInt(tile.map( v => v[v.length - 1]).map( (v) => v === '#' ? '1' : '0').join(''), 2);

        const upRev = parseInt(tile[0].map( (v) => v === '#' ? '1' : '0').reverse().join(''), 2);
        const downRev  = parseInt(tile[tile.length - 1].map( (v) => v === '#' ? '1' : '0').reverse().join(''), 2);
        const leftRev = parseInt(tile.map( v => v[0]).map( (v) => v === '#' ? '1' : '0').reverse().join(''), 2);
        const rightRev = parseInt(tile.map( v => v[v.length - 1]).map( (v) => v === '#' ? '1' : '0').reverse().join(''), 2);

        stripBorder(tile);
        allTiles.set(currentTile, {
            id: currentTile,
            up: [up, upRev],
            down: [down, downRev],
            left: [left, leftRev],
            right: [right, rightRev],
            tile,
            matches: 0,
            vertical: new Set<number>(),
            horizontal: new Set<number>()
        });
    } else {
        tile.push(line.split(''));
    }
}



const hasMatch = (edge: number, arr: tile[]) => {

    for (let t of arr) {
        if ([t.up[0], t.up[1], t.down[0], t.down[1], t.left[0], t.left[1], t.right[0], t.right[1]].includes(edge)) {
            return t.id;
        }
    }

    return -1;

}

const flip = (tile: string[][]) => {
    tile.reverse();
}

const rotate = (tile: string[][]) => {
    for (let t of tile) {
        t.reverse();
    }
}


for (let t of allTiles.values()) {

    const id = t.id;
    let matches = 0;

    const remainingTiles = Array.from(allTiles.values()).filter( v => v.id !== t.id);



    for (let edgeNum of [t.up[0], t.down[0]]) {
        const matchId = hasMatch(edgeNum, remainingTiles);
        if (matchId > 0) {
            t.vertical.add(matchId);
            matches++;
        }
    }

    for (let edgeNum of [t.up[1], t.down[1]]) {
        const matchId = hasMatch(edgeNum, remainingTiles);
        if (matchId > 0) {
            t.vertical.add(matchId);
            matches++;
        }
        flip(t.tile);
    }

    for (let edgeNum of [t.left[0], t.right[0]]) {
        const matchId = hasMatch(edgeNum, remainingTiles);
        if (matchId > 0) {
            t.horizontal.add(matchId);
            matches++;
        }
    }

    for (let edgeNum of [t.left[1], t.right[1]]) {
        const matchId = hasMatch(edgeNum, remainingTiles);
        if (matchId > 0) {
            t.horizontal.add(matchId);
            matches++;
        }
        rotate(t.tile);
    }
  
    t.matches = (matches / 2);

}

// console.dir(allTiles);

const addImage = (tile: string[][], image: string[][], index: number) => {

    
    for (let i = 0; i < tile.length; i++) {
        if (i + index >= image.length) {
            image.push([]);
        }
        image[i + index].push(...tile[i]);
    }

}

const corners = Array.from(allTiles.values()).filter( (v) => v.matches === 2).map( v => v.id);
console.dir(corners);
const gridSize = Math.sqrt(allTiles.size);

// console.log( allTiles.filter( (v) => v.matches === 2).map( v => v.id).reduce( (c, p) => c * p, 1));

// const corners = allTiles.filter( (v) => v.matches === 2).map( v => v.id);



let image: string[][] = [];
// for (let i = 0; i < allTiles.get(corners[0])!.tile.length * gridSize; i++) {
//     image.push([]);
// }

let farLeft = corners[1];
let t = farLeft;
for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        process.stdout.write(t + " ");
        const tile = allTiles.get(t)!;
        // print2dArr(tile.tile)
        addImage(tile.tile, image, i * tile.tile.length);
        for (let horz of tile.horizontal) {
            if (horz != t) {
                t = horz;
                break;
            }
        }
    }
    
    const farLeftTile = allTiles.get(farLeft)!;
    for (let vert of farLeftTile.vertical) {
        if (vert != farLeft) {
            farLeft = vert;
            t = farLeft;
            break;
        }
    }

    console.log();
}

print2dArr(image);
console.log(`${image.length}, ${image[0].length}`);
