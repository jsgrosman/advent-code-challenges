import { getFileContents, point, pointCompare } from "../Utils";

const contents = getFileContents().trim().split('\n');

const isTouching = () => {
    return TPos.x >= HPos.x - 1 &&
    TPos.x <= HPos.x + 1 &&
    TPos.y >= HPos.y - 1 &&
    TPos.y <= HPos.y + 1;
}

const moveTowards = (dir: string) => {
    switch (dir) {
        case 'U': {
            if (TPos.x === HPos.x) {
                TPos.y--;
            } else if (TPos.x > HPos.x) {
                TPos.y--;
                TPos.x--;
            } else {
                TPos.y--;
                TPos.x++;
            }
        }
        break;
        case 'D': {
            if (TPos.x === HPos.x) {
                TPos.y++;
            } else if (TPos.x > HPos.x) {
                TPos.y++;
                TPos.x--;
            } else {
                TPos.y++;
                TPos.x++;
            }
        }
        break;
        case 'L': {
            if (TPos.y === HPos.y) {
                TPos.x--;
            } else if (TPos.y > HPos.y) {
                TPos.y--;
                TPos.x--;
            } else {
                TPos.y++;
                TPos.x--;
            }
        }
        break;
        case 'R': {
            if (TPos.y === HPos.y) {
                TPos.x++;
            } else if (TPos.y > HPos.y) {
                TPos.y--;
                TPos.x++;
            } else {
                TPos.y++;
                TPos.x++;
            }
        }
        break;
    }
}


const tailMap: Map<string, boolean> = new Map<string, boolean>();

let HPos = { x: 0, y: 0};
let TPos = { x: 0, y: 0};

tailMap.set(`${TPos.x},${TPos.y}`, true);


for (let instr of contents) {
    // console.log(instr);
    const [dir, dist] = instr.split(' ');

    for (let i = 0; i < Number(dist); i++) {

        switch (dir) {
            case 'U': {
                HPos.y--;
            }
            break;
            case 'D': {
                HPos.y++;
            }
            break;
            case 'L': {
                HPos.x--;
            }
            break;
            case 'R': {
                HPos.x++;
            }
            break;
        }
        if (!isTouching()) {
            moveTowards(dir);
            tailMap.set(`${TPos.x},${TPos.y}`, true);
        }
//        console.log(`${JSON.stringify(HPos)}:${JSON.stringify(TPos)}`);
    }

}

console.dir(tailMap);
console.log(`size: ${tailMap.size}`);