import { getFileContents, point } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const boxes: string[] = [];
    let robot: point = {x: 0, y: 0};
    const walls: string[] = [];

    let index = 0;
    for (; index < lines.length; index++) {
        if (lines[index].trim() === '') {
            break;
        }
        for (let col = 0; col < lines[index].length; col++) {
            if (lines[index][col] === '#') {
                walls.push(`${col},${index}`);
            } else if (lines[index][col] === 'O') {
                boxes.push(`${col},${index}`);
            } else if (lines[index][col] === '@') {
                robot = { x: col, y: index};
            } 
        }
    }

    const moves: string[] = [];
    index++;
    for (; index < lines.length; index++) {
        moves.push(...lines[index].split(''));
    }

    console.dir(moves);

    const dirToMove: { [key: string]: [number, number] } = {
        '<': [-1, 0],
        '>': [1, 0],
        '^': [0, -1],
        'v': [0, 1],
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
        const [boxX, boxY] = boxPos.split(',',2).map(Number);
        const nextBoxX = boxX + dirToMove[m]![0];
        const nextBoxY = boxY + dirToMove[m]![1];
        const nextBoxStr = `${nextBoxX},${nextBoxY}`;
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
        // console.log(m);
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
        // console.dir(boxes);
        // console.dir(robot);
        // print(10,10);
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

    let index = 0;
    for (; index < lines.length; index++) {
        if (lines[index].trim() === '') {
            break;
        }
        for (let col = 0; col < lines[index].length; col++) {
            if (lines[index][col] === '#') {
                walls.push(`${col * 2},${index}`);
                walls.push(`${(col * 2) + 1},${index}`);
            } else if (lines[index][col] === 'O') {
                boxes.push(`${col * 2},${index}`);
            } else if (lines[index][col] === '@') {
                robot = { x: col * 2, y: index};
            } 
        }
    }

    const moves: string[] = [];
    index++;
    for (; index < lines.length; index++) {
        moves.push(...lines[index].split(''));
    }

    console.dir(moves);

    const dirToMove: { [key: string]: [number, number] } = {
        '<': [-1, 0],
        '>': [1, 0],
        '^': [0, -1],
        'v': [0, 1],
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

    const moveBox = (m: string, boxPos: string) => {
        console.log(`m = ${m}, ${boxPos}`);

        const [boxX, boxY] = boxPos.split(',',2).map(Number);

        switch (m) {
            case '<': 
                if (walls.includes(`${boxX - 1},${boxY}`)) {
                    return false;
                }
                if (boxes.includes(`${boxX - 2},${robot.y}`) && moveBox(m, `${boxX - 2},${robot.y}`)) {
                    boxes.splice(boxes.indexOf(boxPos), 1);
                    boxes.push(`${boxX - 1},${boxY}`);
                    return true;
                } else if (!boxes.includes(`${boxX - 2},${boxY}`)) {
                    return false
                } else {
                    boxes.splice(boxes.indexOf(boxPos), 1);
                    boxes.push(`${boxX - 1},${boxY}`);
                    return true;
                }
                break;
            case '>':    
                if (walls.includes(`${boxX + 1},${boxY}`)) {
                    return false;
                }
                if (boxes.includes(`${boxX + 1},${robot.y}`) && moveBox(m, `${boxX + 1},${robot.y}`)) {
                    boxes.splice(boxes.indexOf(boxPos), 1);
                    boxes.push(`${boxX + 1},${boxY}`);
                    return true;
                } else if (!boxes.includes(`${boxX + 1},${boxY}`)) {
                    return false
                } else {
                    boxes.splice(boxes.indexOf(boxPos), 1);
                    boxes.push(`${boxX + 1},${boxY}`);
                    return true;
                }
                break;
            case '^':
                if (walls.includes(`${boxX},${boxY - 1}`) || walls.includes(`${boxX + 1},${boxY - 1}`) ) {
                    return false;
                }
                if (boxes.includes(`${boxX},${boxY - 1}}`) && boxes.includes(`${boxX - 1},${boxY - 1}}`) && moveBox(m, `${boxX},${boxY - 1}`) && moveBox(m, `${boxX - 1},${boxY - 1}`)) {
                    boxes.splice(boxes.indexOf(boxPos), 1);
                    boxes.push(`${boxX},${boxY - 1}`);
                    return true;
                }
                else if (boxes.includes(`${boxX},${boxY - 1}}`) && !boxes.includes(`${boxX - 1},${boxY - 1}}`) && moveBox(m, `${boxX},${boxY - 1}`)) {
                    boxes.splice(boxes.indexOf(boxPos), 1);
                    boxes.push(`${boxX},${boxY - 1}`);
                    return true;
                } else if (boxes.includes(`${boxX - 1},${boxY - 1}}`) && !boxes.includes(`${boxX},${boxY - 1}}`) && moveBox(m, `${boxX -1 },${boxY - 1}`)) {
                    boxes.splice(boxes.indexOf(boxPos), 1);
                    boxes.push(`${boxX},${boxY - 1}`);
                    return true;
                } else if (boxes.includes(`${boxX},${boxY - 1}}`) || boxes.includes(`${boxX - 1},${boxY - 1}}`)) {
                    return false;
                } else {
                    boxes.splice(boxes.indexOf(boxPos), 1);
                    boxes.push(`${boxX},${boxY - 1}`);
                }
                break;
            case 'v':
                if (walls.includes(`${boxX},${boxY + 1}`) || walls.includes(`${boxX + 1},${boxY + 1}`) ) {
                    return false;
                }
                break;
        }
    }


    print(16,8);
    for (let m of moves) {
        // console.log(m);
        print(14,7);
        const nextLoc = {x: robot.x + dirToMove[m]![0], y: robot.y + dirToMove[m]![1]};


    
        if (walls.includes(`${nextLoc.x},${nextLoc.y}`)) {
            continue;
        } else {
            switch (m) {
                case '<':
                    if (boxes.includes(`${robot.x - 2},${robot.y}`) && moveBox(m, `${robot.x - 2},${robot.y}`)) {
                        robot = nextLoc;
                    } else if (!boxes.includes(`${robot.x - 2},${robot.y}`)) {
                        robot = nextLoc;
                    }
                    break;
                case '>':    
                    if (boxes.includes(`${robot.x + 1},${robot.y}`) && moveBox(m, `${robot.x + 1},${robot.y}`)) {
                        robot = nextLoc;
                    } else if (!boxes.includes(`${robot.x + 1},${robot.y}`)) {
                        robot = nextLoc;
                    }
                    break;
                case '^':
                        if (boxes.includes(`${robot.x},${robot.y - 1}`) && moveBox(m, `${robot.x},${robot.y - 1}`)) {
                            robot = nextLoc;
                        } else if (boxes.includes(`${robot.x - 1},${robot.y - 1}`) && moveBox(m, `${robot.x - 1},${robot.y - 1}`)) {
                            robot = nextLoc;
                        } else if (!boxes.includes(`${robot.x},${robot.y - 1}`)) {
                            robot = nextLoc;
                        }
                        break;
                case 'v':
                    if (boxes.includes(`${robot.x},${robot.y + 1}`) && moveBox(m, `${robot.x},${robot.y + 1}`)) {
                        robot = nextLoc;
                    } else if (boxes.includes(`${robot.x - 1},${robot.y + 1}`) && moveBox(m, `${robot.x - 1},${robot.y + 1}`)) {
                        robot = nextLoc;
                    } else if (!boxes.includes(`${robot.x},${robot.y + 1}`)) {
                        robot = nextLoc;
                    }
                    break;    
            }
        }
          
       
    }

    const total = boxes.reduce( (p, c) => {
        const [boxX, boxY] = c.split(',',2).map(Number);
        return p + (100 * boxY) + boxX;
    }, 0);
    console.log(total);


};

// part1();
part2();