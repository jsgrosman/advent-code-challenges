interface BFSNode {
    data: any;
    distance: number;
    path: any[];
    // TODO: add cost? or is that just distance?
}



// Helper function to get the right node from the set, using a given compare function
const getNodeFromSet = ( compare: Function, compareTo: any,  s: Set<BFSNode>   ) => {
    for (const node of s) { 
        if (compare(node.data, compareTo)) {
            return node;
        }
    }
    return null;
} 

// TODO: Add A* heuristic?
// TODO: pass in getCost() function?

/**
 * 
 * @param startingData What ever the starting location is
 * @param compareFunction Compare two instance of the node type
 * @param getNeighbors Get valid neighbors of the current node
 * @param destination What you're looking for
 * @returns destination or null, if not found
 */
export const doBFS = ( startingData: any, destination: any , compareFunction: Function, getNeighbors: Function, costFunction: Function | undefined = undefined) => {
    const Visited: Set<BFSNode> = new Set<BFSNode>();
    const ToBeVisted: Set<BFSNode> = new Set<BFSNode>();

    // if no cost function included, then just assume it's always 1
    if (!costFunction) {
        costFunction = (v: any) => 1;
    }
    
    
    ToBeVisted.add( {
        data: startingData,
        distance: 0,
        path: [startingData]
    });

    while (ToBeVisted.size > 0) {

        // Turn this into a priority queue, somehow
        let [currentNode] = ToBeVisted;
        for (const tbv of ToBeVisted) {
            if (tbv.distance < currentNode.distance) {
                currentNode = tbv;
            }
        }
        ToBeVisted.delete(currentNode);
        Visited.add(currentNode);


        // Found it!
        if (compareFunction(currentNode.data, destination)) {
            return currentNode;
        }

        // Get the next set of valid locations
        const nextDestinations = getNeighbors(currentNode.data);
        for (const next of nextDestinations) {
            // If we haven't visited yet
            if (!getNodeFromSet(compareFunction, next, Visited)) {
                const neighbor = getNodeFromSet(compareFunction, next, ToBeVisted);
                if (neighbor) {
                    // Update the distance, if the neighbor is closer than we've seen before
                    if (neighbor.distance > currentNode.distance + costFunction(next)) {
                        neighbor.distance = currentNode.distance + costFunction(next);
                        neighbor.path = [...currentNode.path, next];
                    }
                } else {
                    ToBeVisted.add( {
                        data: next,
                        distance: currentNode.distance + costFunction(next),
                        path: [...currentNode.path, next]
                    });
                }
            }
        }
    }

    return null;
}