const GOAL = 21;

let player1 = 7;
let player2 = 4;
let player1Score = 0;
let player2Score = 0;




const rollDie = (currentSpot: number, die1: number, die2: number, die3: number) => {

    //console.log(`${die1},${die2},${die3}`)
    let newSpot = (currentSpot + die1 + die2 + die3) % 10;

    if (newSpot === 0) {
        newSpot = 10;
    }

    return newSpot;
}

const getNumberOfTurns = (path: string) => {

    return path.replace('10', '0').replace(/,/g,'').length;
}

const updateTurns = (map: Map<number, number>, turns: number) => {
    if (map.has(turns)) {
        map.set(turns, map.get(turns)! + 1);
    } else {
        map.set(turns, 1);
    }
}

let player1Wins = 0;
let player2Wins = 0;

const memo = new Map<String, number[]>();

const dfs = (player1Spot: number, player2Spot: number, player1Score:number, player2Score:number, player: string) => {
    const key = `${player1Spot},${player2Spot},${player1Score},${player2Score},${player}`;
    if (memo.has(key)) {
        const memoWins = memo.get(key)!;
        player1Wins += memoWins[0];
        player2Wins += memoWins[1];
        return memoWins;
    }

    let wins = [0, 0];
    for (let die1 = 1; die1 <= 3; die1++) {
        for (let die2 = 1; die2 <= 3; die2++) {
            for (let die3 = 1; die3 <= 3; die3++) {
                
                
                if (player === 'player1') {
                    const nextSpot = rollDie(player1Spot, die1, die2, die3);
                    if (player1Score + nextSpot >= GOAL) {
                        player1Wins++;
                        wins[0]++;
                    } else {
                        const p1Wins = dfs(nextSpot, player2Spot, player1Score + nextSpot, player2Score, 'player2');
                        wins[0] = wins[0] + p1Wins[0];
                        wins[1] = wins[1] + p1Wins[1];
                    }
                } else {
                    const nextSpot = rollDie(player2Spot, die1, die2, die3);
                    if (player2Score + nextSpot >= GOAL) {
                        player2Wins++;
                        wins[1]++;
                    } else {
                        const p2Wins = dfs(player1Spot, nextSpot, player1Score, player2Score + nextSpot, 'player1');
                        wins[0] = wins[0] + p2Wins[0];
                        wins[1] = wins[1] + p2Wins[1];
                    }
                }
            }
        }
    }
    memo.set(key, wins);
    return wins;
}



dfs(player1, player2, 0, 0, 'player1');


console.log(`player1 totalUniverses: ${player1Wins}`);
console.log(`player2 totalUniverses: ${player2Wins}`);


// let currentDie = 1;
// while (true) {

//     player1 = rollDie(player1, currentDie++, currentDie++, currentDie++);
//     player1Score += player1;

//     if (player1Score >= 1000) {
//         break;
//     }

//     player2 = rollDie(player2, currentDie++, currentDie++, currentDie++);
//     player2Score += player2;

//     if (player2Score >= 1000) {
//         break;
//     }

//     console.log(`player1: ${player1} - ${player1Score}, player2: ${player2} - ${player2Score}`);
// }

// console.log(`player1: ${player1} - ${player1Score}, player2: ${player2} - ${player2Score}`);
// console.log(`currentDie: ${currentDie - 1}`);
// console.log( Math.min(player1Score, player2Score) * (currentDie - 1));
