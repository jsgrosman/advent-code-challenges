import { getFileContents, print2dArr } from "../Utils";

type minecart = {
    row: number;
    col: number;
    dir: string;
    turn: string;
}

const nextTurn = (turn: string) => {
    switch (turn) {
        case 'left':
            return 'straight';
        case 'straight':
            return 'right';
        case 'right':
            return 'left';        
    }
    return turn;
}

const makeATurn = (m: minecart, rotation: string) => {
    switch (m.dir) {
        case 'N':
            rotation === 'clockwise' ? m.col++ : m.col--;
            rotation === 'clockwise' ? m.dir = 'E' : m.dir = 'W';
            break;
        case 'E':
            rotation === 'clockwise' ? m.row++ : m.row--;
            rotation === 'clockwise' ? m.dir = 'S' : m.dir = 'N';
            break;
        case 'S':
            rotation === 'clockwise' ? m.col-- : m.col++;
            rotation === 'clockwise' ? m.dir = 'W' : m.dir = 'E';
            break;
        case 'W':
            rotation === 'clockwise' ? m.row++ : m.row--;
            rotation === 'clockwise' ? m.dir = 'N' : m.dir = 'S';            
            break;                                          
    }
}

const checkForCollisions = (minecarts: minecart[]): number[] => {
    for (let i = 0; i < minecarts.length - 1; i++) {
        if (minecarts[i].row === minecarts[i+1].row && minecarts[i].col === minecarts[i+1].col) {
            return [minecarts[i].row,minecarts[i].col];
        }
    }
    return [];
}


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.split(/\n/g);

    const minecarts: minecart[] = [];
    const grid: string[][] = [];

    for (let row = 0; row < lines.length; row++) {
        const gridRow: string[] = [];
        const line = lines[row].split('');
        for (let col = 0; col < lines[row].length; col++) {
            const cell = line[col];
            switch (cell) {
                case '^':
                     minecarts.push( {row, col, dir: 'N', turn: 'left'});
                     gridRow.push('|');
                     break;
                case 'v':
                    minecarts.push( {row, col, dir: 'S', turn: 'left'});
                    gridRow.push('|');
                    break;
                case '>':
                    minecarts.push( {row, col, dir: 'E', turn: 'left'});
                    gridRow.push('-');
                    break;
                case '<':
                    minecarts.push( {row, col, dir: 'W', turn: 'left'});
                    gridRow.push('-');
                    break;
                default:
                    gridRow.push(cell);                                                   
            }
        }
        grid.push(gridRow);
    }

    print2dArr(grid);

    const sortMinecarts =  (m1: minecart, m2: minecart) => {
        if (m1.row < m2.row) {
            return -1;
        } else if (m1.row > m2.row) {
            return 1;
        } else {
            return m1.col - m2.col;
        }
    };

    minecarts.sort(sortMinecarts);
    console.dir(minecarts);
   
    for (let i = 0; i < 200; i++) {
        for (let m of minecarts) {
            const cell = grid[m.row][m.col];
            switch (cell) {
                case '|':
                    m.dir == 'N' ? m.row-- : m.row++;
                    break;
                case '-':
                    m.dir == 'W' ? m.col-- : m.col++;
                    break;
                case '/':
                    if (m.dir === 'S' || m.dir === 'W') {
                        makeATurn(m, 'clockwise');
                    } else {
                        makeATurn(m, 'counter-clockwise');
                    }
                    break;
                case '\\':
                    if (m.dir === 'N' || m.dir === 'W') {
                        makeATurn(m, 'counter-clockwise');
                    } else {
                        makeATurn(m, 'clockwise');
                    }                     
                    break;
                case '+':
                    if (m.turn === 'straight' && m.dir == 'N') {
                        m.row++;
                    } else if (m.turn === 'straight' && m.dir == 'S') {
                        m.row--;
                    } else if (m.turn === 'straight' && m.dir == 'W') {
                        m.col--;
                    } else if (m.turn === 'straight' && m.dir == 'E') {
                        m.col++;
                    } else if (m.turn === 'left' && m.dir == 'N') {
                        m.row--;
                        m.dir = 'S';
                    } else if (m.turn === 'left' && m.dir == 'S') {
                        m.col++;
                        m.dir = 'E';
                    } else if (m.turn === 'left' && m.dir == 'W') {
                        m.row++;
                        m.dir = 'S';
                    } else if (m.turn === 'left' && m.dir == 'E') {
                        m.row--;
                        m.dir = 'N';
                    } else if (m.turn === 'right' && m.dir == 'N') {
                        m.col++;
                        m.dir = 'E';
                    } else if (m.turn === 'right' && m.dir == 'S') {
                        m.col--;
                        m.dir = 'W';
                    } else if (m.turn === 'right' && m.dir == 'W') {
                        m.row--;
                        m.dir = 'N';
                    } else if (m.turn === 'right' && m.dir == 'E') {
                        m.row++;
                        m.dir = 'S'; 
                    }
                    m.turn = nextTurn(m.turn);
                    break;
            }
        }
        minecarts.sort(sortMinecarts);
        // console.dir(minecarts);

        const newGrid = JSON.parse(JSON.stringify(grid));
        for (let m of minecarts) {
            newGrid[m.row][m.col] = 'M';
        }
        // print2dArr(newGrid);

        const result = checkForCollisions(minecarts);
        if (result.length == 2) {
            console.log(`${result[1]},${result[0]}`);
            break;
        }

    }
    

};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);


};

part1();
// part2();