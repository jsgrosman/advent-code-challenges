import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

interface rule {
    name: string,
    ranges: number[],
};

const rules: rule[] = [];
let index = 0;

//add to array
for (let i = index; i < lines.length; i ++){
    //console.log(`rules: ${lines[i]}`);
    if (lines[i] == ''){
        index = i + 1;
        break;
    }

    //console.log(`line: ${lines[i]}`);
    const lineList = lines[i].split(': ');
    if (lineList[1]){
        const startEnds = lineList[1].split(' or ');
        const rangeList: number[] = [];
        for (let range of startEnds){
            const startEnd = range.split('-');
            rangeList.push(Number(startEnd[0]));
            rangeList.push(Number(startEnd[1]));
        }
        const newRule: rule = {
            name: lineList[0],  
            ranges: rangeList,
        };
        rules.push(newRule);
    }
}

//console.log(`index: ${index}, line at index: ${lines[index]}`);

// your ticket
const myNumbers: number[] = [];
for (let i = index; i < lines.length; i ++){
    //console.log(`my ticket: ${lines[i]}`);

    if (lines[i] == ''){
        index = i + 1;
        break;
    }

    if (lines[i].includes('your ticket:')) {
        continue;
    }

    const nums = lines[i].split(',');
    for (let num of nums){
        myNumbers.push(Number(num));
    }
}

const otherNumbers: number[] = [];
for (let i = index; i < lines.length; i ++){
    //console.log(`your tickets: ${lines[i]}`);


    if (lines[i].includes('nearby tickets:')) {
        continue;
    }

    const nums = lines[i].split(',');
    for (let num of nums){
        otherNumbers.push(Number(num));
    }
}

//console.dir(rules);
//console.dir(myNumbers);
//console.dir(otherNumbers);

let newNums: number[] = [];

newNums = otherNumbers.filter((c) => {
    for (let r of rules){
        for (let i = 0; i < r.ranges.length; i += 2){
            if (c >= r.ranges[i] && c <= r.ranges[i+1]){
                return false;
            }
        }
    }
    return true;
})

//const sum = newNums.reduce((p,c) => {return p+c});
//console.dir(newNums);

const otherTickets: number[][] = [];
for (let i = index; i < lines.length; i ++){
    if (lines[i].includes('nearby tickets:')){
        continue;
    }

    const ticketStr: string[] = lines[i].split(',');
    const ticket: number[] = [];
    for (let val of ticketStr){
        ticket.push(Number(val));
    }

    otherTickets.push(ticket);
}

const validTickets: number[][] = otherTickets.filter((ticket) => {
    for (let num of ticket){
        if (newNums.includes(num)){
            return false;
        }
    }
    return true;
})

//console.dir(validTickets);

const airplaneTicket = new Map<rule,number>();
const inds: number[] = [];
let count = 0;
while (airplaneTicket.size < rules.length && count < 2000000){
    const valids: number[][] = [];
    for (let r of rules){
        const validNums: number[] = [];
        console.log(r.name);
        for (let b = 0; b < otherNumbers.length; b ++){
            for (let i = 0; i < r.ranges.length; i += 2){
                if (otherNumbers[b] >= r.ranges[i] && otherNumbers[b] <= r.ranges[i+1]){
                    validNums.push(otherNumbers[b]);
                }
            }
        }
        valids.push(validNums);
    }
    let countValids: number[] = [validTickets.length];
    for (let valid of valids){
        for (let num of valid){
            for (let ticket of validTickets){
                if (ticket.includes(num)){
                    countValids[validTickets.indexOf(ticket)] ++;
                }
            }
        }
    }
    for (let ticket of validTickets){
        if (countValids[validTickets.indexOf(ticket)] == 1){
            
        }
    }
    console.log(airplaneTicket.size);
    count ++;
}

console.dir(airplaneTicket);