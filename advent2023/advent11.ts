import { getFileContents, print2dArr } from "../Utils";
import Point from "../lib/Point";

const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const stars: Map<number, Point> = new Map<number, Point>();

    const galaxy: string[][] = [];

    for (let line of lines) {
        galaxy.push(line.split(''));
        if (!line.includes('#')) {
            galaxy.push(line.split(''));
        }
    }

    NEXT_COL:
    for (let col = galaxy[0].length - 1; col >= 0; col--) {
        for (let row = 0; row < galaxy.length; row++) {
            if (galaxy[row][col] === "#") {
                continue NEXT_COL;
            }   
        }
        // add a new column
        for (let row = 0; row < galaxy.length; row++) {
            galaxy[row].splice(col, 0, '.');  
        }
    }
    let starNumber = 1;
    for (let row = 0; row < galaxy.length; row++) {
        for (let col = 0; col < galaxy[row].length; col++) {
            if (galaxy[row][col] === '#') {
                stars.set(starNumber++, new Point(col, row));
            }
        }
    }
  
    let total = 0;
    for (let startStar = 1; startStar < stars.size; startStar++ ) {
        for (let endStar = startStar + 1; endStar <= stars.size; endStar++ ) {
            const start = stars.get(startStar)!;
            const end = stars.get(endStar)!;
            total += Math.abs(start.x - end.x) + Math.abs(start.y - end.y); 
        }
    }
    console.log(`distance = ${total}`);


};


const part2 = () => {
    const EXPANSION = 1000000;

    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const originalStars: Map<number, Point> = new Map<number, Point>();
    const stars: Map<number, Point> = new Map<number, Point>();

    const galaxy: string[][] = [];

    for (let line of lines) {
        galaxy.push(line.split(''));
    }

    let starNumber = 1;
    for (let row = 0; row < galaxy.length; row++) {
        for (let col = 0; col < galaxy[row].length; col++) {
            if (galaxy[row][col] === '#') {
                stars.set(starNumber, new Point(col, row));
                originalStars.set(starNumber, new Point(col, row));
                starNumber++;
            }
        }
    }

    for (let row = 0; row < galaxy.length; row++) {
        if (!galaxy[row].includes('#')) {
            for (let [starNum, starPoint] of originalStars.entries()) {
                if (starPoint.y > row) {
                    stars.get(starNum)!.y = stars.get(starNum)!.y + EXPANSION - 1;
                }
            }
        }
    }

    NEXT_COL:
    for (let col = 0; col < galaxy[0].length; col++) {
        for (let row = 0; row < galaxy.length; row++) {
            if (galaxy[row][col] === "#") {
                continue NEXT_COL;
            }   
        }

        // expand
        for (let [starNum, starPoint] of originalStars.entries()) {
            if (starPoint.x > col) {
                stars.get(starNum)!.x = stars.get(starNum)!.x + EXPANSION - 1;
            }
        }
    }
  
    let total = 0;
    for (let startStar = 1; startStar < stars.size; startStar++ ) {
        for (let endStar = startStar + 1; endStar <= stars.size; endStar++ ) {
            const start = stars.get(startStar)!;
            const end = stars.get(endStar)!;
            total += Math.abs(start.x - end.x) + Math.abs(start.y - end.y); 
        }
    }
    console.log(`distance = ${total}`);


};

part1();
part2();