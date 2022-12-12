const burrow = new Map<number, space>();

interface space {
    id: number;
    nextRooms: number[];
    isHomeSpace: boolean;
    isDoorway: boolean;
    occupant?: 'A'|'B'|'C'|'D';
}

interface movement {
    type: 'A'|'B'|'C'|'D';
    start: number;
    destination: number;
    distance: number;
    cost: number;
}

const homes = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26
];

const doorways = [
    2, 4, 6, 8
];

const hallways = [
    0, 1, 3, 5, 7, 9, 10
];

const cost = {
    'A': 1,
    'B': 10,
    'C': 100,
    'D': 1000
};

const o = (index: number) => {
    if (burrow.get(index)!.occupant == undefined) {
        return '.';
    } else {
        return burrow.get(index)!.occupant;
    }

}
const printBurrow = () => {

    let s = `#############\n`;
    s += '#';
    for (let i = 0; i <= 10; i++) {
        s += o(i);
    }
    s += '#\n';
    s += `###${o(11)}#${o(12)}#${o(13)}#${o(14)}###\n`;
    s += `  #${o(15)}#${o(16)}#${o(17)}#${o(18)}#  \n`;
    s += `  #${o(19)}#${o(20)}#${o(21)}#${o(22)}#  \n`;
    s += `  #${o(23)}#${o(24)}#${o(25)}#${o(26)}#  \n`;
    s += `  #########  \n`;
    
    // #0123456789X#
    // ###B#C#B#D###
    //   #A#D#C#A#
    //   #########

    return s;

}

const getDistance = (start: number, end: number, distance = 0, visited = '') => {
    visited += `|${start}|`;
    const startRoom = burrow.get(start)!;
    const endRoom = burrow.get(end)!;
    if (startRoom.nextRooms.includes(end) && endRoom.occupant == undefined) {
        return distance + 1;
    }
    else {
        let minDistance = Number.MAX_VALUE;
        for (let next of startRoom.nextRooms) {
            const nextRoom = burrow.get(next)!;
            if (!visited.includes(`|${next}|`) && nextRoom.occupant == undefined) {
                const dist = getDistance(next, end, distance + 1, `${visited}`);
                if (dist > -1) {
                    minDistance = Math.min(dist, minDistance);
                }
                
            }
        }
        if (minDistance === Number.MAX_VALUE) {
           return -1;
        } else {
            return minDistance;
        }
    }
}
const getWinningRoomsForOccupant = (occupant: string|undefined) => {
    switch (occupant) {
        case 'A' : {
            return [23, 19, 15, 11];
        }
        case 'B' : {
            return [24, 20, 16, 12];
        }
        case 'C' : {
            return [25, 21, 17, 13];
        }
        case 'D' : {
            return [26, 22, 18, 14];
        }
    }
    return [];
}

const isEmptyRoom = (roomNumber: number) => {
    return burrow.get(roomNumber)!.occupant === undefined;
}

const roomContains = (roomNumber: number, occupant: string|undefined) => {
    return burrow.get(roomNumber)!.occupant === occupant;
}

const inWinningRoom = (roomNumber: number, occupant: string|undefined) => {
    const winningRooms = getWinningRoomsForOccupant(occupant);
    for (let w of winningRooms) {
        if (roomNumber === w && roomContains(w, occupant)) {
            return true;
        } else if (!roomContains(w, occupant)) {
            return false;
        }
    }
 
    return false;
}

const success = () => {

    for (let lizard of ['A','B','C','D']) {
        for (let room of getWinningRoomsForOccupant(lizard)) {
            if (!roomContains(room, lizard)) {
                return false;
            }
        }
    }   
    return true;
}

const getBestMove = ( possibles: movement[] ) => {


    const outerMoves: movement[] = [];

    for (let m of possibles) {
        const winningRooms = getWinningRoomsForOccupant(m.type);
        if (winningRooms.includes(m.destination)) {
            return m;
        }
        
        // if ([0, 1, 9, 10].includes(m.destination)) {
        //     outerMoves.push(m);
        // }
       
    }
    if (outerMoves.length > 0) {
        return outerMoves[Math.floor(Math.random() * outerMoves.length)];
    } else {
        return possibles[Math.floor(Math.random() * possibles.length)];
    }
}

const burrowToString = () => {
    let s = '';
    for (let i = 0; i <= 26; i++) {
        const o = burrow.get(i)!.occupant;
        if (o) {
            s += o + ",";
        } else {
            s += 'X,';
        }
    }
    return s.substring(0, s.length - 1);
}

const stringToBurrow = (key: string) => {
    const rooms = key.split(',');
    for (let i = 0; i < rooms.length; i++) {
        const roomOccupant = rooms[i];
        if (roomOccupant === 'A' || roomOccupant === 'B' || roomOccupant === 'C' || roomOccupant === 'D') {
            burrow.get(i)!.occupant = roomOccupant;
        } else {
            burrow.get(i)!.occupant = undefined;
        }
    }
}

// #############
// #0123456789X#
// ###B#C#B#D###
//   #A#D#C#A#
//   #########


burrow.set(0, {
    id: 0,
    nextRooms: [1],
    isHomeSpace: false,
    isDoorway: false
});
burrow.set(1, {
    id: 1,
    nextRooms: [0,2],
    isHomeSpace: false,
    isDoorway: false
});
burrow.set(2, {
    id: 2,
    nextRooms: [1,3,11],
    isHomeSpace: false,
    isDoorway: true
});
burrow.set(3, {
    id: 3,
    nextRooms: [2,4],
    isHomeSpace: false,
    isDoorway: false
});
burrow.set(4, {
    id: 4,
    nextRooms: [3,5,12],
    isHomeSpace: false,
    isDoorway: true
});
burrow.set(5, {
    id: 5,
    nextRooms: [4,6],
    isHomeSpace: false,
    isDoorway: false
});
burrow.set(6, {
    id: 6,
    nextRooms: [5,7,13],
    isHomeSpace: false,
    isDoorway: true
});
burrow.set(7, {
    id: 7,
    nextRooms: [6,8],
    isHomeSpace: false,
    isDoorway: false
});
burrow.set(8, {
    id: 8,
    nextRooms: [7,9,14],
    isHomeSpace: false,
    isDoorway: true
});
burrow.set(9, {
    id: 9,
    nextRooms: [8,10],
    isHomeSpace: false,
    isDoorway: false
});
burrow.set(10, {
    id: 10,
    nextRooms: [9],
    isHomeSpace: false,
    isDoorway: false
});
burrow.set(11, {
    id: 11,
    nextRooms: [2, 15],
    isHomeSpace: true,
    isDoorway: false
});
burrow.set(12, {
    id: 12,
    nextRooms: [4, 16],
    isHomeSpace: true,
    isDoorway: false
});
burrow.set(13, {
    id: 13,
    nextRooms: [6, 17],
    isHomeSpace: true,
    isDoorway: false
});
burrow.set(14, {
    id: 14,
    nextRooms: [8, 18],
    isHomeSpace: true,
    isDoorway: false
});
burrow.set(15, {
    id: 15,
    nextRooms: [11, 19],
    isHomeSpace: true,
    isDoorway: false
});
burrow.set(16, {
    id: 16,
    nextRooms: [12, 20],
    isHomeSpace: true,
    isDoorway: false
});
burrow.set(17, {
    id: 17,
    nextRooms: [13, 21],
    isHomeSpace: true,
    isDoorway: false
});
burrow.set(18, {
    id: 18,
    nextRooms: [14, 22],
    isHomeSpace: true,
    isDoorway: false
});
burrow.set(19, {
    id: 19,
    nextRooms: [15, 23],
    isHomeSpace: true,
    isDoorway: false
});
burrow.set(20, {
    id: 20,
    nextRooms: [16, 24],
    isHomeSpace: true,
    isDoorway: false
});
burrow.set(21, {
    id: 21,
    nextRooms: [17, 25],
    isHomeSpace: true,
    isDoorway: false
});
burrow.set(22, {
    id: 22,
    nextRooms: [18, 26],
    isHomeSpace: true,
    isDoorway: false
});
burrow.set(23, {
    id: 23,
    nextRooms: [19],
    isHomeSpace: true,
    isDoorway: false
});
burrow.set(24, {
    id: 24,
    nextRooms: [20],
    isHomeSpace: true,
    isDoorway: false
});
burrow.set(25, {
    id: 25,
    nextRooms: [21],
    isHomeSpace: true,
    isDoorway: false
});
burrow.set(26, {
    id: 26,
    nextRooms: [22],
    isHomeSpace: true,
    isDoorway: false
});



// console.dir(burrow, {depth: null});

 
const getNextMoves = () => {
    const possibleMoves: movement[] = [];
    for (let homeId = 0; homeId <= 26; homeId++) {
        const room = burrow.get(homeId)!;
        if (isEmptyRoom(homeId)) {
            continue;
        } else if (inWinningRoom(homeId, room.occupant)) {
            continue;
        } else if (room.occupant) {
                const winningRooms = getWinningRoomsForOccupant(room.occupant);
                for (let w of winningRooms) {
                    const distance = getDistance(homeId, w);
                    if (distance > 0) {
                        possibleMoves.push({
                            type: room.occupant,
                            start: homeId,
                            destination: w,
                            distance,
                            cost: distance * cost[room.occupant]
                        });
                        break;
                    } else if (!roomContains(w, room.occupant)) {
                        break;
                    }
                }

                if (homeId > 10) {
                    for (let r of hallways) {
                        const distance = getDistance(homeId, r); 
                        if (distance > 0) {
                            possibleMoves.push({
                                type: room.occupant,
                                start: homeId,
                                destination: r,
                                distance,
                                cost: distance * cost[room.occupant]
                            });
                        }
                    }
                }
            }
        }

        const winningMoves: movement[] = [];
        for (let p = 0; p < possibleMoves.length; p++) {
            const m = possibleMoves[p];
            const winningRooms = getWinningRoomsForOccupant(m.type);
            if (winningRooms.includes(m.destination)) {
                winningMoves.push(m);
                possibleMoves.splice(p, 1);
                p--;
            }
        }
        possibleMoves.sort( (a, b) => a.cost - b.cost);
        possibleMoves.unshift(...winningMoves);

        return possibleMoves;
}

const memo = new Map<string, number>();

let minCost = Number.MAX_VALUE;
const dfs = (burrowKey: string, totalCost: number, visitedMap: Map<string, boolean>) => {
    // console.log(burrowKey);

    if (memo.has(burrowKey)) {
        return memo.get(burrowKey)!;
    }

    // stringToBurrow(burrowKey);
    visitedMap.set(burrowKey, true);
    // console.log(printBurrow());

    if (success()) {
        console.log(`SUCCESS with cost ${totalCost}`);
        if (totalCost < minCost) {
            console.log(`setting minimum: ${totalCost}`);
            console.log(burrowKey);
            minCost = totalCost;
            console.dir(visitedMap);
        }
        
        visitedMap.delete(burrowKey);
        return totalCost;
    }



    let minCostFromHere = Number.MAX_VALUE;
    const moves = getNextMoves();
    // console.log(`Number of possible moves = ${moves.length}`);
    for (let m of moves) {
        burrow.get(m.start)!.occupant = undefined;
        burrow.get(m.destination)!.occupant = m.type;
        const nextBurrowKey = burrowToString();
       // if (!visitedMap.has(nextBurrowKey)) {
            const cost = dfs(nextBurrowKey, totalCost + m.cost, visitedMap);
            minCostFromHere = Math.min(cost, minCostFromHere);
        // } else {
        //    // console.log(`Already visited ${nextBurrowKey}`);
        // }
        burrow.get(m.destination)!.occupant = undefined;
        burrow.get(m.start)!.occupant = m.type;
    }

    
    visitedMap.delete(burrowKey);
    memo.set(burrowKey, minCostFromHere);

    return minCostFromHere;
}

for (let r = 0; r <= 10; r++) {
        burrow.get(r)!.occupant = undefined;
    }
burrow.get(11)!.occupant = 'B';
burrow.get(12)!.occupant = 'C';
burrow.get(13)!.occupant = 'B';
burrow.get(14)!.occupant = 'D';

burrow.get(15)!.occupant = 'A';
burrow.get(16)!.occupant = 'D';
burrow.get(17)!.occupant = 'C';
burrow.get(18)!.occupant = 'A';

burrow.get(19)!.occupant = 'A';
burrow.get(20)!.occupant = 'B';
burrow.get(21)!.occupant = 'C';
burrow.get(22)!.occupant = 'D';

burrow.get(23)!.occupant = 'A';
burrow.get(24)!.occupant = 'B';
burrow.get(25)!.occupant = 'C';
burrow.get(26)!.occupant = 'D';


const config = 'X,X,X,X,X,X,X,X,X,X,X,B,C,B,D,D,C,B,A,D,B,A,C,A,D,C,A';
stringToBurrow(config);
// console.log(burrowToString());
console.log(printBurrow());
// console.dir(getNextMoves());

const startingKey = burrowToString();
console.log(startingKey);
const returnedCost = dfs(startingKey, 0, new Map<string, boolean>());
console.log(`min cost: ${minCost}`);
console.log(`other cost: ${returnedCost}`);



// let minCost = Number.MAX_VALUE;
// let minBurrowMoves = '';

// nextAttempt:
// for (let i = 0; i < 50000; i++) {
    
//     const visitedMap = new Map<string, boolean>();

//     let burrowMoves = '';

//     for (let r = 0; r <= 10; r++) {
//         burrow.get(r)!.occupant = undefined;
//     }
//     burrow.get(11)!.occupant = 'B';
//     burrow.get(12)!.occupant = 'B';
//     burrow.get(13)!.occupant = 'D';
//     burrow.get(14)!.occupant = 'D';
    
//     burrow.get(15)!.occupant = 'D';
//     burrow.get(16)!.occupant = 'C';
//     burrow.get(17)!.occupant = 'B';
//     burrow.get(18)!.occupant = 'A';
    
//     burrow.get(19)!.occupant = 'D';
//     burrow.get(20)!.occupant = 'B';
//     burrow.get(21)!.occupant = 'A';
//     burrow.get(22)!.occupant = 'C';
    
//     burrow.get(23)!.occupant = 'C';
//     burrow.get(24)!.occupant = 'C';
//     burrow.get(25)!.occupant = 'A';
//     burrow.get(26)!.occupant = 'A';
//     visitedMap.set(printBurrow(), true);
//     burrowMoves += printBurrow();

//     let totalCost = 0;
//     let isSuccess = false;
//     possibleMoves = [];
//     getNextMoves();

//     const bestMoves: movement[] = [];

//    // while (!isSuccess) {

//     while (true) {
//         // console.dir(possibleMoves);
//         const bestMove = getBestMove(possibleMoves);
//         if (bestMove === undefined) {
//             continue nextAttempt;
//         }
//         bestMoves.push(bestMove);
//         // console.dir(bestMove);
//         burrow.get(bestMove.start)!.occupant = undefined;
//         burrow.get(bestMove.destination)!.occupant = bestMove.type;
//         if (visitedMap.has(printBurrow())) {
//             burrow.get(bestMove.destination)!.occupant = undefined;
//             burrow.get(bestMove.start)!.occupant = bestMove.type;
//             continue;
//         } else {
//             visitedMap.set(printBurrow(), true);
//         }


//         burrowMoves += printBurrow();
//         // console.log(printBurrow());
//         // console.log(`cost: ${bestMove.cost}`);
//         // console.log(`total cost: ${totalCost}`);
//         totalCost += bestMove.cost;
//         isSuccess = success();
//         if (isSuccess) {
//             break;
//         }
//         // console.dir(burrow);

//         possibleMoves = [];
//         getNextMoves();
//         if (possibleMoves.length === 0) {
//             totalCost = Number.MAX_VALUE;
//             break;
//         }
//     }

//     //console.dir(bestMoves);
    
    
//     if (totalCost < minCost) {
//         console.log(`total cost: ${totalCost}`);
//         minBurrowMoves = burrowMoves;
//     }
//     minCost = Math.min(minCost, totalCost);
// }

// console.log(minBurrowMoves);
// console.log(`min cost: ${minCost}`);


