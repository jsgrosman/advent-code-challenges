import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);


    const beams: Set<number> = new Set<number>();
    const firstLine = lines.shift()!;
    beams.add(firstLine.indexOf('S'));

    let numSplits = 0;
    while (lines.length > 0) {
        const currentLine = lines.shift()!;
        for (let beamIndex of beams) {
            if (currentLine.charAt(beamIndex) === '^') {
                numSplits++;
                beams.delete(beamIndex);
                beams.add(beamIndex - 1);
                beams.add(beamIndex + 1);
            }
        }
    }
   
    console.log(`Answer 1: ${numSplits}`);

};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);


    const cache: Map<string, number> = new Map<string, number>();
    const dfs = (currentLine: number, currentIndex: number): number => {
        if (cache.has(`${currentLine}:${currentIndex}`)) {
            return cache.get(`${currentLine}:${currentIndex}`)!;
        }

        let result = 1;
        if (currentLine < lines.length - 1) {
            if (lines[currentLine].charAt(currentIndex) === '^') {
                result = dfs(currentLine + 1, currentIndex - 1) + dfs(currentLine + 1, currentIndex + 1);
            } else {
                result = dfs(currentLine + 1, currentIndex);
            }
        }
        cache.set(`${currentLine}:${currentIndex}`, result);
        return result;
    }

    const firstIndex = lines[0].indexOf('S');
    const result = dfs(1, firstIndex);
    console.log(`Answer 2: ${result}`);
};

part1();
part2();