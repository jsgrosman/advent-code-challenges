import { getFileContents } from "../Utils";

type coord = {
    x: number;
    y: number;
}

const doMove = (currentCoord: coord, dir: string): coord => {
    switch (dir) {
        case 'e':
            return {x: currentCoord.x + 1, y: currentCoord.y};
        case 'w': 
            return {x: currentCoord.x - 1, y: currentCoord.y};
        case 'ne':
            return {x: currentCoord.y % 2 == 0 ? currentCoord.x : currentCoord.x + 1, y: currentCoord.y - 1};
        case 'nw':
            return {x: currentCoord.y % 2 == 0 ? currentCoord.x - 1 : currentCoord.x, y: currentCoord.y - 1};
        case 'se':
            return {x: currentCoord.y % 2 == 0 ? currentCoord.x : currentCoord.x + 1, y: currentCoord.y + 1};
        case 'sw':
            return {x: currentCoord.y % 2 == 0 ? currentCoord.x - 1 : currentCoord.x, y: currentCoord.y + 1};
    }
    return currentCoord;
}

const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);


    const tileMap: Map<string, string> = new Map<string, string>();

    for (let line of lines) {
        const result = line.matchAll(/(sw|se|nw|ne|e|w)/g);
        

        let currentCoord = {x: 0, y: 0};
        for (let move of result) {
            const dir = move[0];
            currentCoord = doMove(currentCoord, dir);
        }
        const key = `${currentCoord.x},${currentCoord.y}`;
        if (tileMap.has(key)) {
            tileMap.delete(key);
        } else {
            tileMap.set(key, 'black');
        }
    }
    // console.dir(tileMap);
    console.log(`Answer 1: ${tileMap.size}`)

};



const part2 = () => {
    const NUM_MOVES = 100;

    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const tileMap: Map<string, string> = new Map<string, string>();

    for (let line of lines) {
        const result = line.matchAll(/(sw|se|nw|ne|e|w)/g);
        let currentCoord = {x: 0, y: 0};
        for (let move of result) {
            const dir = move[0];
            currentCoord = doMove(currentCoord, dir);
        }
        const key = `${currentCoord.x},${currentCoord.y}`;
        if (tileMap.has(key)) {
            tileMap.delete(key);
        } else {
            tileMap.set(key, 'black');
        }
    }

    const neighbors = ['e','w','ne','nw','se','sw'];
    
    for (let i = 0; i < NUM_MOVES; i++) {
        const flips: string[] = [];
        const whiteTiles: Map<string, number> = new Map<string, number>();
        for (let blackCoord of tileMap.keys()) {
            const [x, y] = blackCoord.split(',').map(Number);
            let numBlackNeighbors = 0;
            for (let n of neighbors) {
                const newCoord = doMove({x, y}, n);
                const newKey = `${newCoord.x},${newCoord.y}`;
                if (tileMap.has(newKey)) {
                    numBlackNeighbors++;
                } else {
                    if (whiteTiles.has(newKey)) {
                        whiteTiles.set(newKey, whiteTiles.get(newKey)! + 1);
                    } else {
                        whiteTiles.set(newKey, 1);
                    }
                }
            }
            if (numBlackNeighbors === 0 || numBlackNeighbors > 2) {
                flips.push(blackCoord);
            }
        }
        for (let [whiteCoord, count] of whiteTiles.entries()) {
            if (count === 2) {
                tileMap.set(whiteCoord, 'black');
            }
        }
        for (let blackCoord of flips) {
            tileMap.delete(blackCoord);
        }
        // console.log(`Day ${i + 1}: ${tileMap.size}`);
    }
    console.log(`Answer 2: ${tileMap.size}`);

};

part1();
part2();