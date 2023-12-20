    import { getFileContents } from "../Utils";
    
    
    
    const part1and2 = () => {
        const contents = getFileContents();
        const codes = contents.trim().split(',');

        const hash = (value: string) => {
            return value.split('').reduce( (p, v) => {return ((p + v.charCodeAt(0)) * 17) % 256;}, 0);     
        }


        const hashTotal = codes.reduce( (p, v) => p + hash(v), 0);
        console.log(`Part 1 Total: ${hashTotal}`);

        const lensMap = new Map<number, string[]>(Array.from({ length: 256 }, (_, i) => [i, []]));
        for (let code of codes) {
            if (code.includes('-')) {
                const [label] = code.split('-');
                const boxNumber = hash(label);
                lensMap.set(boxNumber, lensMap.get(boxNumber)!.filter( (v) => !v.startsWith(label)));
            } else if (code.includes('=')) {
                const [label, focalLength] = code.split('=');
                const boxNumber = hash(label);
                const boxList = lensMap.get(boxNumber)!;
                
                const foundIndex = boxList.findIndex(box => box.startsWith(label));
                foundIndex !== -1
                ? (boxList[foundIndex] = `${label} ${focalLength}`)
                : boxList.push(`${label} ${focalLength}`);
            }
        }
        
        let lensTotal = 0;
        for (const [boxNumber, boxList] of lensMap.entries()) {
            if (boxList.length > 0) {
                lensTotal += boxList.reduce( (p, v, index) => {
                    return p + ((boxNumber + 1) * (index + 1) * Number(v.split(' ')[1]));
                }, 0);
            }
        }
        console.log(`Total Part 2: ${lensTotal}`);
    };
    

    const part2b = () => {
        const contents = getFileContents();
        const codes = contents.trim().split(',');
        const hash = (value: string) => value.split('').reduce( (p, v) => {return ((p + v.charCodeAt(0)) * 17) % 256;}, 0);
        const hashTotal = codes.reduce( (p, v) => p + hash(v), 0);
        console.log(`Part 1 Total: ${hashTotal}`);

        const lensMap: string[][] = Array.from({ length: 256 }, () => []);
        for (let code of codes) {
            if (code.includes('-')) {
                const [label] = code.split('-');
                const boxNumber = hash(label);
                lensMap[boxNumber] = lensMap[boxNumber]!.filter( (v) => !v.startsWith(label) );
            } else if (code.includes('=')) {
                const [label, focalLength] = code.split('=');
                const boxNumber = hash(label);
                
                const foundIndex = lensMap[boxNumber].findIndex(box => box.startsWith(label));
                foundIndex !== -1
                ? (lensMap[boxNumber][foundIndex] = `${label} ${focalLength}`)
                : lensMap[boxNumber].push(`${label} ${focalLength}`);
            }
        }
        
        let lensTotal = lensMap.flatMap( (boxList, boxNumber) => 
            boxList.lastIndexOf > 0 ?
                boxList.reduce()
        
        for (const [boxNumber, boxList] of lensMap.entries()) {
            if (boxList.length > 0) {
                lensTotal += boxList.reduce( (p, v, index) => {
                    return p + ((boxNumber + 1) * (index + 1) * Number(v.split(' ')[1]));
                }, 0);
            }
        }
        console.log(`Total Part 2: ${lensTotal}`);
    };
        
    

    part2b();