import { getFileContents } from "../Utils";


const part1 = () => {
   
    const serialNumber = 8772;

    const grid: Map<string, number> = new Map<string, number>();
    const allSquares: Map<string, number> = new Map<string, number>();

    
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
            allSquares.set(`${x},${y},1`, power);
        }
    }

    // console.dir(grid);

    let maxPower = 0;
    let coord = '';
    for (let squareSize = 2; squareSize <= 300; squareSize++) {
        for (let x = 1; x < 300; x++) {
            for (let y = 1; y < 300; y++) {
                
                if (x + squareSize < 300 && y + squareSize < 300) {
                    let power = allSquares.get(`${x + 1},${y + 1},${squareSize - 1}`)!;
                    power += grid.get(`${x},${y}`)!;
                    for (let x1 = x + 1, y1 = y + 1; x1 < x + squareSize; x1++, y1++) {
                        power += grid.get(`${x1},${y}`)! + grid.get(`${x},${y1}`)!
                    } 
                    allSquares.set(`${x},${y},${squareSize}`, power);
                    
                    if (power > maxPower) {
                        maxPower = power;
                        coord = `${x},${y},${squareSize}`;
                        console.log(`${x},${y},${squareSize}:${power} -> ${allSquares.size}`);
                    }
                }
            }
        }
    }
    

    // let maxPower = 0;
    // let coord = '';

    // for (let [key, value] of allSquares.entries()) {

    //     if (value > maxPower) {
    //         maxPower = value;
    //         coord = key;
    //     }
    // }
    // console.log(coord);

};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);


};

part1();
// part2();