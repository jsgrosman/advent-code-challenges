import * as fs from "fs";
import yargs = require('yargs');

const args = yargs.options({
    'file': { type: 'string', demandOption: true, alias: 'f' },
  }).argv;
  
const fullFilePath = `${process.cwd()}/${args['file']}`;

if (!fs.existsSync(fullFilePath)) {
    console.error("No such file: " + fullFilePath);
}

const wires = new Map();

const uint16 = (n: number) => {
    return n & 0xFFFF;
  }
 
 const run = (instructions: string[]) => {
    while (instructions.length > 0) {
        const instruction = instructions.shift() || '';
        const [input, outputWire] = instruction.split(' -> ', 2);
        
        // simple
        if ((/^\d+$/).test(input)) {
            wires.set(outputWire, parseInt(input, 10));
        } else if (input.includes('AND')) {
            const [input1, input2] = input.split(' AND ', 2);
            if ((/^\d+$/).test(input1)) {
                if (wires.has(input2)) {
                    wires.set(outputWire, parseInt(input1, 10) & wires.get(input2) >>> 0);
                } else {
                    instructions.push(instruction);
                }
            } else {
                if (wires.has(input1) && wires.has(input2)) {
                    wires.set(outputWire, wires.get(input1) & wires.get(input2) >>> 0);
                } else {
                    instructions.push(instruction);
                } 
            }
        } else if (input.includes('OR')) {
            const [input1, input2] = input.split(' OR ', 2);
            if (wires.has(input1) && wires.has(input2)) {
                wires.set(outputWire, wires.get(input1) | wires.get(input2) >>> 0);
            } else {
                instructions.push(instruction);
            } 
        } else if (input.includes('LSHIFT')) {
            const [input1, input2] = input.split(' LSHIFT ', 2);
            if (wires.has(input1)) {
                wires.set(outputWire, wires.get(input1) << parseInt(input2, 10) >>> 0);
            } else {
                instructions.push(instruction);
            } 
        } else if (input.includes('RSHIFT')) {
            const [input1, input2] = input.split(' RSHIFT ', 2);
            if (wires.has(input1)) {
                wires.set(outputWire, wires.get(input1) >>> parseInt(input2, 10));
            } else {
                instructions.push(instruction);
            } 
        } else if (input.includes('NOT')) {
            const input1 = input.replace('NOT ', '');
            if (wires.has(input1)) {
                wires.set(outputWire, uint16(~wires.get(input1) >>> 0));
            } else {
                instructions.push(instruction);
            } 
        } else {
            if (wires.has(input)) {
                wires.set(outputWire, wires.get(input));
            } else {
                instructions.push(instruction);
            } 
        }
    }
};



const contents = fs.readFileSync(fullFilePath, 'utf8');
const lines = contents.trim().split(/\n/g);
const lines2 = contents.trim().split(/\n/g);
const bIndex = lines2.findIndex( (v, i, a) => {
    return (v === '1674 -> b');
});
lines2.splice(bIndex, 1);

run(lines);



// console.dir(wires);
console.log('a: ' + wires.get('a'));

wires.clear();
wires.set('b', 46065);
run(lines2);

console.dir(wires);
console.log('a: ' + wires.get('a'));

