import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const workflows: Map<string, string[]> = new Map<string, string[]>();
    const parts: Map<string, number>[] = [];


    for (let line of lines) {
        if (line.trim() === '') {
            continue;
        } else if (line.startsWith('{')) {
            const partsMap = new Map<string, number>();
            const partsList = line.substring(1, line.length - 1).split(',');
            for (let part of partsList) {
                const [id, value] = part.split('=', 2);
                partsMap.set(id, Number(value));
            }
            parts.push(partsMap);
        } else {
            const [name, rules] = line.split(/{|}/, 2);
            workflows.set(name, rules.split(','));
        }
    }

    // console.dir(parts);
    // console.dir(workflows);

    const parseRule = (part: Map<string, number>, workflow: string[]): boolean => {

        let nextDestination = 'R';
        for (const rule of workflow) {
            if (rule.includes(':')) {
                const [exp, dest] = rule.split(':');
                if (exp.includes('>')) {
                    const [partId, value] = exp.split('>');
                    if (part.get(partId)! > Number(value)) {
                        nextDestination = dest;
                        break;
                    }
                } else if (exp.includes('<')) {
                    const [partId, value] = exp.split('<');
                    if (part.get(partId)! < Number(value)) {
                        nextDestination = dest;
                        break;
                    }
                }
            } else {
                nextDestination = rule;
            }
        }

        if (nextDestination === 'A') {
            return true;
        } else if (nextDestination === 'R') {
            return false;
        } else {
            return parseRule(part, workflows.get(nextDestination)!);
        }

    }

    let total = 0;
    for (const part of parts) {

        const result = parseRule(part, workflows.get('in')!);
        if (result === true) {
            total += Array.from(part.values()).reduce( (p, c) => p + c);
        }

    }

    console.log(`total = ${total}`);

};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const workflows: Map<string, string[]> = new Map<string, string[]>();


    for (let line of lines) {
        if (line.trim() === '') {
            break;
        } 

        const [name, rules] = line.split(/{|}/, 2);
        workflows.set(name, rules.split(','));
        
    }

    const calculateFor = (partId: string, path: string) => {
        let min = 1;
        let max = 4001;
        const pathParts = path.split(':');
        for (let part of pathParts) {
            if (part.startsWith(partId)) {
                if (part.includes('>')) {
                    const [partId, value] = part.split('>');
                    min = Math.max(min, Number(value) + 1);
                } else {
                    const [partId, value] = part.split('<');
                    max = Math.min(max, Number(value));
                }
            }
        }
        console.log(`calc: ${partId} : ${min} => ${max} : ${max - min}`);

        return max - min;
    }

    const parseRule = (workflow: string[], path: string): number => {

        let ruleTotal = 0;
        for (let index = 0; index < workflow.length; index++) {
            const rule = workflow[index];
            let currentExp = '';
            let nextDestination = 'R';
            if (rule.includes(':')) {
                const [exp, dest] = rule.split(':');
                currentExp = exp;
                nextDestination = dest;
            } else {
                nextDestination = rule;
            }

            
            if (nextDestination === 'A') {
                const total = ['x', 'm', 'a', 's'].reduce( (p, c) => p * calculateFor(c, path + ':' + currentExp), 1 );
                ruleTotal += total;
                console.log(`A: ${path}:${currentExp} => ${total}`);

            } else if (nextDestination === 'R') {
                console.log(`R: ${path}:${currentExp} => REJECTION!`);
            } else {
                const nextWorkflow = workflows.get(nextDestination)!;
                ruleTotal += parseRule(nextWorkflow, path + ':' + currentExp);
            }

            if (currentExp.includes('<')) {
                const [partId, value] = currentExp.split('<');
                path = path + ':' + partId + '>' + String(Number(value) - 1);
            } else if (currentExp.includes('>')){
                const [partId, value] = currentExp.split('>');
                path = path + ':' + partId + '<' + String(Number(value) + 1);
            }

        }
        
        return ruleTotal;

        
    }

    const result = parseRule(workflows.get('in')!, '');
    console.log(`Result = ${result}`);

};

// part1();
part2();