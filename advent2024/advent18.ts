import { getFileContents } from "../Utils";

const partX = () => {
    const SIZE = 71;
    const NUM_BYTES = 1024;

    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    let possibleLocations: Set<string> = new Set(['0,0']);

    let currentStep = 0;
    const corrupted: string[] = [];
    for (let index = 0;  index < NUM_BYTES; index++) {
        corrupted.push(lines[index]);
    }

    while (true) {
        console.log(`possibles: ${possibleLocations.size}`);
        currentStep++;
        let locationsOfNextStep: Set<string> = new Set<string>();
        for (let loc of possibleLocations) {
            const [x,y] = [0,1].map( (index) => +loc.split(',',2)[index] );

            for ( let [dx, dy] of [[-1,0], [1,0], [0, -1], [0, 1]]) {
                const newX = x + dx;
                const newY = y + dy;
                if (newX >= 0 && newX < SIZE && newY >= 0 && newY < SIZE) {
                    if (newX === SIZE - 1 && newY === SIZE - 1) {
                        console.log(`TOOK ${currentStep} steps`);
                        return;
                    } else if (!corrupted.includes(`${newX},${newY}`)) {
                        locationsOfNextStep.add(`${newX},${newY}`);
                    }
                }
            }
        }
       possibleLocations = locationsOfNextStep;
    }

};

const manDist = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }



const part1 = () => {
    const SIZE = 71;
    const NUM_BYTES = 1024;

    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const corrupted: string[] = [];
    for (let index = 0;  index < NUM_BYTES; index++) {
        corrupted.push(lines[index]);
    }

    const print = () => {
        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                if (corrupted.includes(`${col},${row}`)) {
                    process.stdout.write('#');
                } else {
                    process.stdout.write('.');
                }
            }
            process.stdout.write("\n");
        }
    }
    // print();

    interface node {
        x: number;
        y: number;
        steps: number;
    }

    const VISITED: Set<string> = new Set<string>();
    const NEXT: node[] = [{x: 0, y: 0, steps: 0}];

    while (NEXT.length > 0) {
        console.log(`Visited: ${VISITED.size}`);
        NEXT.sort( (a, b) => (a.steps + manDist(a.x, a.y, SIZE - 1, SIZE - 1)) - (b.steps + manDist(b.x, b.y, SIZE - 1, SIZE - 1)));

        // NEXT.sort( (a,b) => a.steps - b.steps );
        console.dir(NEXT);


        const next = NEXT.shift()!;
        VISITED.add(`${next.x},${next.y}`);

        if (next.x === SIZE - 1 && next.y === SIZE - 1) {
            console.log(`Found: ${next.steps}`);
            break;
        }

        for ( let [dx, dy] of [[-1,0], [1,0], [0, -1], [0, 1]]) {
            const newX = next.x + dx;
            const newY = next.y + dy;
            if (newX >= 0 && newX < SIZE && newY >= 0 && newY < SIZE) {
                if (!VISITED.has(`${newX},${newY}`) && !corrupted.includes(`${newX},${newY}`)) {
                    const n = NEXT.find( (v) => v.x === newX && v.y === newY);
                    if (n) {
                        if (n.steps > next.steps + 1) {
                            n.steps = next.steps + 1;
                        }
                    } else {
                        NEXT.push({x: newX, y: newY, steps: next.steps + 1});
                    }
                }
            }
        }

    }
};


const part2 = () => {
    const SIZE = 71;
    const NUM_BYTES = 3450;

    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const corrupted: string[] = [];
    

    const print = () => {
        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                if (corrupted.includes(`${col},${row}`)) {
                    process.stdout.write('#');
                } else {
                    process.stdout.write('.');
                }
            }
            process.stdout.write("\n");
        }
    }
    // print();

    interface node {
        x: number;
        y: number;
        steps: number;
        path: string[];
    }

    const transverse = () => {
        const VISITED: Set<string> = new Set<string>();
        const NEXT: node[] = [{x: 0, y: 0, steps: 0, path: ['0,0']}];

        while (NEXT.length > 0) {
            // console.log(`Visited: ${VISITED.size}`);
            NEXT.sort( (a, b) => (a.steps + manDist(a.x, a.y, SIZE - 1, SIZE - 1)) - (b.steps + manDist(b.x, b.y, SIZE - 1, SIZE - 1)));

            // NEXT.sort( (a,b) => a.steps - b.steps );

            const next = NEXT.shift()!;
            VISITED.add(`${next.x},${next.y}`);

            if (next.x === SIZE - 1 && next.y === SIZE - 1) {
                return next.path;
            }

            for ( let [dx, dy] of [[-1,0], [1,0], [0, -1], [0, 1]]) {
                const newX = next.x + dx;
                const newY = next.y + dy;
                if (newX >= 0 && newX < SIZE && newY >= 0 && newY < SIZE) {
                    if (!VISITED.has(`${newX},${newY}`) && !corrupted.includes(`${newX},${newY}`)) {
                        const n = NEXT.find( (v) => v.x === newX && v.y === newY);
                        if (n) {
                            if (n.steps > next.steps + 1) {
                                n.steps = next.steps + 1;
                                n.path = [...next.path, `${newX},${newY}`];
                            }
                        } else {
                            NEXT.push({x: newX, y: newY, steps: next.steps + 1, path: [...next.path, `${newX},${newY}`]});
                        }
                    }
                }
            }

        }
        return [];
    }

    let lastPath: string[] = transverse();
    console.dir(lastPath);
    for (let index = 0;  index < NUM_BYTES; index++) {
        corrupted.push(lines[index]);

        if (lastPath.includes(lines[index])) {
            const path = transverse();
            console.log(`${index}: ${lines[index]} ${path} ${path.length}`);
            
            if (path.length === 0) {
                break;
            }
            
        }
    }
    
    
};

// part1();
part2();