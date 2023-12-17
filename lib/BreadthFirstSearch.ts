interface Node {
    data: any;
    distance: number;
    path: any[];
    // TODO: add cost? or is that just distance?
}
export default class BFS {

    // Helper function to get the right node from the set, using a given compare function
    private getNodeFromSet = ( compare: Function, compareTo: any,  s: Set<Node>   ) => {
        for (const node of s) { 
            if (compare(node.data, compareTo)) {
                return node;
            }
        }
        return null;
    } 

    // TODO: Add A* heuristic?

    private Visited: Set<Node> = new Set<Node>();
    private ToBeVisted: Set<Node> = new Set<Node>();

    public getVisitedSet() {
        return this.Visited;
    }

    /**
     * 
     * @param start What ever the starting location is
     * @param compareFunction Compare two instance of the node type
     * @param getNeighbors Get valid neighbors of the current node
     * @param destination What you're looking for
     * @returns destination or null, if not found
     */
    public execute( start: any, destination: any , compareFunction: Function, getNeighbors: Function, usePriorityQueue: boolean = true, costFunction: Function | undefined = undefined) {

        // if no cost function included, then just assume it's always 1
        if (!costFunction) {
            costFunction = (v: any) => 1;
        }
        
        this.ToBeVisted.add( {
            data: start,
            distance: 0,
            path: [start]
        });

        while (this.ToBeVisted.size > 0) {

            // Turn this into a priority queue
            let [currentNode] = this.ToBeVisted;

            if (usePriorityQueue) {
                for (const tbv of this.ToBeVisted) {
                    if (tbv.distance < currentNode.distance) {
                        currentNode = tbv;
                    }
                }
            }
            this.ToBeVisted.delete(currentNode);
            this.Visited.add(currentNode);

            // Found it!
            if (destination && compareFunction(currentNode.data, destination)) {
                return currentNode;
            }

            // Get the next set of valid locations
            const nextDestinations = getNeighbors(currentNode.data);
            for (const next of nextDestinations) {
                // If we haven't visited yet
                if (!this.getNodeFromSet(compareFunction, next, this.Visited)) {
                    const neighbor = this.getNodeFromSet(compareFunction, next, this.ToBeVisted);
                    if (neighbor) {
                        // Update the distance, if the neighbor is closer than we've seen before
                        if (neighbor.distance > currentNode.distance + costFunction(next)) {
                            neighbor.distance = currentNode.distance + costFunction(next);
                            neighbor.path = [...currentNode.path, next];
                        }
                    } else {
                        this.ToBeVisted.add( {
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
}