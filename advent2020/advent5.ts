import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

let maxSeatId = 0;
const seatIds: number[] = [];
for (let line of lines) {

    const seat = line.replace(/F/g, '0').replace(/B/g, '1').replace(/L/g, '0').replace(/R/g, '1');

    const row = parseInt(seat.substr(0, 7), 2);
    const col = parseInt(seat.substr(7), 2);

    const seatId = (row * 8) + col;
    // console.log(`${row}, ${col}`);
    maxSeatId = Math.max(maxSeatId, seatId);
    seatIds.push( (row * 8) + col);
    
    if (seatId === 681) {
        console.log(`681 = ${row}, ${col}`);
    }

    if (seatId === 683) {
        console.log(`683 = ${row}, ${col}`);
    }
}
console.log(`Max Seat Id: ${maxSeatId}`);
seatIds.sort( (a, b) => a - b);

console.dir(seatIds);

for (let i = 0; i < seatIds.length; i++) {
    if (seatIds[i+1] !== seatIds[i] + 1) {
        console.debug(seatIds[i+1]);
    }
}