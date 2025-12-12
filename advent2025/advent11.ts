import { getFileContents, shuffle } from "../Utils";

type node = {
    id: string;
    connections: string[];
    numPaths: number;
}

const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const nodeMap: Map<string, node> = new Map<string, node>();
    for (let line of lines) {
        const [inNode, outNodes] = line.split(': ', 2);
        nodeMap.set(inNode, {
            id: inNode,
            connections: outNodes.trim().split(' '),
            numPaths: 0,
        });
    }

    const startNode = 'you';
    const endNode = 'out';
    const dfs = (currentNodeId: string): number => {
        if (currentNodeId === endNode) {
            return 1;
        } else {
            const currentNode = nodeMap.get(currentNodeId)!;
            if (currentNode) {
                if (currentNode.numPaths > 0) {
                    return currentNode.numPaths;
                } else {
                    let totalPaths = currentNode.connections.reduce( (p, n) => {
                        return p + dfs(n);
                    }, 0);
                    currentNode.numPaths = totalPaths;
                    return totalPaths;
                } 
            } else {
                return 0;
            }
        }
    }

    const answer = dfs(startNode);
    console.log(`Answer 1: ${answer}`);
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const fullNodeMap: Map<string, node> = new Map<string, node>();
    const backConnections: Map<string, string[]> = new Map<string, string[]>(); 

    for (let line of lines) {
        const [inNode, outNodes] = line.split(': ', 2);
        const conns = outNodes.trim().split(' ')

        fullNodeMap.set(inNode, {
            id: inNode,
            connections: conns,
            numPaths: 0,
        });

        for (let conn of conns) {
            if (backConnections.has(conn)) {
                backConnections.get(conn)!.push(inNode);
            } else {
                backConnections.set(conn, [inNode]);
            }
        }
    }

    const next: Set<string> = new Set(['fft']);
    const fftNodes: Set<string> = new Set<string>();
    while (next.size > 0) {
        const c = Array.from(next)[0];
        next.delete(c);
        if (backConnections.has(c)) {
            for (let b of backConnections.get(c)!) {
                next.add(b);
                fftNodes.add(b);
            }
        }
    }

    const fftMap: Map<string, node> = new Map<string, node>();
    for (let node of fftNodes) {
        if (fullNodeMap.has(node)) {
            fftMap.set(node, fullNodeMap.get(node)!);
        }
    }
    
    const dfs = (currentNodeId: string, dest: string, nodeMap: Map<string, node>): number => {

        if (currentNodeId === dest) { return 1; }
        
        const currentNode = nodeMap.get(currentNodeId);
        if (!currentNode) return 0;

        if (currentNode.numPaths > 0) return currentNode.numPaths;
        let totalPaths = 0;
        for (const n of currentNode.connections) {
            totalPaths += dfs(n, dest, nodeMap);
        }

        currentNode.numPaths = totalPaths;
        return totalPaths;
    }

    const svrToFft = dfs('svr', 'fft', fftMap);
    console.log(`svrToFft: ${svrToFft}`);

    for (const node of fullNodeMap.values()) { node.numPaths = 0;}   
    const fftToDac = dfs('fft', 'dac', fullNodeMap);
    console.log(`fftToDac: ${fftToDac}`);

    for (const node of fullNodeMap.values()) { node.numPaths = 0;}  
    const dacToOut = dfs('dac', 'out', fullNodeMap);
    console.log(`dacToOut: ${dacToOut}`);

    for (const node of fullNodeMap.values()) { node.numPaths = 0;}  
    const svrToDac = dfs('svr', 'dac', fftMap);
    console.log(`svrToDac: ${svrToDac}`);

    for (const node of fullNodeMap.values()) { node.numPaths = 0;}  
    const dacToFft = dfs('dac', 'fft', fftMap);
    console.log(`dacToFft: ${dacToFft}`);

    for (const node of fullNodeMap.values()) { node.numPaths = 0;}  
    const fftToOut = dfs('fft', 'out', fftMap);
    console.log(`fftToOut: ${fftToOut}`);

    const answer = (svrToFft * fftToDac * dacToOut) + (svrToDac * dacToFft * fftToOut);
    console.log(`Answer 2: ${answer}`);
};

part1();
part2();