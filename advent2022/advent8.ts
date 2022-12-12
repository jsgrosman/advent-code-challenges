import { getFileContents, point, print2dArr } from "../Utils";

const contents = getFileContents().trim().split(/\n/g);

const grid: number[][] = [];

for (let i = 0; i < contents.length; i++) {
    grid[i] = contents[i].split('').map( v => Number(v));
}

print2dArr(grid);

const outsideTreeCount = (contents.length * 4) - 4;

enum DIRECTION {
    UP,
    LEFT,
    DOWN,
    RIGHT
};

const getTreesInDirection = ( p:point, dir: DIRECTION ) => {
    switch (dir) {
        case DIRECTION.UP: {
            const ret: number[] = [];
            for (let i = 0; i < p.y; i++) {
                ret.push(grid[i][p.x]);
            }
            return ret.reverse(); 
        }
        case DIRECTION.LEFT: {
            return grid[p.y].slice(0, p.x).reverse();
        }
        case DIRECTION.DOWN: {
            const ret: number[] = [];
            for (let i = p.y + 1; i < grid.length; i++) {
                ret.push(grid[i][p.x]);
            }
            return ret;
        }
        case DIRECTION.RIGHT: {
            return grid[p.y].slice(p.x + 1);
        }
    }
}


const isVisible = ( lineOfTrees: number[], treeHeight: number) => {
    return lineOfTrees.filter( tree => tree < treeHeight ).length === lineOfTrees.length;
}

const getNumberOfVisibleTrees = ( lineOfTrees: number[], treeHeight: number): number => {

    let visibleTreeCount = 0;
    for (let tree of lineOfTrees) {
        if (tree < treeHeight) {
            visibleTreeCount++;
        } else {
            visibleTreeCount++;
            break;
        } 
    }

    return visibleTreeCount;
}

let totalVisible = outsideTreeCount;
let maxScenicScore = 0;

for (let row = 1; row < grid.length - 1; row++) {
    for (let col = 1; col < grid[row].length - 1; col++) {
        const treeHeight = grid[row][col];
        let scenicScore = 1;
        let treeIsVisible = false;

        for (let dir of [DIRECTION.UP, DIRECTION.LEFT, DIRECTION.DOWN, DIRECTION.RIGHT]) {
            if (isVisible(getTreesInDirection( {x: col, y: row}, dir ), treeHeight )) {
                treeIsVisible = true;
            }

            scenicScore *= getNumberOfVisibleTrees( getTreesInDirection( {x: col, y: row}, dir), treeHeight);
        }
        maxScenicScore = Math.max(scenicScore, maxScenicScore);
        treeIsVisible ? totalVisible++ : false;

    }
}

console.log(`Total Visible = ${totalVisible}`);
console.log(`Max scenic score = ${maxScenicScore}`);


