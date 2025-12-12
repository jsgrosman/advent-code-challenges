import { getFileContents } from "../Utils";

type node = {
    id: number;
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
    return ((x1 - x2)**2 + (y1 - y2)**2 +(z1 - z2)**2); 
}

let parent: number[] = [];
let size: number[] = [];
const find = (n: number) => {
    if (parent[n] !== n) {
        parent[n] = find(parent[n]);
    }
    return parent[n];
}
const union = (a: number, b: number) => {
    let rootA = find(a);
    let rootB = find(b);

    if (rootA === rootB) return;

    // Union by size
    if (size[rootA] < size[rootB]) {
        [rootA, rootB] = [rootB, rootA];
    }

    parent[rootB] = rootA;
    size[rootA] += size[rootB];
}

const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    // The test data has 20 nodes and we need to just do the first 10 connections
    // The puzzle data has 1000 nodes, and we need to do the first 1000 connections
    const MAX_CONNECTIONS = lines.length > 50 ? 1000 : 10;

    const arrayOfNodes: node[] = [];
    const arrayOfPairs: nodePair[] = [];

    let id = 0;
    for (let line of lines) {
        const [x, y, z] = line.split(',',3).map(Number);
        arrayOfNodes.push( {id, x, y, z});
        id++;
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

    parent = Array.from({length: arrayOfNodes.length}, (_, i) => i);
    size = Array.from({length: arrayOfNodes.length}, () => 1);


    for (let pair of arrayOfPairs) {
        const node1 = pair.node1;
        const node2 = pair.node2;
        union(node1.id, node2.id);
    }
 
    const clusterSizes = size.slice().sort( (a,b) => b - a);
    const result = clusterSizes[0] * clusterSizes[1] * clusterSizes[2];
    console.log(`Answer 1: ${result}`);
 };


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);


    const arrayOfNodes: node[] = [];
    const arrayOfPairs: nodePair[] = [];

    let id = 0;
    for (let line of lines) {
        const [x, y, z] = line.split(',',3).map(Number);
        arrayOfNodes.push( {id, x, y, z});
        id++;
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
   
    parent = Array.from({length: arrayOfNodes.length}, (_, i) => i);
    size = Array.from({length: arrayOfNodes.length}, () => 1);



    for (let pair of arrayOfPairs) {
        const node1 = pair.node1;
        const node2 = pair.node2;
        union(node1.id, node2.id);

        if (Math.max(...size) === lines.length) {
            console.log(`Answer 2: ${node1.x * node2.x}`);
            break;
        }
    }
};

part1();
part2();