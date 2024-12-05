import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const rules: number[][] = [];
 
    let lineNum = 0;
    for (;lineNum < lines.length; lineNum++) {
        if (lines[lineNum].trim() == '') {
            lineNum++
             break;
        }
        const [before, after] = lines[lineNum].split('|', 2).map(Number);
        rules.push([before, after]);
    }
    

    let total = 0;
    NEXT_PAGES:
    for (;lineNum < lines.length; lineNum++) {
        const pages = lines[lineNum].split(',').map(Number);
        const beforePages:number[] = [];
        for (let index = 0; index < pages.length; index++) {
            for (let [before, _] of rules.filter( (v) => v[1] === pages[index])) {
                if (pages.includes(before) && !beforePages.includes(before)) {
                    continue NEXT_PAGES;
                }
            }
            beforePages.push(pages[index]);

        }
        total += pages[Math.floor(pages.length / 2)];

    }

    console.log(`total = ${total}`);
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const rules: number[][] = [];
 
    let lineNum = 0;
    for (;lineNum < lines.length; lineNum++) {
        if (lines[lineNum].trim() == '') {
            lineNum++
             break;
        }
        const [before, after] = lines[lineNum].split('|', 2).map(Number);
        rules.push([before, after]);
    }
    
    let reorder = (arr: number[]) => {
        const orderedArray: number[] = [];
        const arrLength = arr.length;

        while (orderedArray.length < arrLength) {
            const validRules = rules.filter ( (v) => arr.includes(v[0]) && arr.includes(v[1]) );

            for (let index = 0; index < arr.length; index++) {
                const page = arr[index];
                if (validRules.filter( (v) => v[1] === page ).length === 0) {
                    orderedArray.push(page);
                    arr.splice(index, 1);
                }
            }
        }
        return orderedArray;
    }


    let total = 0;
    NEXT_PAGES:
    for (;lineNum < lines.length; lineNum++) {
        const pages = lines[lineNum].split(',').map(Number);
        const beforePages:number[] = [];
        for (let index = 0; index < pages.length; index++) {

            for (let [before, _] of rules.filter( (v) => v[1] === pages[index])) {
                if (pages.includes(before) && !beforePages.includes(before)) {
                    const reordered = reorder(pages);
                    total += reordered[Math.floor(reordered.length / 2)];
                    continue NEXT_PAGES;
                }
            }
            beforePages.push(pages[index]);
        }
        

    }

    console.log(`total = ${total}`);


};

part1();
part2();