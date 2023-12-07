import { getFileContents } from "../Utils";
import Counter from "../lib/Counter";


// const CardOrder = ['A','K','Q','J','T','9','8','7','6','5','4','3','2']; // part 1
const CardOrder = ['A','K','Q','T','9','8','7','6','5','4','3','2','J']; // part 2
const HandOrder = ['Five','Four','Full','Three','Two','One','High'];

const sortCard = (a: string, b: string) => {
   return CardOrder.indexOf(a) - CardOrder.indexOf(b);
}

const sortHand = (a: Hand, b: Hand) => {
    let result = HandOrder.indexOf(a.handType) - HandOrder.indexOf(b.handType);
    let handIndex = 0;
    while (result === 0) {
        result = sortCard(a.cards[handIndex], b.cards[handIndex]);
        handIndex++;
    }

    return result;
 }

class Hand {
    cards: string[];
    cardCounter: Counter<string>;
    handType: string;
    bet: number;

    constructor(hand: string, bet: number) {
        this.cards = hand.split('');
        this.cardCounter = new Counter<string>();

        for (let card of this.cards) {
            this.cardCounter.increment(card);
        }

        this.handleJokers(); // for part 2

        this.cardCounter.sort();
        this.handType = this.getHandType()!;

        this.bet = bet;
    }
    
    handleJokers() {
        if (!this.cards.includes('J')) {
            return;
        }
        else {
            const numJokers = this.cardCounter.getValue('J');
            if (numJokers === 5) {
                return;
            }

            this.cardCounter.remove('J');
            const currentMaxCard = this.cardCounter.getMax()!;
            this.cardCounter.increment(currentMaxCard, numJokers);
        }
    }
    public getHandType() {
        switch (this.cardCounter.getValues().join('')) {
            case '5': 
                return 'Five';
            case '41':
                return 'Four';
            case '32':
                return 'Full';
            case '311':
                return 'Three';
            case '221':
                return 'Two';
            case '2111':
                return 'One';
            case '11111':
                return 'High';
        }
        
    }
}


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const hands: Hand[] = [];
    for (let line of lines) {
        const [handString, bet] = line.split(/\s+/);
        const hand = new Hand(handString, Number(bet));
        // console.log(`${handString} => ${hand.getHandType()}`);

        hands.push(hand);
    }

    hands.sort(sortHand);
    hands.reverse();
    console.dir(hands);

    const total = hands.reduce( (p, c, i) => {return p + (c.bet * (i + 1))}, 0);
    console.log(`total winnings = ${total}`);

};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const hands: Hand[] = [];
    for (let line of lines) {
        const [handString, bet] = line.split(/\s+/);
        const hand = new Hand(handString, Number(bet));
        hands.push(hand);
    }

    hands.sort(sortHand);
    hands.reverse();

    const total = hands.reduce( (p, c, i) => {return p + (c.bet * (i + 1))}, 0);
    console.log(`total winnings = ${total}`);
};

// part1();
part2();