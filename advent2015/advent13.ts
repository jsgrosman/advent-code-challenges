import * as fs from "fs";
import yargs = require('yargs');

const args = yargs.options({
    'file': { type: 'string', demandOption: true, alias: 'f' },
  }).argv;
  
const fullFilePath = `${process.cwd()}/${args['file']}`;

interface guest {
    name: string,
    preferences: { [key: string]: number } 
};

const graph = new Map<string, guest>();


const addConnectionToGraph = (guest: string, seatmate: string, happiness: number) => {
    if (graph.has(guest)) {
        const graphElm = graph.get(guest);
        if (graphElm && graphElm.preferences) {
            graphElm.preferences[seatmate] = happiness;
        }
    } else {
        graph.set(guest, {
            name: guest,
            preferences: {
               [seatmate] : happiness,
            }
        });
    }
}


if (!fs.existsSync(fullFilePath)) {
    console.error("No such file: " + fullFilePath);
}
const contents = fs.readFileSync(fullFilePath, 'utf8');
const lines = contents.trim().split(/\n/g);

for (let line of lines) {
    let happinessUnits = parseInt(line.match(/\d+/)![0], 10);

    if (line.includes('lose')) {
        happinessUnits = -happinessUnits;
    }

    let guest = line.match(/^(\w+)\b/)![0];
    let seatmate = line.match(/\b(\w+).$/)![1];

    addConnectionToGraph(guest, seatmate, happinessUnits);
    addConnectionToGraph('me', guest, 0);
    addConnectionToGraph(guest, 'me', 0);
}

 console.dir(graph, { depth: null});


 const shuffle = (array: string[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
 }

const calculateHappiness = (guest1: string, guest2: string) => {
    const h1 = graph.get(guest1)!.preferences[guest2] || 0;
    const h2 = graph.get(guest2)!.preferences[guest1] || 0;

    // console.log(`${guest1} and ${guest2} = ${h1} + ${h2} = ${h1 + h2}`)
    return h1 + h2;
}

const calculateTable = (guests: string[]) => {

    let totalHappiness = 0;
    for (let i = 0; i < guests.length - 1; i++) {
        totalHappiness += calculateHappiness(guests[i], guests[i+1]);
    }
    totalHappiness += calculateHappiness(guests[guests.length - 1], guests[0]);
    // console.log(`Total: ${totalHappiness}`)
    return totalHappiness;
}

 const guests = Array.from(graph.keys());

 let maxHappiness = 0;
 for (let i = 0; i < 50000; i++) {
     shuffle(guests);
     const result = calculateTable(guests);
     maxHappiness = Math.max(result, maxHappiness);
     
 }

 console.log("max happiness: " + maxHappiness);


 




