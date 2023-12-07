    import { getFileContents } from "../Utils";
    
    const part1 = () => {
        const contents = getFileContents();
        const lines = contents.trim().split(/\n/g);
    
        let total = 0;
        for (const card of lines) {
            const allNumbers = card.split(':')[1].match(/\d+/g)!;
            const numWinners = allNumbers.length - new Set(allNumbers).size;

            if (numWinners > 0) {
                total += Math.pow(2, numWinners - 1);
            }
        }
        console.log(`part 1: total = ${total}`);
    };
    
    const part2 = () => {
        const contents = getFileContents();
        const lines = contents.trim().split(/\n/g);
    
        const cardCounter: number[] = new Array(lines.length + 1).fill(1);
        cardCounter[0] = 0;
    
        for (const card of lines) {
            const cardNum = Number(card.match(/\d+/)![0]);
            const numberOfCurrentCards = cardCounter[cardNum];
    
            const allNumbers = card.split(':')[1].match(/\d+/g)!;
            const numWinners = allNumbers.length - new Set(allNumbers).size;
            for (let nextCard = cardNum + 1; nextCard <= cardNum + numWinners; nextCard++) {
                cardCounter[nextCard] = cardCounter[nextCard] + numberOfCurrentCards;
            }
        }
    
        const total = Array.from(cardCounter.values()).reduce( (p,c) => p + c);
        console.log(`part 2: total = ${total}`);
    };
        
    part1();
    part2();