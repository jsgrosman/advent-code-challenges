import { getFileContents, getRightNeighborValues, getLeftNeighborValues, getUpNeighborValues, getDownNeighborValues, getDiagNeighborValues } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);


    const grid: string[][] = [];
    for (let line of lines) {
        grid.push(line.split(''));
    }

    let count = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 'X') {
                const words = [
                    getRightNeighborValues({x,y}, grid).slice(0,3).join(''),
                    getLeftNeighborValues({x,y}, grid).slice(0,3).join(''),
                    getUpNeighborValues({x,y}, grid).slice(0,3).join(''),
                    getDownNeighborValues({x,y}, grid).slice(0,3).join(''),
                    getDiagNeighborValues({x,y}, grid, -1, -1).slice(0,3).join(''),
                    getDiagNeighborValues({x,y}, grid, -1, 1).slice(0,3).join(''),
                    getDiagNeighborValues({x,y}, grid, 1, -1).slice(0,3).join(''),
                    getDiagNeighborValues({x,y}, grid, 1, 1).slice(0,3).join(''),
                ];
                //console.dir(words);
                count += words.filter( (v) => v === 'MAS').length;
            }

        }
    }
    console.log(`count = ${count}`);
    
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);


    const grid: string[][] = [];
    for (let line of lines) {
        grid.push(line.split(''));
    }

    let count = 0;
    for (let y = 1; y < grid.length - 1; y++) {
        for (let x = 1; x < grid[y].length - 1; x++) {
            if (grid[y][x] === 'A') {
                if ((grid[y + 1][x + 1] == 'S' && grid[y - 1][x - 1] == 'M') ||
                    (grid[y + 1][x + 1] == 'M' && grid[y - 1][x - 1] == 'S')) {
                        if ((grid[y + 1][x - 1] == 'S' && grid[y - 1][x + 1] == 'M') ||
                        (grid[y + 1][x - 1] == 'M' && grid[y - 1][x + 1] == 'S')) {
                            count++;
                        }
                }

            }

        }
    }
    console.log(`count = ${count}`);


};

//part1();
part2();