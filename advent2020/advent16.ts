import { getFileContents } from "../Utils";

const badTickets:number[] = [];

const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const ranges: number[][] = [];
    const tickets: number[][] = []

    for (let line of lines) {
        const fieldsResult = line.match(/([a-z ]+): (\d+)\-(\d+) or (\d+)\-(\d+)/);

        if (fieldsResult) {
            const fieldName = fieldsResult[1];
            const [startRange1, endRange1, startRange2, endRange2] = fieldsResult.slice(2, 6).map(Number);
            ranges.push([startRange1, endRange1], [startRange2, endRange2]);
        }

        const ticketsResult = line.match(/^(\d+,?)+$/);
        if (ticketsResult) {
            tickets.push(line.split(',').map(Number));
        }
    }

    ranges.sort( ([aStart, aEnd], [bStart, bEnd]) => aStart - bStart);
    const combinedRanges: number[][] = [ranges.shift()!];
    while (ranges.length > 0) {
        const [start1, end1] = combinedRanges.pop()!;
        const [start2, end2] = ranges.shift()!;
        if (start2 <= end1) {
            combinedRanges.push([Math.min(start1,start2),Math.max(end1, end2)]);
        } else {
            combinedRanges.push([start1,end1], [start2,end2]);
        }
    }

    let result = 0;
    let ticketNum = -1;
    
    for (let ticket of tickets) {
        ticketNum++;
        NEXT_NUM:
        for (let num of ticket) {
            for (let r of combinedRanges) {
                if (num >= r[0] && num <= r[1]) {
                    continue NEXT_NUM;
                }
            }
            badTickets.push(ticketNum);
            result += num;
        }
    }
    console.log(badTickets);
    console.log(`Answer 1: ${result}`);
};


const part2 = () => {
     const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    console.log(badTickets);
    const ranges: number[][] = [];
    const tickets: number[][] = []

    const fieldMap: Map<string, number[]> = new Map();
    const positionsToFields: Map<number, Set<string>> = new Map();

    let ticketNum = -1;
    for (let line of lines) {
        const fieldsResult = line.match(/([a-z ]+): (\d+)\-(\d+) or (\d+)\-(\d+)/);

        if (fieldsResult) {
            const fieldName = fieldsResult[1];
            const [startRange1, endRange1, startRange2, endRange2] = fieldsResult.slice(2, 6).map(Number);
            fieldMap.set(fieldName, [startRange1, endRange1, startRange2, endRange2]);
        }

        const ticketsResult = line.match(/^(\d+,?)+$/);
        if (ticketsResult) {
            ticketNum++;
            if (!badTickets.includes(ticketNum)) {
                tickets.push(line.split(',').map(Number));
            }
        }
    }
    for (let i = 0; i < tickets[0].length; i++) {
        positionsToFields.set(i, new Set(Array.from(fieldMap.keys())));
    }

    console.dir(tickets);

    console.dir(positionsToFields);
    
    for (let ticket of tickets) {
        for (let pos = 0; pos < ticket.length; pos++) {
            const value = ticket[pos];
            for (let [key, ranges] of fieldMap.entries()) {
                if (value < ranges[0] ||  value > ranges[3]) {
                    positionsToFields.get(pos)!.delete(key);
                } else if (value > ranges[1] &&  value < ranges[2]) {
                    positionsToFields.get(pos)!.delete(key);
                }
                if (positionsToFields.get(pos)!.size === 1) {
                    for (let [posKey, posFields] of positionsToFields.entries()) {
                        if (posKey != pos) {
                            posFields.delete([...positionsToFields.get(pos)!][0]);
                        }
                    }
                }
            }
        }
    }
    
    let result = 1;
    for (let [posKey, posFields] of positionsToFields.entries()) {
        if (posFields.size === 1 && [...posFields!][0].startsWith('departure')) {
            console.log(`${posKey} ${[...posFields!][0]}`);
            result *= tickets[0][posKey];
        }   
    }
    console.log(`Answer 2: ${result}`);


};

part1();
part2();