import { setOriginalNode } from "typescript";
import { getFileContents } from "../Utils";

// const contents = getFileContents();
// const lines = contents.trim().split(/\n/g);


interface snail {
    left?: number|snail;
    right?: number|snail;
    leftPos?: number;
    rightPos?: number;
}

interface parseResult {
    snail: snail,
    numChars: number;
}

interface explodeStatus {
    explodedSnail?: snail;
    updatedNodeTo0: boolean;
    updatedNearestLeftNode: boolean;
    updatedNearestRightNode: boolean;
}

interface splitStatus {
   hasSplit: boolean;
}


const parse = (expression: string, index: number): parseResult|undefined => {


    const newSnail: snail = {};
    let numChars = 0;
    for (let i = index + 1; i < expression.length; i++) {
        numChars++;
        let char = expression.charAt(i);
        if (char === ']') {
            return {
                snail: newSnail,
                numChars
            };
        } else if (char === '[') {
            const result = parse(expression, i);
            if (result != undefined) {
                if (!newSnail.left) {
                    newSnail.left = result.snail;
                } else {
                    newSnail.right = result.snail;
                }
                numChars += result.numChars;
                i += result.numChars;
            }
        } else if (/\d/.test(char)) {
            if (/\d/.test(expression.charAt(i + 1))) {
                char += expression.charAt(i + 1);
                i++;
            }
            if (newSnail.left === undefined) {
                newSnail.left = Number(char);
                newSnail.leftPos = i;
            } else {
                newSnail.right = Number(char);
                newSnail.rightPos = i;
            }
        }
    }

}




const explode = (node: snail, parseLevel: number, status: explodeStatus) => {
    if (parseLevel >= 4 
        && typeof(node.left) === 'number' 
        && typeof(node.right) === 'number'
        && !status.explodedSnail) {
        status.explodedSnail = node;
        return;
    }
    

    if (node.left !== undefined && typeof(node.left) != 'number') {
        explode(node.left, parseLevel + 1, status);
        if (status.explodedSnail && !status.updatedNodeTo0) {
            node.left = 0;
            node.leftPos = status.explodedSnail.leftPos;
            status.updatedNodeTo0 = true;
        }
    }  

    if (typeof(node.left) === 'number') {
        if (status.explodedSnail && typeof(status.explodedSnail.left) === 'number' && !status.updatedNearestLeftNode) {
            if (status.explodedSnail.leftPos! > node.leftPos!) {
                node.left = status.explodedSnail.left + node.left;
                status.updatedNearestLeftNode = true;
            }
        }
        if (status.explodedSnail && typeof(status.explodedSnail.right) === 'number' && !status.updatedNearestRightNode) {
            if (status.explodedSnail.rightPos! < node.leftPos!) {
                node.left = status.explodedSnail.right + node.left;
                status.updatedNearestRightNode = true;
            }
        }
    }

    if (node.right !== undefined && typeof(node.right) != 'number') {
        explode(node.right, parseLevel + 1, status);
       if (status.explodedSnail && !status.updatedNodeTo0) {
            node.right = 0;
            node.rightPos = status.explodedSnail.rightPos;
            status.updatedNodeTo0 = true;
        }
    }  

    if (typeof(node.right) === 'number') {
        if (status.explodedSnail && typeof(status.explodedSnail.left) === 'number' && !status.updatedNearestLeftNode) {
            if (status.explodedSnail.leftPos! > node.rightPos!) {
                node.right = status.explodedSnail.left + node.right;
                status.updatedNearestLeftNode = true;
            }
        }
        if (status.explodedSnail && typeof(status.explodedSnail.right) === 'number' && !status.updatedNearestRightNode) {
            if (status.explodedSnail.rightPos! < node.rightPos!) {
                node.right = status.explodedSnail.right + node.right;
                status.updatedNearestRightNode = true;
            }
        }
    }
}

const split = (node: snail, status: splitStatus) => {
    
    if (status.hasSplit) {
        return;
    }
    
    if (typeof(node.left) === 'number' && node.left > 9)  {
        node.left = {
            left: Math.floor(node.left / 2),
            leftPos: node.leftPos,
            right: Math.ceil(node.left / 2),
            rightPos: node.leftPos! + 1
        }
        status.hasSplit = true;
        return;
    }
    
    if (typeof(node.right) === 'number' && node.right > 9)  {
        node.right = {
            left: Math.floor(node.right / 2),
            leftPos: node.rightPos,
            right: Math.ceil(node.right / 2),
            rightPos: node.rightPos! + 1
        }
        status.hasSplit = true;
        return;
    }

    if (node.left !== undefined && typeof(node.left) != 'number') {
        split(node.left, status);
    }  

    if (node.right !== undefined && typeof(node.right) != 'number') {
        split(node.right, status);
   
    }  
}

const printParseTree = (node:  snail) => {

    let s = '';
    if (node.left !== undefined && typeof(node.left) != 'number') {
        s += '[' + printParseTree(node.left);
    } else if (node.left !== undefined && typeof(node.left) === 'number') {
        s += `[${node.left} (${node.leftPos})}`;
    }

    s += ',';

    if (node.right !== undefined && typeof(node.right) != 'number') {
        s += printParseTree(node.right) + ']';
    } else if (node.right !== undefined && typeof(node.right) === 'number') {
        s += `${node.right} (${node.rightPos})]`;
    }

    return s;
}

// const parseTree = parse('[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]', 0)!.snail;



// console.dir(parseTree, {depth: null});
// console.log(printParseTree(parseTree));

// let didWork = true;
// while (didWork) {
//     didWork = false;

//     const explodeStatus = {
//         updatedNodeTo0: false,
//         updatedNearestLeftNode: false,
//         updatedNearestRightNode: false
//     };
//     explode(parseTree, 0, explodeStatus);

//     didWork = explodeStatus.updatedNodeTo0;
//     if (!didWork) {

//         const splitStatus = {
//             hasSplit: false
//         };

//         didWork = splitStatus.hasSplit;
//     }

//     console.log(printParseTree(parseTree));

// }


const parseTree = parse('[[[[0,7],4],[7,[[8,4],9]]],[1,1]]', 0)!.snail
console.log(printParseTree(parseTree));
const explodeStatus = {
            updatedNodeTo0: false,
            updatedNearestLeftNode: false,
            updatedNearestRightNode: false
        };
        explode(parseTree, 0, explodeStatus);
        console.log(printParseTree(parseTree));      