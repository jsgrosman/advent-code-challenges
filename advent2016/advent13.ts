import { point, print2dArr } from "../Utils";


const FAVORITE_NUMBER = 1364;
const END_X = 31;
const END_Y = 39;

interface node {
    x: number;
    y: number;
    distance: number;
}




const Visited: Set<node> = new Set<node>();
const ToBeVisted: Set<node> = new Set<node>();

const isOpenSpace = (x: number, y: number) => {
    const value = (x*x) + (3*x) + (2*x*y) + y + (y*y) + FAVORITE_NUMBER;
    const numberOfOnes = value.toString(2).match(/1/g)!.length;

    // console.log(`x:${x}, y:${y} ${value} => ${value.toString(2)}: ${numberOfOnes}`);

    if (numberOfOnes % 2 === 0) {
        return true;
    } else {
        return false;
    }
}

const getNeighborOpenSpaces = (x: number, y: number) => {

    const result: point[] = [];

    result.push( {x: x, y: y+1});
    result.push( {x: x+1, y: y});
    if (x > 0) {
        result.push( {x: x-1, y: y});
    }
    if (y > 0) {
        result.push( {x: x, y: y - 1});
    }

    return result.filter( (p) => {
        return isOpenSpace(p.x, p.y);
    });
}

const getNodeFromSet = (x: number, y: number, s: Set<node>) => {
    for (const node of s) { 
        if (node.x === x && node.y === y) {
            return node;
        }
    }

    return null;
} 

// const maze: string[][] = [];

// for (let y = 0; y < 40; y++) {
//     maze[y] = [];
//     for (let x = 0; x < 40; x++) {
//         if (isOpenSpace(x,y)) {
//             maze[y][x] = '.';
//         } else {
//             maze[y][x] = '#';
//         }
//     }
// }
// maze[END_Y][END_X] = 'X';

let count = 0;

ToBeVisted.add({x: 1, y: 1, distance: 0});

while (ToBeVisted.size > 0) {
    let [currentNode] = ToBeVisted;
    for (const tbv of ToBeVisted) {
        if (tbv.distance < currentNode.distance) {
            currentNode = tbv;
        }
    }
    // console.dir(currentNode);

    ToBeVisted.delete(currentNode);
    Visited.add(currentNode);

    // if (currentNode.x === END_X && currentNode.y === END_Y) {
    //     console.log(`END: ${currentNode.distance}`);
    //     break;
    // }

    if (currentNode.distance > 50) {
        continue;
    } else {
        count++;
    }

    const nextRooms = getNeighborOpenSpaces(currentNode.x, currentNode.y);
    for (const room of nextRooms) {
        if (!getNodeFromSet(room.x, room.y, Visited)) {
            const neighbor = getNodeFromSet(room.x, room.y, ToBeVisted);
            if (neighbor) {
                if (neighbor.distance > currentNode.distance + 1) {
                    neighbor.distance = currentNode.distance + 1;
                }
            } else {
                ToBeVisted.add( {
                    x: room.x,
                    y: room.y,
                    distance: currentNode.distance + 1
                });
            }
        }
    }
}

//console.dir(Visited);

//print2dArr(maze);

console.log(`Number of rooms: ${count}`);