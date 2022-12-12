

interface probe {
    x: number;
    y: number;
    dx: number;
    dy: number;
}

// v function
// y = v0 * t + 1/2 * ay * t^2
// x = v0 * t + 1/2 * ax * t^2

// aY = -2
// aX = -1

const p = {
    x: 0,
    y: 0,
    dx: 17,
    dy: -4
}

const targetArea = {
    minX: 32,
    maxX: 65,
    minY: -225,
    maxY: -177
}

// const targetArea = {
//         minX: 20,
//         maxX: 30,
//         minY: -10,
//         maxY: -5
//     }

const runSimulation = (p: probe) => {
    let maxHeight = Number.NEGATIVE_INFINITY;

    for (let t = 1;;t++) {
        p.x += p.dx;
        p.y += p.dy;
        p.dy -= 1;
        p.dx = p.dx > 0 ? p.dx - 1 : p.dx;
        
        maxHeight = Math.max(p.y, maxHeight);
    
        if (p.x >= targetArea.minX
            && p.x <= targetArea.maxX
            && p.y >= targetArea.minY
            && p.y <= targetArea.maxY) {
                // console.log("in target area");
                return maxHeight;
            } else if (p.x > targetArea.maxX || p.y < targetArea.minY) {
                // console.log("missed target area");
                return Number.NEGATIVE_INFINITY;
        }
    }
}

let count = 0;

for (let startX = 1; startX  <= 65; startX++) {
    for (let startY = -300; startY  < 5000; startY++) {
        const testProbe = {
            x: 0,
            y: 0,
            dx: startX,
            dy: startY
        };
        // console.dir(testProbe);

        const height = runSimulation(testProbe);

        if (height > Number.NEGATIVE_INFINITY) {
            console.log(`${startX}, ${startY}`);
            count++;
            // console.log(`${startX}, ${startY}, ${height}`);
            // console.dir(testProbe);
        }

        //maxHeight = Math.max(height, maxHeight);

        
    }
}

console.log(count);


