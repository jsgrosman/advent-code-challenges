import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const network: Map<string, string[]> = new Map<string, string[]>();
    for (let line of lines) {
        let [comp1, comp2] = line.split('-', 2);
        !network.has(comp1) ? network.set(comp1, [comp2]) : network.get(comp1)!.push(comp2);
        !network.has(comp2) ? network.set(comp2, [comp1]) : network.get(comp2)!.push(comp1);
    }

    let currentGroups = new Set(lines.map( v => v.split('-').toSorted().join(',')));
    let currentSize = 2;

    while (currentSize < 3) {
        const newGroups: Set<string> = new Set<string>();
        for (let group of currentGroups) {
            const comps = group.split(',');
            const commonComps = comps.map( c => network.get(c)! ).reduce( (a,b) =>  a.filter(c => b.includes(c)));
            
            if (commonComps.length > 0) {
                for (let common of commonComps) {
                    newGroups.add([...comps, common].sort().join(','));
                }
            }
        }
        currentSize++;
        currentGroups = newGroups;
    }

    console.log(`part 1: ${Array.from(currentGroups).sort().filter( (v) => v.split(',').some( v1 => v1.startsWith('t'))).length}`);
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const network: Map<string, string[]> = new Map<string, string[]>();
    for (let line of lines) {
        let [comp1, comp2] = line.split('-', 2);
        !network.has(comp1) ? network.set(comp1, [comp2]) : network.get(comp1)!.push(comp2);
        !network.has(comp2) ? network.set(comp2, [comp1]) : network.get(comp2)!.push(comp1);
    }

    let currentGroups = new Set(lines.map( v => v.split('-').toSorted().join(',')));
    let currentSize = 2;

    while (currentGroups.size > 1) {
        const newGroups: Set<string> = new Set<string>();

        for (let group of currentGroups) {
            const comps = group.split(',');
            const commonComps = comps.map( c => network.get(c)! ).reduce( (a,b) =>  a.filter(c => b.includes(c)));
            
            if (commonComps.length > 0) {
                for (let common of commonComps) {
                    newGroups.add([...comps, common].sort().join(','));
                }
            }

        }
        currentSize++;
        currentGroups = newGroups;
    }

    console.log(`part2: ${Array.from(currentGroups).sort()}`);
    // console.dir(Array.from(currentGroups).sort().filter( (v) => v.split('-').some( v1 => v1.startsWith('t'))  ).length);
    // .filter( (v) => v.split('-').filter( (v1) => v.startsWith('t')).length > 0));

    


    
};

part1();
part2();