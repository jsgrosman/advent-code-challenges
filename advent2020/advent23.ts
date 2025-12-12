import { getFileContents } from "../Utils";

type node = {
    value: number;
    next?: node;
}

const part1 = () => {
   
    const input = '137826495';
    let numMoves = 100;

    const cups = input.split('').map(Number);
    const maxCup = Math.max(...cups);

    let currentCup: node = {
        value: cups[0],
    };

    let prevCup = currentCup;
    for (let i = 1; i < cups.length; i++) {
        const cup: node = {
            value: cups[i],
        };
        prevCup.next = cup;
        prevCup = cup;
    }
    prevCup.next = currentCup;

    const printCups = (startCup: node) => {
        let result = '(' + startCup.value + ')';

        let currentCup = startCup.next!;
        while (currentCup != startCup) {
            result += ' ' + currentCup.value;
            currentCup = currentCup.next!;
        }
        console.log(result);
    };

    const findNode = (startCup:node, needle: number) => {
        let result: node|null = null;

        while (result === null) {
            let currentCup = startCup.next!;
            while (currentCup != startCup) {
                if (currentCup.value === needle) {
                    result = currentCup;
                    break;
                }
                currentCup = currentCup.next!;
            } 
            needle--;
            if (needle === 0) {
                needle = maxCup;
            }
        }
        return result;

    }

    printCups(currentCup);

    let currentMove = 1;
    while (currentMove <= numMoves) {

        const node1 = currentCup.next!;
        const node2 = node1.next!;
        const node3 = node2.next!;
        currentCup.next = node3.next;

        let destinationValue = currentCup.value - 1;
        if (destinationValue === 0) {
            destinationValue = maxCup;
        }
        const destinationCup = findNode(currentCup, destinationValue);
        const savedNextCup = destinationCup.next!;
        destinationCup.next = node1;
        node3.next = savedNextCup;

        printCups(currentCup);
        currentCup = currentCup.next!;

        currentMove++;
    }
    let finalCup: node;
    if (currentCup.value === 1) {
        finalCup = currentCup.next!;
    } else {
        finalCup = findNode(currentCup, 1).next!;
    }
    printCups(finalCup);

};


const part2 = () => {
    const nodeMap: Map<number,node> = new Map<number,node>();

    let numMoves = 10000000;

    const maxCup = 1000000;
    const input = '137826495';
    const cups = input.split('').map(Number);

    let currentCup: node = {
        value: cups[0],
    };
    nodeMap.set(cups[0], currentCup);

    let prevCup = currentCup;
    for (let i = 1; i < cups.length; i++) {
        const cup: node = {
            value: cups[i],
        };
        prevCup.next = cup;
        prevCup = cup;
        nodeMap.set(cups[i], cup);
    }
    for (let i = Math.max(...cups) + 1; i <= maxCup; i++) {
        const cup: node = {
            value: i,
        };
        prevCup.next = cup;
        prevCup = cup;
        nodeMap.set(i, cup);
    }
    prevCup.next = currentCup;


    let currentMove = 1;
    while (currentMove <= numMoves) {

        const node1 = currentCup.next!;
        const node2 = node1.next!;
        const node3 = node2.next!;
        currentCup.next = node3.next;

        let destinationValue = currentCup.value - 1 !== 0 ? currentCup.value - 1 : maxCup;
        while (destinationValue === node1.value || 
                destinationValue === node2.value || 
                destinationValue === node3.value) {
            destinationValue = destinationValue - 1 !== 0 ? destinationValue - 1 : maxCup;
        }
        let destinationCup = nodeMap.get(destinationValue)!;

        const savedNextCup = destinationCup.next!;
        destinationCup.next = node1;
        node3.next = savedNextCup;

        currentCup = currentCup.next!;

        currentMove++;
    }



    let finalCup = nodeMap.get(1)!;

    const finalValue1 = finalCup.next!.value;
    const finalValue2 = finalCup.next!.next!.value;
    console.log(`${finalValue1} * ${finalValue2} = ${finalValue1 * finalValue2}`);

};

// part1();
part2();