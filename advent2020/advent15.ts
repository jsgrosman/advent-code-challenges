

const game: number[] = '11,0,1,10,5,19'.split(',').map(Number);

const gameMap = new Map<number, number>();

let lastNumberSpoken = 0;
let currentNumber = 0;
for (let round = 1; round <= 29999999; round++) {

    //console.log(`round: ${round}`);
    

    //game length is 3 to start
    if (round < game.length) {
        //initialize map
        gameMap.set(game[round - 1], round - 1);
        //console.log(`last number spoken: ${lastNumberSpoken}`);
        lastNumberSpoken = game[round];
        currentNumber = game[round];
    }
    
    else {
        //console.log(`last number spoken: ${lastNumberSpoken}`);
        
        //last time
        const previousIndex = gameMap.get(lastNumberSpoken);
        //console.log(`prev index: ${previousIndex}`);

        if (!(previousIndex || previousIndex == 0)) {
            //not found, set to zero
            gameMap.set(lastNumberSpoken, round-1);
            currentNumber = 0;
            
        } else {
            //found, set to this index - last seen index
            gameMap.set(lastNumberSpoken, round-1);
            currentNumber = round - 1 - previousIndex;
            //console.log(`current number: ${currentNumber}`);
           
        }
        lastNumberSpoken = currentNumber;
    }


    //console.dir(gameMap);
}

console.log(`current number: ${currentNumber}`);