import { getFileContents } from "../Utils";
const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

const part1 = () => {
    // only 12 red cubes, 13 green cubes, and 14 blue cubes
    const max_colors = {'green': 13, 'red': 12, 'blue': 14};

    let gameIdTotal = 0;
    let gameId = 0;

    for (const line of lines) {
        let isValid = true;
        gameId++;
        Array.from(line.matchAll(/(\d+) (red|blue|green)/g)).map( (pull) => {
            const num = Number(pull[1]);
            const color = pull[2] as keyof typeof max_colors;
            if (num > max_colors[color]) {
                isValid = false;
                return;
            }
        });
        
        if (isValid) {
            gameIdTotal += gameId;
        }

    }
    console.log(`Sum of valid game ids: ${gameIdTotal}`);
}

const part2 = () => {
    let powerTotal = 0;
    for (const line of lines) {
        const gameCounter = {'green': 0, 'red': 0, 'blue': 0};

        Array.from(line.matchAll(/(\d+) (red|blue|green)/g)).map( (pull) => {
            const num = Number(pull[1]);
            const color = pull[2] as keyof typeof gameCounter;
            gameCounter[color] = Math.max(gameCounter[color], num);
        });
        
        powerTotal += (gameCounter['green'] * gameCounter['red'] * gameCounter['blue']);

    }
    console.log(`Sum of powers: ${powerTotal}`);
}

part1();
part2();