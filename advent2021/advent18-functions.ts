const getDepth = (snail: string, index: number) => {
    let openBracketCount = 0;
    let closeBacketCount = 0;

    for (let i = 0; i < index; i++) {
        if (snail.charAt(i) === '[') {
            openBracketCount++;
        } else if (snail.charAt(i) === ']') {
            closeBacketCount++;
        }
    }

    return openBracketCount - closeBacketCount;
}


export const explode = (snail: string) => {
    const allMatches = snail.matchAll(/\[(\d+),(\d+)\]/g);
    for (let match of allMatches) {
        if (getDepth(snail, Number(match.index)) >= 4) {
            let matchIndex = Number(match.index);
            const leftNum = Number(match[1]);
            const rightNum = Number(match[2]);
            
            // go left
            for (let i = matchIndex - 1; i > 0; i--) {
                if (/\d/.test(snail.charAt(i))) {
                    let n = 0;
                    if (/\d/.test(snail.charAt(i - 1))) {
                        n = Number(snail.charAt(i - 1) + snail.charAt(i));
                    } else {
                        n = Number(snail.charAt(i));
                    }
                    // console.log(`left explode: ${n}`);
                    // console.log(snail.substring(0, i - (String(n).length - 1)));
                    // console.log(String(n + leftNum));
                    // console.log(snail.substring(i + 1));

                    snail = snail.substring(0, i - (String(n).length - 1)) + String(n + leftNum) + snail.substring(i + 1);
                    
                    matchIndex += String(n + leftNum).length -  String(n).length;
                    
                    break;
                }
            }

            // go right
            for (let i = matchIndex + match[0].length; i < snail.length; i++) {
                if (/\d/.test(snail.charAt(i))) {
                    let n = 0;
                    if (/\d/.test(snail.charAt(i + 1))) {
                        n = Number(snail.charAt(i) + snail.charAt(i + 1));
                    } else {
                        n = Number(snail.charAt(i));
                    }
                    // console.log(`right explode: ${n}`);
                    // console.log(snail.substring(0, i));
                    // console.log(String(n + rightNum));
                    // console.log(snail.substring(i + String(n).length));

                    snail = snail.substring(0, i) + String(n + rightNum) + snail.substring(i + String(n).length);
                    break;
                }
            }
            // console.log(`adding 0`);
            // console.log(snail.substring(0, matchIndex));
            // console.log(snail.substring(matchIndex + match[0].length));

            snail = snail.substring(0, matchIndex) + '0' + snail.substring(matchIndex + match[0].length);
            break;
        }
    }
    return snail;
}

export const split = (snail: string) => {
    const match = snail.match(/\d{2,}/) || [];
    if (match[0]) {
        const matchIndex = Number(match.index);
        const matchedNumber = Number(match[0]);
        const leftNum = Math.floor(matchedNumber/2);
        const rightNum = Math.ceil(matchedNumber/2);

        snail = snail.substring(0, matchIndex) + `[${leftNum},${rightNum}]` + snail.substring(matchIndex + match[0].length);
    }

    return snail;
}

export const add = (snail1: string, snail2: string) => {
    return `[${snail1},${snail2}]`;
}

export const reduce = (snail: string) => {

    let currentSnail = snail;
    while (true) {        
        let explodedSnail = explode(currentSnail);
        if (explodedSnail === currentSnail) {
            let splitSnail = split(currentSnail);
            if (splitSnail === currentSnail) {
                break;
            } else {
                currentSnail = splitSnail;
                // console.log(`split: ${currentSnail}`);
            }
        } else {
            currentSnail = explodedSnail;
            // console.log(`explode: ${currentSnail}`);
        }

        
    }

    return currentSnail;

}

export const magnitude = (snail: string) => {
    

    let currentSnail = snail;
    
    let match = currentSnail.match(/\[(\d+),(\d+)\]/) || [];
    while (match[0]) {
        let matchIndex = Number(match.index);
        const leftNum = Number(match[1]);
        const rightNum = Number(match[2]);
        const mag = (3 * leftNum) + (2 * rightNum);
        currentSnail = currentSnail.substring(0, matchIndex) + String(mag) + currentSnail.substring(matchIndex + match[0].length);
    
        match = currentSnail.match(/\[(\d+),(\d+)\]/) || [];
    }

    return Number(currentSnail);
}