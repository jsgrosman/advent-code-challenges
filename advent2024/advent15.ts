import { getFileContents, point } from "../Utils";

const dirToMove: { [key: string]: [number, number] } = {'<': [-1, 0],'>': [1, 0],'^': [0, -1],'v': [0, 1]}
let HEIGHT = 0;
let WIDTH = 0;

const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const boxes: string[] = [];
    let robot: point = {x: 0, y: 0};
    const walls: string[] = [];

 

    let row = 0;
    for (; row < lines.length; row++) {
        if (lines[row].trim() === '') {
            break;
        }
        for (let col = 0; col < lines[row].length; col++) {
            switch (lines[row][col]) {
                case '#':
                    walls.push(`${col},${row}`);
                    break;
                case 'O':
                    boxes.push(`${col},${row}`);
                    break;
                case '@':
                    robot = { x: col, y: row};
                    break;    
            }
        }
    }
    HEIGHT = row;
    WIDTH = lines[0].length;

    const moves: string[] = [];
    row++;
    for (; row < lines.length; row++) {
        moves.push(...lines[row].split(''));
    }

    const print = (width: number, height: number) => {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (robot.x === x && robot.y === y) {
                    process.stdout.write('@');
                } else if (walls.includes(`${x},${y}`)) {
                    process.stdout.write('#');
                } else if (boxes.includes(`${x},${y}`)) {
                    process.stdout.write('O');
                } else {
                    process.stdout.write('.');
                }
            }
            process.stdout.write("\n");
        }
    }

    const moveBox = (m: string, boxPos: string) => {
        const nextBoxStr = boxPos.split(',',2).map(Number).map( (v, i) => v + dirToMove[m]![i]).join(',');
        if (walls.includes(nextBoxStr)) {
            return false;
        } else if (boxes.includes(nextBoxStr)) {
            if (moveBox(m, nextBoxStr)) {
                boxes.splice(boxes.indexOf(boxPos), 1);
                boxes.push(nextBoxStr);
                return true;
            } else {
                return false;
            }
        } else {
            boxes.splice(boxes.indexOf(boxPos), 1);
            boxes.push(nextBoxStr);
            return true;
        }
    }

    for (let m of moves) {
        const nextLoc = {x: robot.x + dirToMove[m]![0]!, y: robot.y + dirToMove[m]![1]!};
        const nextLocStr = `${nextLoc.x},${nextLoc.y}`;
        if (walls.includes(nextLocStr)) {
            continue;
        } else if (boxes.includes(nextLocStr)) {
            if (moveBox(m, nextLocStr)) {
                robot = nextLoc;
            }
        } else {
            robot = nextLoc;
        }
        print(WIDTH, HEIGHT);
    }

    const total = boxes.reduce( (p, c) => {
        const [boxX, boxY] = c.split(',',2).map(Number);
        return p + (100 * boxY) + boxX;
    }, 0);
    console.log(total);

};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const boxes: string[] = [];
    let robot: point = {x: 0, y: 0};
    const walls: string[] = [];

    let row = 0;
    for (; row < lines.length; row++) {
        if (lines[row].trim() === '') {
            break;
        }
        for (let col = 0; col < lines[row].length; col++) {
            if (lines[row][col] === '#') {
                walls.push(`${col * 2},${row}`);
                walls.push(`${(col * 2) + 1},${row}`);
            } else if (lines[row][col] === 'O') {
                boxes.push(`${col * 2},${row}`);
            } else if (lines[row][col] === '@') {
                robot = { x: col * 2, y: row};
            } 
        }
    }
    HEIGHT = row;
    WIDTH = lines[0].length * 2;

    const moves: string[] = [];
    row++;
    for (; row < lines.length; row++) {
        moves.push(...lines[row].split(''));
    }


    const print = (width: number, height: number) => {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (robot.x === x && robot.y === y) {
                    process.stdout.write('@');
                } else if (walls.includes(`${x},${y}`)) {
                    process.stdout.write('#');
                } else if (boxes.includes(`${x},${y}`)) {
                    process.stdout.write('[]');
                    x++;
                } else {
                    process.stdout.write('.');
                }
            }
            process.stdout.write("\n");
        }
    }

    print(WIDTH, HEIGHT);

    const moveLeft = (robotX: number, robotY: number) => {
        const boxesToMove: string[] = [];
        for (let x = robotX - 2; x >= 0; x -= 2) {
            if (walls.includes(`${x + 1},${robotY}`)) {
                return;
            } else if (boxes.includes(`${x},${robotY}`)) {
                boxesToMove.push(`${x},${robotY}`);
            } else {
                robot.x = robot.x - 1;
                for (let b of boxesToMove) {
                    const [nextBoxX, nextBoxY] = b.split(',',2).map(Number);
                    const nextBoxStr = `${nextBoxX - 1},${nextBoxY}`;
                    boxes.splice(boxes.indexOf(b), 1);
                    boxes.push(nextBoxStr);
                }
                return;
            }
        } 
    }

    const moveRight = (robotX: number, robotY: number) => {
        const boxesToMove: string[] = [];
        for (let x = robotX + 1; x < WIDTH; x += 2) {
            if (walls.includes(`${x},${robotY}`)) {
                return;
            } else if (boxes.includes(`${x},${robotY}`)) {
                boxesToMove.push(`${x},${robotY}`);
            } else {
                robot.x = robot.x + 1;
                for (let b of boxesToMove) {
                    const [nextBoxX, nextBoxY] = b.split(',',2).map(Number);
                    const nextBoxStr = `${nextBoxX + 1},${nextBoxY}`;
                    boxes.splice(boxes.indexOf(b), 1);
                    boxes.push(nextBoxStr);
                }
                return;
            }
        } 
    }

    const moveUp = (robotX: number, robotY: number) => {
        const boxesToMove: string[] = [];

        if (walls.includes(`${robotX},${robotY - 1}`)) {
            return;
        } else if (boxes.includes(`${robotX},${robotY - 1}`)) {
            boxesToMove.push(`${robotX},${robotY - 1}`);
        } else if (boxes.includes(`${robotX - 1},${robotY - 1}`)) {
            boxesToMove.push(`${robotX - 1},${robotY - 1}`);
        } else {
            robot.y = robot.y - 1;
            return;
        }

        for (let y = robotY - 1; y >= 0; y--) {
            const nextRow = boxesToMove.filter( (b) =>  b.split(',',2).map(Number)[1] === y);

            for (let nextB of nextRow) {
                const [nextBoxX, nextBoxY] = nextB.split(',',2).map(Number);
                if (walls.includes(`${nextBoxX},${nextBoxY - 1}`) || walls.includes(`${nextBoxX + 1},${nextBoxY - 1}`)) {
                    return;
                } else if (boxes.includes(`${nextBoxX},${nextBoxY - 1}`) || boxes.includes(`${nextBoxX + 1},${nextBoxY - 1}`) || boxes.includes(`${nextBoxX - 1},${nextBoxY - 1}`)) {
                    if (boxes.includes(`${nextBoxX},${nextBoxY - 1}`)) {
                        boxesToMove.push(`${nextBoxX},${nextBoxY - 1}`);
                    }
                    if (boxes.includes(`${nextBoxX + 1},${nextBoxY - 1}`)) {
                        boxesToMove.push(`${nextBoxX + 1},${nextBoxY - 1}`);
                    }
                    if (boxes.includes(`${nextBoxX - 1},${nextBoxY - 1}`)) {
                        boxesToMove.push(`${nextBoxX - 1},${nextBoxY - 1}`);
                    }

                } else {
                    robot.y = robot.y - 1;
                    for (let b of boxesToMove) {
                        const [nextBoxX, nextBoxY] = b.split(',',2).map(Number);
                        const nextBoxStr = `${nextBoxX},${nextBoxY - 1}`;
                        boxes.splice(boxes.indexOf(b), 1);
                        boxes.push(nextBoxStr);
                    }
                    return;
                }
            }  
        }  
    }

    const moveDown = (robotX: number, robotY: number) => {
        const boxesToMove: string[] = [];

        if (walls.includes(`${robotX},${robotY + 1}`)) {
            return;
        } else if (boxes.includes(`${robotX},${robotY + 1}`)) {
            boxesToMove.push(`${robotX},${robotY + 1}`);
        } else if (boxes.includes(`${robotX - 1},${robotY + 1}`)) {
            boxesToMove.push(`${robotX - 1},${robotY + 1}`);
        } else {
            robot.y = robot.y + 1;
            return;
        }

        for (let y = robotY + 1; y < HEIGHT; y++) {
            const nextRow = boxesToMove.filter( (b) =>  b.split(',',2).map(Number)[1] === y);

            for (let nextB of nextRow) {
                const [nextBoxX, nextBoxY] = nextB.split(',',2).map(Number);
                if (walls.includes(`${nextBoxX},${nextBoxY + 1}`) || walls.includes(`${nextBoxX + 1},${nextBoxY + 1}`)) {
                    return;
                } else if (boxes.includes(`${nextBoxX},${nextBoxY + 1}`) || boxes.includes(`${nextBoxX + 1},${nextBoxY + 1}`) || boxes.includes(`${nextBoxX - 1},${nextBoxY + 1}`)) {
                    if (boxes.includes(`${nextBoxX},${nextBoxY + 1}`)) {
                        boxesToMove.push(`${nextBoxX},${nextBoxY + 1}`);
                    }
                    if (boxes.includes(`${nextBoxX + 1},${nextBoxY + 1}`)) {
                        boxesToMove.push(`${nextBoxX + 1},${nextBoxY + 1}`);
                    }
                    if (boxes.includes(`${nextBoxX - 1},${nextBoxY + 1}`)) {
                        boxesToMove.push(`${nextBoxX - 1},${nextBoxY + 1}`);
                    }

                } else {
                    robot.y = robot.y + 1;
                    for (let b of boxesToMove) {
                        const [nextBoxX, nextBoxY] = b.split(',',2).map(Number);
                        const nextBoxStr = `${nextBoxX},${nextBoxY + 1}`;
                        boxes.splice(boxes.indexOf(b), 1);
                        boxes.push(nextBoxStr);
                    }
                    return;
                }
            }  
        }  
    }

    let count = 0;
    for (let m of moves) {
        switch (m) {
            case '<':
                moveLeft(robot.x, robot.y);
                break;
            case '>':
                moveRight(robot.x, robot.y);
                break;
            case '^':
                moveUp(robot.x, robot.y);
                break;
            case 'v':
                moveDown(robot.x, robot.y);
                break;
        }
 
        count++;

        //if (count > 100 && count < 200) {
         console.log(`MOVE ${count} = ${m}`);
            print(WIDTH, HEIGHT);
        //}
    }
    console.log(`${moves.length} ${count} moves`);


};

// part1();
part2();