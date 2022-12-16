import { getFileContents } from "../Utils";
    
const contents = getFileContents().trim().split(/\n/g);


interface valveNode {
    name: string;
    flow: number;
    children: string[];
    status: string;
}

const valveMap: Map<string, valveNode> = new Map<string, valveNode>();

for (let line of contents) {
   const valves = line.match(/[A-Z][A-Z]/g) || ['XX'];
   const flow = line.match(/\d+/g) || [0];

   const node = {
     name: valves[0],
     flow: Number(flow[0]),
     children: valves.slice(1),
     status: 'off'
   }
   valveMap.set(valves[0], node);
}

for (let [k, v] of valveMap) {
    v.children.sort( (a,b) => {
        const aFlow = valveMap.get(a)!.flow;
        const bFlow = valveMap.get(b)!.flow;
        return bFlow - aFlow;
    });
}


let endFlow = 0;

const transverse = ( currentValve: string, currentFlowRate: number, minutes: number, path: string, prev: string) => {
    const currentNode = valveMap.get(currentValve)!;
    if (!path.includes(currentValve) && currentNode.flow > 0) {
        minutes--;
        currentFlowRate += (currentNode.flow * minutes);
    }

    if (minutes <= 0) {
        if (currentFlowRate > endFlow) {
            endFlow = currentFlowRate;
            console.log(endFlow);
        }
        return;
    }

    for (let child of currentNode.children) {
        if (currentNode.children.length === 1 || child !== prev) { // only retrace your step if there's no other option
            transverse(child, currentFlowRate, minutes - 1, path + ':' + currentValve, currentValve);
        }
    }
}


const transverseWithElephant = ( currentValve: string, currentElephantValve: string, currentFlowRate: number, minutes: number, path: string, prev: string, elephantPrev: string) => {
   
    minutes--;
   
    if (minutes <= 0) {
        if (currentFlowRate > endFlow) {
            endFlow = currentFlowRate;
            console.log(endFlow);
        }
        return;
    }

    let IturnedOff = false;
    let ElephantTurnedOff = false;

   
    const currentNode = valveMap.get(currentValve)!;
    if (!path.includes(currentValve) && currentNode.flow > 0) {
        IturnedOff = true;
        currentFlowRate += (currentNode.flow * minutes);
    }

    const currentElephantNode = valveMap.get(currentElephantValve)!;

    if (currentValve !== currentElephantValve) {
        if (!path.includes(currentElephantValve) && currentElephantNode.flow > 0) {
            ElephantTurnedOff = true;
            currentFlowRate += (currentElephantNode.flow * minutes);
        }
    }

    if (ElephantTurnedOff && IturnedOff) { // both of us need to stay behind
        transverseWithElephant(currentValve, currentElephantValve, currentFlowRate, minutes, path + ':' + currentValve + ':' + currentElephantValve, prev, elephantPrev);
    } else if (ElephantTurnedOff) { // elephant needs to stay behind
        for (let child of currentNode.children) {
            if ( (currentNode.children.length === 1 || child !== prev)) {
                transverseWithElephant(child, currentElephantValve, currentFlowRate, minutes, path + ':' + currentValve + ':' + currentElephantValve, currentValve, elephantPrev);
            }
        }
    } else if (IturnedOff) { // i need to stay beind
        for (let elephantChild of currentElephantNode.children) {
            if ( (currentElephantNode.children.length === 1 || elephantChild !== elephantPrev)) {
                transverseWithElephant(currentValve, elephantChild, currentFlowRate, minutes, path + ':' + currentValve + ':' + currentElephantValve, prev, currentElephantValve);
            }
        }
    } else {
        for (let child of currentNode.children) {
            for (let elephantChild of currentElephantNode.children) {
                if ( (currentNode.children.length === 1 || child !== prev) &&
                (currentElephantNode.children.length === 1 || elephantChild !== elephantPrev)) {
                    transverseWithElephant(child, elephantChild, currentFlowRate, minutes, path + ':' + currentValve + ':' + currentElephantValve, currentValve, currentElephantValve);
                }
            }
        }
    }
}


// transverse('AA', 0, 30, '', '');
transverseWithElephant('AA', 'AA', 0, 26, '', '', '');
console.log(endFlow);
