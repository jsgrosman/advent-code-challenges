import { getFileContents } from "../Utils";


interface node {
    marbleNum: number;
    next: node | null;
    prev: node | null;
}

const part1 = () => {
   const numPlayers = 423;
   const topScore = 7194400;
   const scores: Map<number, number> = new Map<number, number>();
   for (let i = 1; i <= numPlayers; i++) {
       scores.set(i, 0);
   }

   let currentNode: node = {
        marbleNum: 0,
        next: null,
        prev: null
   }

   currentNode.next = currentNode;
   currentNode.prev = currentNode;

   let currentPlayer = 0;
   for (let marble = 1; marble <= topScore; marble++) {
    if (marble % 23 !== 0) {
        const newNext = currentNode.next!.next!;
        const newPrev = currentNode.next!;

        currentNode = {
            marbleNum: marble,
            next: newNext,
            prev: newPrev
        }

        newPrev.next = currentNode;
        newNext.prev = currentNode;
    } else {
        let score = marble;
        for (let i = 0; i < 7; i++) {
            currentNode = currentNode.prev!;
        }

        score += currentNode.marbleNum;
        currentNode.prev!.next = currentNode.next;
        currentNode.next!.prev = currentNode.prev!;
        currentNode = currentNode.next!;

        // console.log(`player ${currentPlayer + 1} score increases by ${score}`);
        scores.set(currentPlayer + 1, scores.get(currentPlayer + 1)! + score);
    }

    currentPlayer = (currentPlayer + 1) % numPlayers;
   }

   console.dir(scores);

   let highScore = 0;
   for (const [key, value] of scores) {
    highScore = Math.max(highScore, value);
  }
  console.log(`high score: ${highScore}`);
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);


};

part1();
// part2();