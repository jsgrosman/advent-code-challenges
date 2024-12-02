import { getFileContents } from "../Utils";

interface node {
    id: number;
    numChildren: number;
    numMetadata: number;
    children: node[];
    metadata: number[];
}
let maxNode = 0;
let curIndex = 0;
let metadataTotal = 0;

const parseNode = (data: number[]) => {
    const newNode: node = {
        id: maxNode++,
        numChildren: data[curIndex++],
        numMetadata: data[curIndex++],
        children: [],
        metadata: []
    }

    for (let i = 0; i < newNode.numChildren; i++) {
        newNode.children.push(parseNode(data));
    }

    for (let i = 0; i < newNode.numMetadata; i++) {
        const nextMetadata = data[curIndex++];
        metadataTotal += nextMetadata;
        newNode.metadata.push(nextMetadata);
    }

    return newNode;
}

const parseTree = (n: node) => {
    console.log(`checking node ${n.id}`);
    console.dir(n);
    if (n.numChildren === 0) {
        const value =  n.metadata.reduce( (p, c) => p + c, 0);
        console.log(`root node, ${value}`);
        return n.metadata.reduce( (p, c) => p + c, 0);
    } else {
        let totalOfChildren = 0;
        n.metadata.forEach( (nodeIndex) => {
            if (nodeIndex <= n.numChildren) {
                totalOfChildren += parseTree(n.children[nodeIndex - 1]);
            }
        } );

        return totalOfChildren;
    }


}

const part1 = () => {
    const contents = getFileContents();
    const data = contents.trim().split(/\s+/g).map(Number);

    let tree = parseNode(data);
    console.dir(tree);
    console.log(metadataTotal);

};


const part2 = () => {
    const contents = getFileContents();
    const data = contents.trim().split(/\s+/g).map(Number);

    let tree = parseNode(data);
    let total = parseTree(tree);
    console.log(total);
    



};

// part1();
part2();