import { getFileContents } from "../Utils";


const part1 = () => {
   
    const serialNumber = 8772;

    const grid: Map<string, number> = new Map<string, number>();
    
    for (let x = 1; x < 300; x++) {
        for (let y = 1; y < 300; y++) {
            const rackId = x + 10;
            let power = rackId;
            power = power * y;
            power += serialNumber;
            power *= rackId;
            power = Math.floor(power/100 % 10);
            power -= 5;
            grid.set(`${x},${y}`, power);
        }
    }

    // console.dir(grid);

    let powerX = 1;
    let powerY = 1;
    let powerSize = 1;
    let maxPower = 0;

    for (let x = 1; x <= 300; x++) {
        for (let y = 1; y <= 300; y++) {

            for (let squareSize = 1; squareSize <= 300; squareSize++) {
                if (x + squareSize > 300 || y + squareSize > 300) {
                    break;
                }

                let total = 0;
                for (let dx = 0; dx < squareSize; dx++) {
                    for (let dy = 0; dy < squareSize; dy++) {
                        total += grid.get(`${x + dx},${y + dy}`)!;
                    }
                }
                if (total > maxPower) {
                    maxPower = total;
                    powerSize = squareSize
                    powerX = x;
                    powerY = y;
                    console.log(`max: ${maxPower}: ${powerX},${powerY},${powerSize}`);
                }
            } 
        }
    }
    
    console.log(`max: ${maxPower}: ${powerX},${powerY},${powerSize}`);
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);


};

part1();
// part2();