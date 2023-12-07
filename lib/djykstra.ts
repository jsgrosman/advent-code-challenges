import Point from "./Point";

interface node {
    p: Point;
    distance: number;
}

const Visited: Set<node> = new Set<node>();
const ToBeVisted: Set<node> = new Set<node>();

const getNodeFromSet = (searchPoint: Point, s: Set<node>) => {
    for (const node of s) { 
        if (node.p.equals(searchPoint)) {
            return node;
        }
    }
    return null;
} 



ToBeVisted.add({p: new Point(0,0), distance: 0});

while (ToBeVisted.size > 0) {
    let [currentNode] = ToBeVisted;
    for (const tbv of ToBeVisted) {
        if (tbv.distance < currentNode.distance) {
            currentNode = tbv;
        }
    }
    // console.dir(currentNode);

    ToBeVisted.delete(currentNode);
    Visited.add(currentNode);

    if (currentNode.x === END_X && currentNode.y === END_Y) {
        console.log(`END: ${currentNode.distance}`);
        break;
    }

    const nextRooms = getNeighborOpenSpaces(currentNode.x, currentNode.y);
    for (const room of nextRooms) {
        if (!getNodeFromSet(room.x, room.y, Visited)) {
            const neighbor = getNodeFromSet(room.x, room.y, ToBeVisted);
            if (neighbor) {
                if (neighbor.distance > currentNode.distance + 1) {
                    neighbor.distance = currentNode.distance + 1;
                }
            } else {
                ToBeVisted.add( {
                    x: room.x,
                    y: room.y,
                    distance: currentNode.distance + 1
                });
            }
        }
    }
}


