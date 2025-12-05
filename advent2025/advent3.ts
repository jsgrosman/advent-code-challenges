import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const TOTAL_BATTERIES = 2;
    let total = 0;
    for (let line of lines) {
        const batteries = line.split('').map(Number);

        let val = '', currentIndex = 0;
        for (let i = TOTAL_BATTERIES; i > 0; i--) {
            const remainingBatteries = batteries.slice(currentIndex, batteries.length - i + 1);
            const digit = Math.max(...remainingBatteries);
            currentIndex += remainingBatteries.indexOf(digit) + 1;
            val += new String(digit);
        }
        total += Number(val);
    }

    console.log(`Answer 1: ${total}`);


};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const TOTAL_BATTERIES = 12;
    let total = 0;
    for (let line of lines) {
        const batteries = line.split('').map(Number);

        let val = '', currentIndex = 0;
        for (let i = TOTAL_BATTERIES; i > 0; i--) {
            const remainingBatteries = batteries.slice(currentIndex, batteries.length - i + 1);
            const digit = Math.max(...remainingBatteries);
            currentIndex += remainingBatteries.indexOf(digit) + 1;
            val += new String(digit);
        }
        total += Number(val);
    }

    console.log(`Answer 2: ${total}`);
};

part1();
part2();