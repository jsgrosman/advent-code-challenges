import { getFileContents, point, print2dArr } from "../Utils";

const contents = getFileContents().trim().split('\n');

const numKnots = 2;


const isTouching = ( h:point, t:point ) => {
    return t.x >= h.x - 1 &&
    t.x <= h.x + 1 &&
    t.y >= h.y - 1 &&
    t.y <= h.y + 1;
}

const moveTowards = (h:point, t:point, dir: string) => {

    if (t.x > h.x) {
        t.x--;
    } else if (t.x < h.x){
        t.x++;
    }
    if (t.y > h.y) {
        t.y--;
    } else if (t.y < h.y){
        t.y++;
    }
}

const printRope = () => {
    const grid: any[][] = [];
    for (let i = 0; i < 30; i++) {
        grid[i] = Array<any>(30).fill('.');
    }
    for (let i = 0; i < rope.length; i++) {
        if (grid[rope[i].y][rope[i].x] == '.') {
            grid[rope[i].y][rope[i].x] = i == 0 ? 'H' : i;
        }
    }

    for (let tail of tailMap.keys()) {
        const tPoint = JSON.parse(tail) as point;
        grid[tPoint.y][tPoint.x] = '#';
    }

    print2dArr(grid);
}

const tailMap: Map<string, boolean> = new Map<string, boolean>();

const rope: point[] = [];
for (let i = 0; i < numKnots; i++) {
    rope[i] = { x: 15, y: 15};
}

printRope();
// console.dir(rope);

tailMap.set(JSON.stringify(rope[numKnots - 1]), true);

for (let instr of contents) {
    console.log(instr);
    const [dir, dist] = instr.split(' ');

    for (let i = 0; i < Number(dist); i++) {

        switch (dir) {
            case 'U': {
                rope[0].y--;
            }
            break;
            case 'D': {
                rope[0].y++;
            }
            break;
            case 'L': {
                rope[0].x--;
            }
            break;
            case 'R': {
                rope[0].x++;
            }
            break;
        }

        for (let r = 1; r < rope.length; r++) {
            if (!isTouching(rope[r - 1], rope[r])) {
                moveTowards(rope[r - 1], rope[r], dir);
            }
        }

        // printRope();

        tailMap.set(JSON.stringify(rope[numKnots - 1]), true);

        
//        console.log(`${JSON.stringify(HPos)}:${JSON.stringify(TPos)}`);
    }


}

console.dir(tailMap);
console.log(`size: ${tailMap.size}`);