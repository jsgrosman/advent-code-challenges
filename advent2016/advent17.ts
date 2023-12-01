import { Md5 } from "ts-md5";

const STARTING_KEY = 'udskfozm';
const END_X = 3;
const END_Y = 3;

interface node {
    x: number;
    y: number;
    distance: number;
    path: string[];
}

interface point {
    x: number;
    y: number;
    dir: string;
}


const Visited: Set<node> = new Set<node>();
const ToBeVisted: Set<node> = new Set<node>();


const getNeighborOpenSpaces = (x: number, y: number, currentKey: string) => {

    const hash = Md5.hashAsciiStr(currentKey).substring(0,4);
    // console.log(`x: ${x} y: ${y} KEY: ${currentKey}, HEX: ${hash}`);

    const result: point[] = [];

    // UP
    if (y > 0 && ['b', 'c', 'd', 'e', 'f'].includes(hash.charAt(0))) {
        // console.log('adding UP');
        result.push( {x: x, y: y - 1, dir: 'U'});
    }

    // DOWN
    if (y < 3 && ['b', 'c', 'd', 'e', 'f'].includes(hash.charAt(1))) {
        // console.log('adding DOWN');
        result.push( {x: x, y: y+1, dir: 'D'});
    }

    // LEFT
    if (x > 0 && ['b', 'c', 'd', 'e', 'f'].includes(hash.charAt(2))) {
        // console.log('adding LEFT');
        result.push( {x: x-1, y: y, dir: 'L'});
    }

    // RIGHT
    if (x < 3 && ['b', 'c', 'd', 'e', 'f'].includes(hash.charAt(3))) {
        // console.log('adding RIGHT');
        result.push( {x: x+1, y: y, dir: 'R'});
    }

    // if (result.length > 1) {
    //     // if it's not the only choice, don't go to the exit.
    //    return result.filter( v => {
    //         return !(v.x === 3 && v.y === 3);
    //    });
    // } else {
    //    return result;
    // }

    return result;
    
}

const getNodeFromSetByKey = (currentKey: string, s: Set<node>) => {
    for (const node of s) { 
        if (currentKey === STARTING_KEY + node.path.join('')) {
            return node;
        }
    }
    return null;
} 

const getNodeFromSetByCoordinates = (x: number, y: number, s: Set<node>) => {
    for (const node of s) { 
        if (node.x === x && node.y === y) {
            return node;
        }
    }

    return null;
} 

ToBeVisted.add({x: 0, y: 0, distance: 0, path: []});


let maxDistance = 0;

NEXT_ROOM:
while (ToBeVisted.size > 0) {
    let [currentNode] = ToBeVisted;
    for (const tbv of ToBeVisted) {
        if (tbv.distance > currentNode.distance) {
            currentNode = tbv;
        }
    }
    // console.dir(currentNode);

    ToBeVisted.delete(currentNode);
    // Visited.add(currentNode);

    if (currentNode.x === END_X && currentNode.y === END_Y) {
        // console.log(`END: ${currentNode.distance}`);
        // console.dir(currentNode.path.join(''));
        // break;
        if (currentNode.distance > maxDistance) {
            maxDistance = currentNode.distance;
            console.log(`new max: ${maxDistance}`);
        }
        continue NEXT_ROOM;
    }

    const roomKey = STARTING_KEY + currentNode.path.join('');
    const nextRooms = getNeighborOpenSpaces(currentNode.x, currentNode.y, roomKey);
    for (const room of nextRooms) {
        if (!getNodeFromSetByKey(roomKey + room.dir, Visited)) {
            ToBeVisted.add( {
                x: room.x,
                y: room.y,
                distance: currentNode.distance + 1,
                path: [...currentNode.path, room.dir]
            });
        }
    }
}

console.log(`max distance = ${maxDistance}`);
