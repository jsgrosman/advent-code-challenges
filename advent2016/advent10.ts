import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

type Bot = {
    id: number;
    chips: number[];
    lowType?: string;
    lowDestination: number;
    highType?: string;
    highDestination: number;
};

const allBots = new Map<number, Bot>();
const allOutputs = new Map<number, number>();

for (let line of lines){

    if (line.startsWith('value')) {
        const result = line.match(/value (\d+) goes to bot (\d+)/);
        const value = Number(result![1]);
        const botNumber = Number(result![2]);

        if (allBots.has(botNumber)) {
            allBots.get(botNumber)!.chips.push(value);
        } else {
            const newBot = {
                id: botNumber,
                chips: [value],
                lowType: undefined,
                lowDestination: -1,
                highType: undefined,
                highDestination: -1
            };
            allBots.set(botNumber, newBot);
        }
    }
    else if (line.startsWith('bot')) {
        const result = line.match(/bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/);
        if (result) {
            const botNumber = Number(result![1]);
            const lowType = result[2];
            const lowDest = Number(result![3]);
            const highType = result[4];
            const highDest = Number(result![5]);

            if (allBots.has(botNumber)) {
                allBots.get(botNumber)!.lowType = lowType;
                allBots.get(botNumber)!.lowDestination = lowDest;
                allBots.get(botNumber)!.highType = highType;
                allBots.get(botNumber)!.highDestination = highDest;
            } else {
                const newBot = {
                    id: botNumber,
                    chips: new Array<number>(),
                    lowType: lowType,
                    lowDestination: lowDest,
                    highType: highType,
                    highDestination: highDest
                };
                allBots.set(botNumber, newBot);
            }
        }
    }
}

const distribute = (currentBot: Bot) => {

    if (currentBot.highType === 'bot') {
        const highDestBot = allBots.get(currentBot.highDestination);
        highDestBot!.chips.push(Math.max(currentBot.chips[0], currentBot.chips[1]));
    } else if (currentBot.highType === 'output') {
        allOutputs.set(currentBot.highDestination, Math.max(currentBot.chips[0], currentBot.chips[1]))
    }

    if (currentBot.lowType === 'bot') {
        const lowDestBot = allBots.get(currentBot.lowDestination);
        lowDestBot!.chips.push(Math.min(currentBot.chips[0], currentBot.chips[1]));
    } else if (currentBot.lowType === 'output') {
        allOutputs.set(currentBot.lowDestination, Math.min(currentBot.chips[0], currentBot.chips[1]))
    }

    currentBot.chips = [];

}
// console.dir(allBots);

const SEARCH_1 = 17;
const SEARCH_2 = 61;

MAIN_LOOP:
while (true) {

    for (let currentBot of allBots.values()) {

            if (currentBot.chips.length === 2) {
                // console.log(`Two chips: ${currentBot.id}`)
                
                // if (Math.max(currentBot.chips[0], currentBot.chips[1]) === SEARCH_2 &&
                //     Math.min(currentBot.chips[0], currentBot.chips[1]) === SEARCH_1) {
                //         console.log(`Found it! ${currentBot.id}`)
                //         break MAIN_LOOP;
                // }

                if (allOutputs.has(0) && allOutputs.has(1) && allOutputs.has(2) )
                {
                    break MAIN_LOOP;
                }

                distribute(currentBot);

            }
    }
    // console.dir(allBots);
}

console.dir(allOutputs);
console.log(allOutputs.get(0)! * allOutputs.get(1)! * allOutputs.get(2)!)