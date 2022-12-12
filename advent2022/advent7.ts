import { getFileContents } from "../Utils";

const commands = getFileContents().trim().split(/\n/g);

interface directory {
    name: string;
    subdirs: directory[];
    filesizes: number;
}

const filesystem: Map<string, directory> = new Map<string, directory>(); 

let currentDirectoryName = '';
let currentDirectory: directory;

const directoryQueue: string[] = []

for (let command of commands) {
    
    
    if (command.startsWith('$')) { // execute command
        if (command.startsWith('$ cd')) {
            currentDirectoryName = command.substring(command.lastIndexOf(' ') + 1);

            // handle backtracing
            if (currentDirectoryName === '..') {
                currentDirectoryName = directoryQueue.shift()!;
            } else {
                directoryQueue.unshift(currentDirectoryName);
            }

            
            const fullPath = directoryQueue.slice().reverse().join('/');
            // console.log(JSON.stringify(directoryQueue));
            // console.log(`CD fullpath: ${fullPath}`);

            if (filesystem.has(fullPath)) { 
                currentDirectory = filesystem.get(fullPath)!;
            } else {
                currentDirectory = {
                    name: currentDirectoryName,
                    subdirs: [],
                    filesizes: 0
                }
                filesystem.set(fullPath, currentDirectory);
            }
        } else if (command.startsWith('$ ls')) {
            // ignore?
        }

    } else { // in directory listing
        if (command.startsWith('dir')) {
            const subdirName = command.substring(command.lastIndexOf(' ') + 1);
            const fullPath = directoryQueue.slice().reverse().join('/') + '/' + subdirName;

            // console.log(`subdir fullpath: ${fullPath}`);


            if (filesystem.has(fullPath)) { 
                currentDirectory!.subdirs.push(filesystem.get(fullPath)!)
            } else {
                const subdir = {
                    name: subdirName,
                    subdirs: [],
                    filesizes: 0
                }
                currentDirectory!.subdirs.push(subdir);
                filesystem.set(fullPath, subdir);
            }
        } else {
            currentDirectory!.filesizes += Number(command.substring(0, command.indexOf(' ')));
        }
    }
}

// console.dir(filesystem);


const recurseDirectory = ( dir: directory ) => {

    if (dir.subdirs.length === 0) {
        return dir.filesizes;
    } else {
       let total = dir.filesizes;
       dir.subdirs.forEach( (d) => {
            total += recurseDirectory(d);
       })
       return total;
    }
}



const TOTAL_DISK = 70000000;
const USED_SPACE = recurseDirectory(filesystem.get('/')!);
const GOAL = 30000000;
const NEED_TO_FREE = GOAL - (TOTAL_DISK - USED_SPACE);

console.log(`used: ${USED_SPACE}`);
console.log(`free space: ${TOTAL_DISK - USED_SPACE}`);
console.log(`Need to free ${NEED_TO_FREE}`);

const options: number[] = [];
for (let dir of filesystem.values()) {
    const size = recurseDirectory(dir);
    if (size >= NEED_TO_FREE) {
        console.log(`${dir.name} is more than ${NEED_TO_FREE}`);
        options.push(size);
    }
}

options.sort((a,b) => a - b);
console.log(options[0]);