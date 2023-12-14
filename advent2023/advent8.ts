import { getFileContents } from "../Utils";
import { lcm } from "../lib/AOCMath";

const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    type node = {
        name: string;
        left: string;
        right: string;
    }

    const desert: Map<string, node> = new Map<string, node>();
    const instructions = lines[0].split('');

    for (let lineIndex = 2; lineIndex < lines.length; lineIndex++) {
        const [nodeName, nodeLeft, nodeRight] = lines[lineIndex].match(/[A-Z]{3}/g)!;
        desert.set(nodeName, { name: nodeName, left: nodeLeft, right: nodeRight });
    }

    let count = 0;
    let currentNodeName = 'AAA';
    for (let index = 0; currentNodeName !== 'ZZZ' ; index = (index + 1) % instructions.length) {
        count++;

        const currentNode = desert.get(currentNodeName)!;
        currentNodeName = instructions[index] === 'L' ? currentNode.left : currentNode.right;
    }
    console.log(`Number of steps: ${count}`);
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    type node = {
        name: string;
        left: string;
        right: string;
    }

    const desert: Map<string, node> = new Map<string, node>();
    const instructions = lines[0].split('');

    for (let lineIndex = 2; lineIndex < lines.length; lineIndex++) {
        const [nodeName, nodeLeft, nodeRight] = lines[lineIndex].match(/[A-Z0-9]{3}/g)!;
        desert.set(nodeName, { name: nodeName, left: nodeLeft, right: nodeRight });
    }

    let currentNodeNames: string[] = Array.from(desert.keys()).filter(k => k.endsWith('A'));
    let currentSteps: number[] = [];
    for (let currentNodeName of currentNodeNames) {
        let count = 0;
        for (let index = 0; !currentNodeName.endsWith('Z'); index = (index + 1) % instructions.length) {
            count++;
            const currentNode = desert.get(currentNodeName)!;
            currentNodeName = instructions[index] === 'L' ? currentNode.left : currentNode.right;
        }
        currentSteps.push(count);
    }

    console.dir(currentSteps);
    console.log(`Number of steps: ${currentSteps.reduce( (p, c) => lcm(p, c))}`);    
};

part1();
part2();