import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);


interface room {
    name: string;
    passages: string[];
}
const caveMap = new Map<string, room>();

for (let line of lines) {
    const [entrance, exit] = line.split('-', 2);

    if (caveMap.has(entrance)) {
        caveMap.get(entrance)!.passages.push(exit);
    } else {
        caveMap.set(entrance, {
            name: entrance,
            passages: [exit]
        });
    }
    
    if (entrance !== 'start') {
        if (caveMap.has(exit)) {
            caveMap.get(exit)!.passages.push(entrance);
        } else {
            caveMap.set(exit, {
                name: exit,
                passages: [entrance]
            });
        } 
    }
}

let pathCount = 0;

const isLowerCaseRoom = (room: string) => {
    return room.toLocaleLowerCase() === room;
}

const visitRoom = (currentRoom: string, currentPath: string, revistedSmallCave: boolean) => {
    
    // console.log(`Visiting ${currentRoom} with current path: ${currentPath}`);

    if (currentRoom === 'end') {
        console.log(`Path: ${currentPath}`);
        pathCount++;
        return;
    } else {
        if (caveMap.has(currentRoom)) {
            const roomPassages = caveMap.get(currentRoom)!.passages;
            for (let nextRoom of roomPassages) {
                let revisted = revistedSmallCave;
                if (isLowerCaseRoom(nextRoom) && currentPath.includes(`${nextRoom},`) ) {
                    if (revistedSmallCave) {
                        continue; // skip
                    } else {
                        revisted = true;
                    }
                }
                if (nextRoom === 'start') {
                    continue;
                }

                visitRoom(nextRoom, `${currentPath},${nextRoom}`, revisted);
            }
        } // else room is a dead end
    }

}

console.dir(caveMap);
visitRoom('start', 'start', false);

console.log(`Number of paths: ${pathCount}`);