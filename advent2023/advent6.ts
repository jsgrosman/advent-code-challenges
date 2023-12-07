import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const raceTimes = lines[0].match(/(\d+)/g)!.map(Number);
    const raceDistances = lines[1].match(/(\d+)/g)!.map(Number);

    let total = 1;
    for (let raceNum = 0; raceNum < raceTimes.length; raceNum++) {
        let numWays = 0;
        const raceTime = raceTimes[raceNum];
        const raceDistance = raceDistances[raceNum];

        for (let holdTime = 0; holdTime < raceTime; holdTime++) {
            const distance = holdTime * (raceTime - holdTime);
            if (distance > raceDistance) {
                numWays++;
            }
        }

        total *= numWays;
    }

    console.log(`Part 2 Total: ${total}`);

};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const raceTime = Number(lines[0].match(/(\d+)/g)!.join(''));
    const raceDistance = Number(lines[1].match(/(\d+)/g)!.join(''));

    let numWays = 0;
    for (let holdTime = 0; holdTime < raceTime; holdTime++) {
        const distance = holdTime * (raceTime - holdTime);
        if (distance > raceDistance) {
            numWays++;
        }
    }
    console.log(`Part 1 Total: ${numWays}`);
};


part1();
part2();

// 41,667,266
// 12,996,085