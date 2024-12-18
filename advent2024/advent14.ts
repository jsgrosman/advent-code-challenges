import { getFileContents, point } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const WIDTH = 101;
    const HEIGHT = 103;
    const TIME = 100;

    const robotPositions: point[] = [];
    const robotVelocities: point[] = [];

    for (let line of lines) {
        const [_,px,py,vx,vy] = line.match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/)!;        

        robotPositions.push({x:+px, y:+py});
        robotVelocities.push({x:+vx, y:+vy});
    }

    let NW = 0;
    let NE = 0;
    let SW = 0;
    let SE = 0;

    for (let index = 0; index < robotPositions.length; index++) {
        const pos = robotPositions[index];
        const speed = robotVelocities[index];

        let finalX = (pos.x + (speed.x * TIME)) % WIDTH;
        if (finalX < 0) {
            finalX = WIDTH + finalX;
        }

        let finalY = (pos.y + (speed.y * TIME)) % HEIGHT;
        if (finalY < 0) {
            finalY = HEIGHT + finalY;
        }
        
        if (finalX < Math.floor(WIDTH / 2) && finalY < Math.floor(HEIGHT / 2)) {
            console.log( `${finalX}, ${finalY} NW`);
            NW++;
        } else if (finalX > Math.floor(WIDTH / 2) && finalY < Math.floor(HEIGHT / 2)) {
            console.log( `${finalX}, ${finalY} NE`);
            NE++;
        } else if (finalX < Math.floor(WIDTH / 2) && finalY > Math.floor(HEIGHT / 2)) {
            console.log( `${finalX}, ${finalY} SW`);
            SW++;
        } else if (finalX > Math.floor(WIDTH / 2) && finalY > Math.floor(HEIGHT / 2)) {
            console.log( `${finalX}, ${finalY} SE`);
            SE++;
        } else {
            console.log( `${finalX}, ${finalY} ?`);
        }
    }
    console.log(NW * NE * SW * SE);
};


const part2 = async () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const WIDTH = 101;
    const HEIGHT = 103;

    const robotPositions: point[] = [];
    const robotVelocities: point[] = [];

    for (let line of lines) {
        const [_,px,py,vx,vy] = line.match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/)!;        

        robotPositions.push({x:+px, y:+py});
        robotVelocities.push({x:+vx, y:+vy});
    }

  
    for (let T = 0; T < 10000; T++) { 

        let NW = 0, NE = 0, SW = 0, SE = 0;
        

        const robotFinalPositions: Map<string,boolean> = new Map<string,boolean>();
        for (let index = 0; index < robotPositions.length; index++) {
            const pos = robotPositions[index];
            const speed = robotVelocities[index];

            let finalX = (pos.x + (speed.x * T)) % WIDTH;
            if (finalX < 0) {
                finalX = WIDTH + finalX;
            }

            let finalY = (pos.y + (speed.y * T)) % HEIGHT;
            if (finalY < 0) {
                finalY = HEIGHT + finalY;
            }
            robotFinalPositions.set( `${finalX},${finalY}`, true);

            if (finalX < Math.floor(WIDTH / 2) && finalY < Math.floor(HEIGHT / 2)) {
                NW++;
            } else if (finalX > Math.floor(WIDTH / 2) && finalY < Math.floor(HEIGHT / 2)) {
                NE++;
            } else if (finalX < Math.floor(WIDTH / 2) && finalY > Math.floor(HEIGHT / 2)) {
                SW++;
            } else if (finalX > Math.floor(WIDTH / 2) && finalY > Math.floor(HEIGHT / 2)) {
                SE++;
            }
        }

        if (NW > 200 || NE > 200 || SW > 200 || SE > 200) {
            let pic = '';
            for (let y = 0; y < HEIGHT; y++) {
                for (let x = 0; x < WIDTH; x++) {
                    if (robotFinalPositions.has(`${x},${y}`)) {
                        pic += "*";
                    } else {
                        pic += ".";
                    }
                }
                pic += "\n";
            }
            console.log(`T = ${T} ===========================================================`);
            console.log(pic);
            await new Promise(resolve => setTimeout(resolve, 1000));
            }
    }


};

// part1();
part2();