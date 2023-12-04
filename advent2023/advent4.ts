import { getFileContents } from "../Utils";

const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    let total = 0;
    for (const card of lines) {
        const [_, winningNumbers, playedNumbers] = card.split(/:|\|/).map( v => v.trim()).map( v => v.split(/\s+/));

        const intersection = winningNumbers.filter( v => playedNumbers.includes(v));
        if (intersection.length > 0) {
            total += Math.pow(2, intersection.length - 1);
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

        const [_, winningNumbers, playedNumbers] = card.split(/:|\|/).map( v => v.trim()).map( v => v.split(/\s+/));

        const intersection = winningNumbers.filter( v => playedNumbers.includes(v));
        for (let nextCard = cardNum + 1; nextCard <= cardNum + intersection.length; nextCard++) {
            cardCounter[nextCard] = cardCounter[nextCard] + numberOfCurrentCards;
        }
    }

    const total = Array.from(cardCounter.values()).reduce( (p,c) => p + c);
    console.log(`part 2: total = ${total}`);
};

part1();
part2();