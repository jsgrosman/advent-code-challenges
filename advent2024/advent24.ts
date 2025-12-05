import { getFileContents } from "../Utils";

const sortHashmap = (h: Map<string, any>) => {
    return new Map([...h.entries()].sort((a, b) => b[0].localeCompare(a[0])));
}

const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const logicGates: Map<string, boolean> = new Map<string, boolean>();

    let row = 0;
    for (; row < lines.length; row++) {
        if (lines[row].trim() === '') {
            break;
        }

        const [gateName, gateValue] = lines[row].split(': ');
        logicGates.set(gateName, gateValue === '1');
    }
    
    console.dir(logicGates);

    interface wire {
        g1: string;
        g2: string;
        g3: string;
        op: string;
    }

    const allWires: wire[] = [];
   
    row++;
    for (; row < lines.length; row++) {
        const [_, g1, op, g2, g3] = lines[row].match(/(\w{3}) (AND|OR|XOR) (\w{3}) -> (\w{3})/)!;

        console.log(`${g1} ${op} ${g2} -> ${g3}`);
        allWires.push({
            g1, g2, g3, op
        });
    }

    while (allWires.length > 0) {
        for (let i = allWires.length - 1; i >= 0; i-- ) {
            if (logicGates.has(allWires[i].g1) && logicGates.has(allWires[i].g2)) {
                switch (allWires[i].op) {
                    case 'AND':
                        logicGates.set(allWires[i].g3, logicGates.get(allWires[i].g1)! && logicGates.get(allWires[i].g2)!) 
                        break;
                    case 'OR':
                        logicGates.set(allWires[i].g3, logicGates.get(allWires[i].g1)! || logicGates.get(allWires[i].g2)!) 
                        break;  
                    case 'XOR':
                        logicGates.set(allWires[i].g3, logicGates.get(allWires[i].g1)! !== logicGates.get(allWires[i].g2)!) 
                        break;        
                }
                allWires.splice(i, 1);
            }
        }
    }

    console.dir(logicGates);
    const zElements = Array.from(sortHashmap(logicGates).entries()).filter( v => v[0].startsWith('z'));
    console.dir(zElements);
    const result = parseInt(zElements.map( ([k, v]) => v ? 1 : 0).join(''), 2);
    console.log(result);
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const logicGates: Map<string, number> = new Map<string, number>();

    let row = 0;
    for (; row < lines.length; row++) {
        if (lines[row].trim() === '') {
            break;
        }
        const [gateName, gateValue] = lines[row].split(': ');
        logicGates.set(gateName, +gateValue);
    }
    interface wire {
        g1: string;
        g2: string;
        g3: string;
        opEval: string;
        op: string;
    }

    let allWires: wire[] = [];
    row++;
    for (; row < lines.length; row++) {
        let [_, g1, op, g2, g3] = lines[row].match(/(\w{3}) (AND|OR|XOR) (\w{3}) -> (\w{3})/)!;
        if (g2.startsWith('y')) {
            const oldG1 = g1;
            const oldG2 = g2;
            g1 = oldG2;
            g2 = oldG1;
        } else if (g1.startsWith('x')) {
            const oldG1 = g1;
            const oldG2 = g2;
            g1 = oldG2;
            g2 = oldG1;
        }
        allWires.push({
            g1, g2, g3, op, opEval: op === 'AND' ? '&&' : op === 'OR' ? '||' : '^'
        });
    }

    const carryOnString: Map<number, string> = new Map<number, string>();
    const getFullAdderString = (bitLoc: number) => {
        const bitString = String(bitLoc).padStart(2, '0');
        if (bitLoc == 0) {
            const s = `x${bitString} ^ y${bitString}`;
            const c = `x${bitString} && y${bitString}`;

            carryOnString.set(0, c);
            return [s, c];
        } else {
            const lastCarry = carryOnString.get(bitLoc - 1);
            const s = `(x${bitString} ^ y${bitString}) ^ (${lastCarry})`;
            const c = `((${lastCarry}) && (x${bitString} ^ y${bitString})) || (x${bitString} && y${bitString})`;
            carryOnString.set(bitLoc, c);
            return [s, c];
        }
    };

    const getPuzzleString = (wireId: string, allWires: wire[], depth: number): string => {
        if (depth > 75) {
            return 'LOOP';
        }
        const wire = allWires.find( v => v.g3 == wireId)!;
        const term1 = wire.g1.startsWith('x') || wire.g1.startsWith('y') ? wire.g1 : `(${getPuzzleString(wire.g1, allWires, depth + 1)})`;
        const term2 = wire.g2.startsWith('x') || wire.g2.startsWith('y') ? wire.g2 : `(${getPuzzleString(wire.g2, allWires, depth + 1)})`;
        return `${term2} ${wire.opEval} ${term1}`;
    }

    const getTerms = (wireId: string, allWires: wire[]) => {
        const currentTerms: string[] = [wireId];
        const wire = allWires.find( v => v.g3 == wireId)!;
        if  (!wire.g1.startsWith('x') && !wire.g1.startsWith('y')) {
            currentTerms.push(...getTerms(wire.g1, allWires));
        }
        if  (!wire.g2.startsWith('x') && !wire.g2.startsWith('y')) {
            currentTerms.push(...getTerms(wire.g2, allWires));
        }

        return currentTerms;
    }

    const compare = (NUM: number) => {
        const bitString = String(NUM).padStart(2,'0');
        
        for (let i = 0; i <= NUM; i++) {
            getFullAdderString(i);
        }

        const fullAdder = getFullAdderString(NUM)[0];
        const puzzle = getPuzzleString(`z${bitString}`, [...allWires], 0);

        if ( fullAdder === puzzle) {
            // console.log(puzzle);
            // console.log(fullAdder);
            console.log(`nothing to do!`);
            return ['ddp', 'ddp'];
        } else {
            console.log(puzzle);
            console.log(fullAdder);
        }

        const termsToCheck = getTerms(`z${bitString}`, allWires);
        // console.dir(termsToCheck);

        const arr = allWires.filter( (v) => termsToCheck.includes(v.g3) );
        // const arr = allWires;

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < allWires.length; j++) {


                const swap1 = arr[i].g3;
                const swap2 = allWires[j].g3;
                if (swap1 === swap2) {
                    continue;
                }

                allWires.find( (v) => v.g3 == swap1)!.g3 = swap2;
                allWires[j].g3 = swap1;

                const algo = getPuzzleString(`z${bitString}`, [...allWires], 0);
                if (algo.length === fullAdder.length && algo.startsWith(`(x${bitString} ^ y${bitString})`)) {

                    let tooHigh = false;
                    for (let n = NUM + 1; n <= 45; n++) {
                        if (algo.indexOf(`x${String(n).padStart(2,'0')}`) > -1 || algo.indexOf(`y${String(n).padStart(2,'0')}`) > -1) {
                            tooHigh = true;
                            break;
                        }
                    }

                    // if (!tooHigh) {
                    //     console.log(`swapping ${swap1} with ${swap2}`);
                    //     console.log(algo);
                    //     console.log(fullAdder);
                    // }
                }

                if (algo === fullAdder) {
                    console.log(`success! swapping ${swap1} with ${swap2}`);
                    
                   // return [swap1, swap2];
                }

                allWires.find( (v) => v.g3 == swap2)!.g3 = swap1;
                allWires[j].g3 = swap2;
                
            }
        }
        return ['XXX','XXX'];

    }


    const swap1 = allWires.find( v => v.g3 == 'fkm')!;
    const swap2 = allWires.find( v => v.g3 == 'ptf')!;
    swap1.g3 = 'ptf';
    swap2.g3 = 'fkm';

    const swap3 = allWires.find( v => v.g3 == 'ddp')!;
    const swap4 = allWires.find( v => v.g3 == 'thn')!;
    swap3.g3 = 'thn';
    swap4.g3 = 'ddp';

    const swap5 = allWires.find( v => v.g3 == 'btd')!;
    const swap6 = allWires.find( v => v.g3 == 'jdk')!;
    swap5.g3 = 'jdk';
    swap6.g3 = 'btd';

    const swap7 = allWires.find( v => v.g3 == 'nvb')!;
    const swap8 = allWires.find( v => v.g3 == 'rvj')!;
    swap7.g3 = 'rvj';
    swap8.g3 = 'nvb';

    const swap9 = allWires.find( v => v.g3 == 'tmr')!;
    const swap10 = allWires.find( v => v.g3 == 'svg')!;
    swap9.g3 = 'svg';
    swap10.g3 = 'tmr';

    const swap11 = allWires.find( v => v.g3 == 'qqs')!;
    const swap12 = allWires.find( v => v.g3 == 'vhc')!;
    swap11.g3 = 'vhc';
    swap12.g3 = 'qqs';

    // hhf fjh


    for (let i = 1; i < 15; i++) {
        const [swap1, swap2] = compare(i);
        if (swap1 !== 'XXX') {
            const wireSwap1 = allWires.find( v => v.g3 == swap1)!;
            const wireSwap2 = allWires.find( v => v.g3 == swap2)!;
            wireSwap1.g3 = swap2;
            wireSwap2.g3 = swap1;
        } else {
            console.log(`breaking at ${i}`);
            // break;
        }

    }
    //compare(7);



    // const terms: Set<string> = new Set<string>();
    // print_z('z06', allWires, 0, terms);
    //console.dir(terms);
    //
    
    
   console.log(['ptf','fkm','thn','ddp','jdk','btd','rvj','nvb'].sort().join(','));

   
   



};

// part1();
part2();

// fkm, ptf



 // const evalZ = (gate: string, allWires: wire[], depth: number) => {
    //     if (depth > 200) {
    //         return 'XX';
    //     }
    //     const zWire = allWires.find( v => v.g3 == gate)!;

    //     let term1 = '';
    //     if (zWire.g1.startsWith('x') || zWire.g1.startsWith('y')) {
    //         term1 = '' + logicGates.get(zWire.g1)!;
    //     } else {
    //         term1 = '(' + evalZ(zWire.g1, allWires, depth + 1) + ')';            
    //     }
    //     let term2 = '';
    //     if (zWire.g2.startsWith('x') || zWire.g2.startsWith('y')) {
    //         term2 = '' + logicGates.get(zWire.g2)!
    //     } else {
    //         term2 = '(' + evalZ(zWire.g2, allWires, depth + 1) + ')';
    //     }
    //     return `${term1} ${zWire.opEval} ${term2}`;
    // }


   

    // for (let NUM_BITS = 1; NUM_BITS < 5; NUM_BITS++) {

    //     let z = '';
    //     let x = '';
    //     let y = '';        

    //     for (let i = 0; i < NUM_BITS + 1; i++) {
    //         const bitString = String(i).padStart(2, '0');
    //         // console.log(evalZ('z' + bitString, allWires, 0));
    //         const bit = eval(evalZ('z' + bitString, allWires, 0));
    //         z = bit + z;
    //         x = logicGates.get('x' + bitString) + x;
    //         y = logicGates.get('y' + bitString) + y;
    //     }
    //     x = x.substring(1);
    //     y = y.substring(1);


    //     // console.log(`${x} + ${y} == ${z}`);
    //     console.log(`${parseInt(x, 2)} + ${parseInt(y, 2)} == ${parseInt(z, 2)}`);
    // }