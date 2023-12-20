import { getFileContents } from "../Utils";
import { lcm } from "../lib/AOCMath";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    
    type flip = {
        type: 'flip';
        state: boolean;
        destinations: string[];
    }

    type conj = {
        type: 'conj';
        memory:  Map<string, 'low' | 'high'>;
        destinations: string[];
    }

    type broad = {
        type: 'broad';
        destinations: string[];
    }

    type module = | flip | conj | broad;

    const moduleMap: Map<string, module> = new Map<string, module>();

    const allPossibleDests: string[] = [];

    for (const line of lines) {
        const [moduleType, destList] = line.split(' -> '); 
        if (moduleType.startsWith('broadcaster')) {
            moduleMap.set('broadcaster', {
                type: "broad",
                destinations: destList.split(', ')
            });
        } else if (moduleType.startsWith('%')) {
            const id = moduleType.substring(1);
            moduleMap.set(id, {
                type: "flip",
                state: false,
                destinations: destList.split(', ')
            });
            for (let d of destList.split(', ')) {
                allPossibleDests.push(`${d},${id}`);
            }

        } else if (moduleType.startsWith('&')) {
            const id = moduleType.substring(1);
            const memory = new Map<string, 'low' | 'high'>();

            moduleMap.set(id, {
                type: "conj",
                memory,
                destinations: destList.split(', ')
            });
            for (let d of destList.split(', ')) {
                allPossibleDests.push(`${d},${id}`);
            }
        }
    }

    for (let d of allPossibleDests) {
        const [dest, source] = d.split(',');
        if (moduleMap.has(dest)) {
            const m = moduleMap.get(dest)!;
            if (m.type === 'conj') {
                m.memory.set(source, 'low');
            }
        }
    }


    let highTotal = 0;
    let lowTotal = 0;

    // console.dir(moduleMap);

    type pulseMsg = {
        source: string;
        type: 'high' | 'low';
        dest: string;
    }

    const pulseQueue: pulseMsg[] = [];

    let lowToRx = false;
    
    const sendPulse = (source: string, id: string, pulseType: 'low' | 'high', buttonPushes: number) => {

        if (id == 'dg' && pulseType === 'high') {
            console.log(`${source} -> ${buttonPushes}`);
        }

        //console.log(`${source} -${pulseType} -> ${id}`);
        pulseType === 'low' ? lowTotal++ : highTotal++;
       

        if (id === 'rx' && pulseType === 'low') {
            console.log(`rx: button pushes ${buttonPushes}`);
            lowToRx = true;
        }

        if (!moduleMap.has(id)) {
            // console.log(`output: ${pulseType}`);
            return;
        }

        const module = moduleMap.get(id)!;
        if (module.type === 'broad') {
            for (let dest of module.destinations) {
                pulseQueue.push( {source: id, type: pulseType, dest});
            }
            return;
        }
        if (module.type === 'flip') {
            if (pulseType === 'low') {
                module.state = !module.state;
                for (let dest of module.destinations) {
                    pulseQueue.push( {source: id, type: module.state ? 'high' : 'low', dest});
                }
            }
            return;
        }

        if (module.type === 'conj') {
            module.memory.set(source, pulseType);
            if (Array.from(module.memory.values()).filter( v => v === 'low').length === 0 ) {
                for (let dest of module.destinations) {
                    pulseQueue.push( {source: id, type: 'low', dest});
                }
            } else {
                for (let dest of module.destinations) {
                    pulseQueue.push( {source: id, type: 'high', dest});
                }
            }
            return;
        }
    }

    let i = 0;
    while (lowToRx === false) {
        i++;

        pulseQueue.push( {
            source: 'button',
            type: 'low',
            dest: 'broadcaster'
        });

        while (pulseQueue.length > 0) {
            const nextPulse = pulseQueue.shift()!;
            sendPulse(nextPulse.source, nextPulse.dest, nextPulse.type, i);
        }

        if (i > 10000) {
            break;
        }
    }

    // console.log(`${highTotal}, ${lowTotal} = ${highTotal * lowTotal}`);

    console.log(lcm(lcm(lcm(3767, 3823), 3929), 4051));
    
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);


};

part1();
// part2();