import { getFileContents } from "../Utils";

const contents = getFileContents().trim().split('\n');

type direction = 'left' | 'right' | 'up' | 'down'

interface node {
  col: number;
  row: number;
  blizzardRowRounds: number[];
  blizzardColRounds: number[];
  blizzardDir?: direction;
}

const valley: Map<string, node> = new Map<string, node>();

const start = contents[0].indexOf('.') - 1;
contents.shift();

const end = contents[contents.length - 1].indexOf('.') - 1;
contents.pop();

const valleyHeight = contents.length;
const valleyWidth = contents[0].length - 2;

let row = 0;
for (const line of contents) {
  
  const mazeElements = line.split('');
  mazeElements.shift();
  mazeElements.pop();
  
  for(let col = 0; col < mazeElements.length; col++) {
    let dir: direction | undefined;
    switch (mazeElements[col]) {
      case '>': 
          dir = 'right';
          break;
      case '<':
          dir = 'left';
          break;
      case 'v':
          dir = 'down';
          break;
      case '^':
          dir = 'up';
          break;
    }
    const square = {
      row,
      col,
      blizzardRowRounds: dir === 'left' || dir === 'right' ? [0] : [],
      blizzardColRounds: dir === 'up' || dir === 'down' ? [0] : [],
      blizzardDirection: dir
    }
    valley.set(`${col},${row}`, square);
  }
  row++;
}

const getRowBlizzardDistances = (row: number, col:number) => {
   const rounds: number[] = [];
     for (let i = 0; i < col; i++) {
       const square = valley.get(`${i},${row}`)!;
       if (square.blizzardDir === 'right') { rounds.push(col - i);
       } else if (square.blizzardDir === 'left') {
         rounds.push((valleyWidth - i) + col)
       }
     } 
     for (let i = col + 1; i < valleyWidth; i++){
       const square = valley.get(`${i},${row}`)!;
       if (square.blizzardDir === 'left') { rounds.push(i - col);
       } else if (square.blizzardDir === 'right') {
         rounds.push(i + (valleyWidth - col));
       }
     }
  return rounds;
}

const getColBlizzardDistances = (row: number, col:number) => {
   const rounds: number[] = [];
     for (let i = 0; i < row; i++) {
       const square = valley.get(`${col},${i}`)!;
       if (square.blizzardDir === 'down') { rounds.push(row - i);
       } else if (square.blizzardDir === 'up') {
         rounds.push((valleyHeight - i) + row)
       }
     } 
     for (let i = row + 1; i < valleyHeight; i++){
       const square = valley.get(`${col},${i}`)!;
       if (square.blizzardDir === 'up') { rounds.push(i - row);
       } else if (square.blizzardDir === 'down') {
         rounds.push(i + (valleyHeight - row));
       }
     }
  return rounds;
}
 