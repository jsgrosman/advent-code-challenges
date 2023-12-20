import { getFileContents } from "../Utils";


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

    // initialize the memory of all Conjunction modules
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

    type pulseMsg = {
        source: string;
        type: 'high' | 'low';
        dest: string;
    }

    const pulseQueue: pulseMsg[] = [];

    const sendPulse = (source: string, id: string, pulseType: 'low' | 'high', buttonPushes: number) => {
        //console.log(`${source} -${pulseType} -> ${id}`);
        pulseType === 'low' ? lowTotal++ : highTotal++;

        if (!moduleMap.has(id)) {
            return;
        }

        const module = moduleMap.get(id)!;
        switch (module.type) {
            case 'broad': {
                for (let dest of module.destinations) {
                    pulseQueue.push( {source: id, type: pulseType, dest});
                }
                return;
            }
            case 'flip': {
                if (pulseType === 'low') {
                    module.state = !module.state;
                    for (let dest of module.destinations) {
                        pulseQueue.push( {source: id, type: module.state ? 'high' : 'low', dest});
                    }
                }
                return;
            }
            case 'conj': {
                module.memory.set(source, pulseType);
                const sendPulseType = Array.from(module.memory.values()).filter( v => v === 'low').length === 0 ? 'low' : 'high';
                for (let dest of module.destinations) {
                    pulseQueue.push( {source: id, type: sendPulseType, dest});
                }
                return;
            }


        }
    }

    for (let i = 0; i < 1000; i++) {
        pulseQueue.push( {
            source: 'button',
            type: 'low',
            dest: 'broadcaster'
        });

        while (pulseQueue.length > 0) {
            const nextPulse = pulseQueue.shift()!;
            sendPulse(nextPulse.source, nextPulse.dest, nextPulse.type, i);
        }
    }

    console.log(`${highTotal}, ${lowTotal} = ${highTotal * lowTotal}`);

};

part1();
