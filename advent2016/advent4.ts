//find real rooms
//a real room has a code [] that corresponds to the 5 most common letters in the room
//if letters have equivalent counts, list alphabetically

import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

interface room {
    betterName: string,
    name: string,
    idNum: number,
    checkSum: string[],
};

const caesar = (letter: string,shift: number) => {
    let ascii = letter.charCodeAt(0);

    //ascii + shift
    //console.log(ascii);
    shift = shift%26;
    //console.log(shift);
    ascii = ascii + shift;
    if (ascii > 122){
        ascii = 96 + (ascii - 121 - 1);
    }
    //console.log(ascii);
    return String.fromCharCode(ascii);
}

const rooms: room[] = [];

for (let line of lines) {
    const values = line.trim().split('-');
    //console.log(values[values.length-1]);
    const sectorID = String(values[values.length-1]).replace(/\D/g, "");
    //console.log(sectorID);
    const code = (String(values[values.length-1]).replace(/[^a-zA-Z]+/g, '')).split('');
    //console.log(code);
    values.pop();
    const check = values.join('');
    const check2 = check.split('').sort((a:string,b:string) => a.localeCompare(b)).join('');
    const makeRoom: room = {
        betterName: check,
        name: check2,
        idNum: parseInt(sectorID,10),
        checkSum: code,
    };
    rooms.push(makeRoom);
}

//console.dir(rooms);

let realRooms: room[] = [];

for (let area of rooms){
    const letterMap = new Map<string, number> ();
    //let iterate = 0;
    for (let letter of area.name){
        if (!letterMap.has(letter)) {
            const regex =  new RegExp(letter,'g');
            const count = (area.name.match(regex) || []).length;
            letterMap.set(letter,count);
            //iterate ++;
        }
    }

    const sortedLetters = new Map([...letterMap.entries()].sort((a, b) => b[1] - a[1]));
    //console.dir(sortedLetters);

    const firstFive = Array.from(sortedLetters.keys()).slice(0, 5);
    //console.dir(firstFive);

    let isValid = true;
    for (let i = 0; i < 5; i ++){
        if(firstFive[i] != area.checkSum[i]){
            isValid = false;
            break;
        }
    }
    if (isValid){

        realRooms.push(area);
    }

}

console.log(caesar('z',343));

for (let real of realRooms){
    const nameList: string[] = [];
    for (let letter of real.betterName){
        letter = caesar(letter,real.idNum);
        nameList.push(letter);
    }
    real.betterName = nameList.join('');
    console.log(`name: ${real.betterName}, idNum: ${real.idNum}`);
}

//console.dir(realRooms);