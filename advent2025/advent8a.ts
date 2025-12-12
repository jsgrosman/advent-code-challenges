import { getFileContents } from "../Utils";

type node = {
    x: number;
    y: number;
    z: number;
}

type nodePair = {
    node1: node;
    node2: node;
    distance: number;
}

const calcDistance = (x1: number, x2: number, y1: number, y2: number, z1: number, z2: number): number => {
    return (Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2) + Math.pow((z1 - z2), 2)); 
}

const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    // The test data has 20 nodes and we need to just do the first 10 connections
    // The puzzle data has 1000 nodes, and we need to do the first 1000 connections
    const MAX_CONNECTIONS = lines.length > 50 ? 1000 : 10;

    const arrayOfNodes: node[] = [];
    const arrayOfPairs: nodePair[] = [];
    const arrayOfCircuits: Set<node>[] = [];

    for (let line of lines) {
        const [x, y, z] = line.split(',',3).map(Number);
        arrayOfNodes.push( {x, y, z});
    }

    for (let i = 0; i < arrayOfNodes.length - 1; i++) {
        for (let j = i + 1; j < arrayOfNodes.length; j++) {
           const node1 = arrayOfNodes[i];
           const node2 = arrayOfNodes[j];
           const distance = calcDistance(node1.x, node2.x, node1.y, node2.y, node1.z, node2.z);
           arrayOfPairs.push( {node1, node2, distance});
        }
    }
    arrayOfPairs.sort( (n1, n2) => n1.distance - n2.distance);
    arrayOfPairs.splice(MAX_CONNECTIONS);

    for (let pair of arrayOfPairs) {
        const node1 = pair.node1;
        const node2 = pair.node2;
       
        const newCircuit = [node1, node2];
        for (let i = arrayOfCircuits.length - 1; i >= 0; i--) {
            const circuit = arrayOfCircuits[i];
            if (circuit.has(node1) || circuit.has(node2)) {
                arrayOfCircuits.splice(i, 1);
                newCircuit.push(...Array.from(circuit));
            }
        }
        arrayOfCircuits.push(new Set(newCircuit));
    }
    arrayOfCircuits.sort( (s1, s2) => s2.size - s1.size);
    const result = arrayOfCircuits[0].size * arrayOfCircuits[1].size * arrayOfCircuits[2].size;
    console.log(`Answer 1: ${result}`);
 };


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);


    const arrayOfNodes: node[] = [];
    const arrayOfPairs: nodePair[] = [];
    const arrayOfCircuits: Set<node>[] = [];

    for (let line of lines) {
        const [x, y, z] = line.split(',',3).map(Number);
        arrayOfNodes.push( {x, y, z});
    }

    for (let i = 0; i < arrayOfNodes.length - 1; i++) {
        for (let j = i + 1; j < arrayOfNodes.length; j++) {
           const node1 = arrayOfNodes[i];
           const node2 = arrayOfNodes[j];
           const distance = calcDistance(node1.x, node2.x, node1.y, node2.y, node1.z, node2.z);
           arrayOfPairs.push( {node1, node2, distance});
        }
    }
    arrayOfPairs.sort( (n1, n2) => n1.distance - n2.distance);
    for (let pair of arrayOfPairs) {
        const node1 = pair.node1;
        const node2 = pair.node2;
       
        const newCircuit = [node1, node2];
        for (let i = arrayOfCircuits.length - 1; i >= 0; i--) {
            const circuit = arrayOfCircuits[i];
            if (circuit.has(node1) || circuit.has(node2)) {
                arrayOfCircuits.splice(i, 1);
                newCircuit.push(...Array.from(circuit));
            }
        }
        const newCircuitSet: Set<node> = new Set(newCircuit);
        if (newCircuitSet.size === lines.length) {
            console.log(`Answer 2: ${node1.x * node2.x}`);
            break;
        }
        arrayOfCircuits.push(newCircuitSet);
    }
};

part1();
part2();