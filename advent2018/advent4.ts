import { getFileContents } from "../Utils";

const mode = (arr: number[]) => {
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
}

const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    lines.sort( (a, b) => {
        return a.localeCompare(b);
    })

    const guardSleepMap: Map<number, number[]> = new Map<number, number[]>();
    let currentGuard = 0;
    let result: RegExpMatchArray | null = null;

    let previousMinute = 0;
    for (const line of lines) {
        result = line.match(/\[\d{4}\-\d{2}\-\d{2} \d{2}:(\d{2})\]/)!;
        const logMinute = Number(result[1]);
        const elapsedTime = logMinute - previousMinute;

        const guardMinutes: number[] = [];
        for (let i = previousMinute; i < logMinute; i++) {
            guardMinutes.push(i);
        }
        previousMinute = logMinute;


        if (result = line.match(/Guard #(\d+) begins shift/)) {
            currentGuard = Number(result[1]);
        }
        if (result = line.match(/wakes up/)) {
            if (guardSleepMap.has(currentGuard)) {
                guardSleepMap.set(currentGuard, [...guardSleepMap.get(currentGuard)!, ...guardMinutes]);
            } else {
                guardSleepMap.set(currentGuard, guardMinutes);
            }
        }
    }

    let sleepyGuard = 0;
    let maxSleepMinutes = 0;
    let mostSleepMinutes = 0;
    for (const [guardId, guardSleepMinutes] of guardSleepMap.entries()) {
        if (guardSleepMinutes.length > maxSleepMinutes) {
            sleepyGuard = guardId;
            maxSleepMinutes = guardSleepMinutes.length;
            mostSleepMinutes = mode(guardSleepMinutes)!;
        }
    }

    console.log(`${sleepyGuard} ${mostSleepMinutes} ${sleepyGuard * mostSleepMinutes}`);
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    lines.sort( (a, b) => {
        return a.localeCompare(b);
    })

    const guardSleepMap: Map<number, number[]> = new Map<number, number[]>();
    let currentGuard = 0;
    let result: RegExpMatchArray | null = null;

    let previousMinute = 0;
    for (const line of lines) {
        result = line.match(/\[\d{4}\-\d{2}\-\d{2} \d{2}:(\d{2})\]/)!;
        const logMinute = Number(result[1]);
        const elapsedTime = logMinute - previousMinute;

        const guardMinutes: number[] = [];
        for (let i = previousMinute; i < logMinute; i++) {
            guardMinutes.push(i);
        }
        previousMinute = logMinute;


        if (result = line.match(/Guard #(\d+) begins shift/)) {
            currentGuard = Number(result[1]);
        }
        if (result = line.match(/wakes up/)) {
            if (guardSleepMap.has(currentGuard)) {
                guardSleepMap.set(currentGuard, [...guardSleepMap.get(currentGuard)!, ...guardMinutes]);
            } else {
                guardSleepMap.set(currentGuard, guardMinutes);
            }
        }
    }

    let sleepyGuard = 0;
    let maxSleepMinutes = 0;
    let mostSleepMinutes = 0;
    for (const [guardId, guardSleepMinutes] of guardSleepMap.entries()) {
        const mostCommon = mode(guardSleepMinutes)!;
        const mostCommonCount = guardSleepMinutes.filter( (v) => v === mostCommon).length;

        if (mostCommonCount > maxSleepMinutes) {
            sleepyGuard = guardId;
            maxSleepMinutes = mostCommonCount;
            mostSleepMinutes = mostCommon;
            
        }
    }

    console.log(`${sleepyGuard} ${mostSleepMinutes} ${sleepyGuard * mostSleepMinutes}`);



};

// part1();
part2();