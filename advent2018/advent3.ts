import { getFileContents } from "../Utils";
import Point from "../lib/Point";
    

const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);
    
    const claimMap: Map<string, number> = new Map<string, number>();
    
    for (let claim of lines) {
        const [_, claimId, claimX, claimY, claimWidth, claimHeight] = claim.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/)!;
        
        for (let x = Number(claimX); x < Number(claimX) + Number(claimWidth); x++) {
            for (let y = Number(claimY); y < Number(claimY) + Number(claimHeight); y++) {
                const claimPoint = new Point(x, y);
                const claimKey = claimPoint.toString();
                if (claimMap.has(claimKey)) {
                    claimMap.set(claimKey, claimMap.get(claimKey)! + 1);
                } else {
                    claimMap.set(claimKey, 1);
                }
            }
        }
    }
    
    const total = Array.from(claimMap.values()).filter( v => v > 1).length;
    console.log(`total = ${total}`);
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);
    
    const claimMap: Map<string, number> = new Map<string, number>();
    
    for (let claim of lines) {
        const [_, claimId, claimX, claimY, claimWidth, claimHeight] = claim.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/)!;
        
        for (let x = Number(claimX); x < Number(claimX) + Number(claimWidth); x++) {
            for (let y = Number(claimY); y < Number(claimY) + Number(claimHeight); y++) {
                const claimPoint = new Point(x, y);
                const claimKey = claimPoint.toString();
                if (claimMap.has(claimKey)) {
                    claimMap.set(claimKey, claimMap.get(claimKey)! + 1);
                } else {
                    claimMap.set(claimKey, 1);
                }
            }
        }
    }

    NEXT_CLAIM:
    for (let claim of lines) {
        const [_, claimId, claimX, claimY, claimWidth, claimHeight] = claim.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/)!;
        
        for (let x = Number(claimX); x < Number(claimX) + Number(claimWidth); x++) {
            for (let y = Number(claimY); y < Number(claimY) + Number(claimHeight); y++) {
                const claimPoint = new Point(x, y);
                const claimKey = claimPoint.toString();
                if (claimMap.has(claimKey)) {
                    const value = claimMap.get(claimKey)!;
                    if (value > 1) {
                       continue NEXT_CLAIM; 
                    }
                } 
            }
        }

        console.log(`Safe Claim: ${claimId}`);
    }
};

// part1();
part2();