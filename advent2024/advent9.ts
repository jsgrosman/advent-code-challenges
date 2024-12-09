import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents(); 

    const disk = contents.split('').map(Number);
    const diskMap: number[] = [];

    let fileId = 0;
    let currentBlock = 0;
    for (let i = 0; i < disk.length; i++) {
        if (i % 2 === 0) {
            for (let n = 0; n < disk[i]; n++) {
                diskMap[currentBlock++] = fileId;
            }
            fileId++;
        } else {
            for (let n = 0; n < disk[i]; n++) {
                diskMap[currentBlock++] = -1;
            }
        }
    }

    let currentIndex = 0;
    for (let i = diskMap.length - 1; i > 0 ; i--) {
        if (diskMap.indexOf(-1) === -1) {
            break;
        } 

        if (diskMap[i] === -1) {
            diskMap.pop();
        } else {

            while (diskMap[currentIndex] !== -1) {
                currentIndex++;
            }
            diskMap[currentIndex++] = diskMap.pop()!;
            
        }
    }
    const result = diskMap.reduce( (p, c, i) => p + (c * i), 0)
    console.log(result);
};


const part2 = () => {

    interface inode {
        index: number;
        size: number;
    }

    const contents = getFileContents(); 

    const disk = contents.split('').map(Number);
    const diskMap: number[] = [];
    const blockIdMap: Map<number, inode> = new Map<number, inode>();
    const emptyBlockIndexToSize: Map<number, number> = new Map<number, number>();

    let fileId = 0;
    let currentBlock = 0;
    for (let i = 0; i < disk.length; i++) {
        if (i % 2 === 0) {
            blockIdMap.set(fileId, {index: currentBlock, size: disk[i]});
            for (let n = 0; n < disk[i]; n++) {
                diskMap[currentBlock++] = fileId;
            }
            
            fileId++;
        } else {
            emptyBlockIndexToSize.set(currentBlock, disk[i]);
            for (let n = 0; n < disk[i]; n++) {
                diskMap[currentBlock++] = -1;
            }
        }
    }

    for (let currentBlock = fileId - 1; currentBlock > 0; currentBlock--) {

        const blockINode = blockIdMap.get(currentBlock)!;
        for (let emptyIndex of Array.from(emptyBlockIndexToSize.keys()).sort((a, b) => a-b)) {

            if (emptyIndex >= blockINode.index) {
                break;
            }

            const emptySize = emptyBlockIndexToSize.get(emptyIndex)!;
            if (blockINode.size <= emptySize) {
                for (let i = 0; i < blockINode.size; i++) {
                    diskMap[emptyIndex + i] = diskMap[blockINode.index + i];
                    diskMap[blockINode.index + i] = -1;
                }

                emptyBlockIndexToSize.delete(emptyIndex);
                if (blockINode.size < emptySize) {
                    emptyBlockIndexToSize.set(emptyIndex + blockINode.size, emptySize - blockINode.size);
                }
                break;
            }
        }
    }


    const result = diskMap.reduce( (p, c, i) => c !== -1 ? p + (c * i) : p, 0)
    console.log(result);

};

// part1();
part2();