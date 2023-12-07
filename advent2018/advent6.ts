import { getFileContents, print2dArr } from "../Utils";
import Point from "../lib/Point";
import Counter from "../lib/Counter";

let GRID_SIZE = 400;
let SAFE_DISTANCE = 10000;

const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const counter: Counter<string> = new Counter<string>();

    const places: Point[] = lines.map( l => {
        const [x, y] = l.split(', ').map(Number);
        return new Point(x, y);
    })
    console.dir(places);

    
    for (let row = -1; row < GRID_SIZE + 1; row++) {

        for (let col = -1; col < GRID_SIZE + 1; col++) {

            let minDistance = Number.MAX_SAFE_INTEGER;
            let minPlace = 0;
            for (let placeIndex = 0; placeIndex < places.length; placeIndex++) {
                const placePoint = places[placeIndex];
                const manhattanDistance = Math.abs(row - placePoint.y) + Math.abs(col - placePoint.x);

                if (manhattanDistance < minDistance) {
                    minPlace = placeIndex;
                    minDistance = manhattanDistance;
                }
            }
            counter.increment(String.fromCharCode("a".charCodeAt(0) + minPlace));
        }
    }

    console.dir(counter.getValues().join(';'));
    console.log(counter.getMax());
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const counter: Counter<string> = new Counter<string>();

    const places: Point[] = lines.map( l => {
        const [x, y] = l.split(', ').map(Number);
        return new Point(x, y);
    })
    console.dir(places);

    let total = 0;
    for (let row = -SAFE_DISTANCE; row < GRID_SIZE + SAFE_DISTANCE; row++) {

        for (let col = -SAFE_DISTANCE; col < GRID_SIZE + SAFE_DISTANCE; col++) {

            let totalDistance = 0;
            for (let placeIndex = 0; placeIndex < places.length; placeIndex++) {
                const placePoint = places[placeIndex];
                const manhattanDistance = Math.abs(row - placePoint.y) + Math.abs(col - placePoint.x);
                totalDistance += manhattanDistance;
               
            }
            if (totalDistance < SAFE_DISTANCE) {
                total++;
            }
        }
    }

    console.dir(`Total Region Size = ${total}`);
};

// part1();
part2();