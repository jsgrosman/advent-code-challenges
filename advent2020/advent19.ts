import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

interface rule {
    ruleNum: number;
    type: 'leaf' | 'or' | 'and';
    value?: string;
    subRules1?: number[];
    subRules2?: number[];
}

interface transverseResult {
    isMatch: boolean;
    numChars: number;
};

const ruleMap = new Map<number, rule>();
const expressions: string[] = [];

let inRules = true;
for (let line of lines) {
    if (line === '') {
        inRules = false;
        continue;
    }

    if (inRules) {
        let newRule: rule | undefined = undefined;

        const [ruleNum, ruleList] = line.split(': ', 2);

        if (ruleList.includes('|')) {
            const [r1, r2] = ruleList.split(' | ', 2);
            const subRules1 = r1.split(' ').map(Number);
            const subRules2 = r2.split(' ').map(Number);

            newRule = {
                ruleNum: Number(ruleNum),
                type: 'or',
                subRules1,
                subRules2
            }
        } else if (ruleList.includes('"')) {
            newRule = {
                ruleNum: Number(ruleNum),
                type: 'leaf',
                value: ruleList.replace(/\"/g, '')
            }
        } else {
            newRule = {
                ruleNum: Number(ruleNum),
                type: 'and',
                subRules1: ruleList.split(' ').map(Number)
            }
        }

        ruleMap.set(newRule.ruleNum, newRule);
    } else {
        expressions.push(line);
    }
}


// ruleMap.set(8, {
//     ruleNum: 8,
//     type: 'or',
//     subRules1: [42],
//     subRules2: [42, 8]
// });


// ruleMap.set(11, {
//     ruleNum: 11,
//     type: 'or',
//     subRules1: [42, 31],
//     subRules2: [42, 11, 31]
// });

// console.dir(ruleMap, { depth: null});
// console.dir(expressions);
const maxLoop = 100;

const transverse = (expression: string, index: number, ruleId: number, loop: number): transverseResult => {

    if (!ruleMap.has(ruleId)) {
        console.error(`${ruleId} not found`);
        return {isMatch: false, numChars: 0};
    }

    if (loop > maxLoop) {
        console.error(`Max loop size exceeded`);
        return {isMatch: false, numChars: 0};
    }

    const rule = ruleMap.get(ruleId)!;
    // console.dir(rule);
    
    if (rule.type === 'leaf' && rule.value) {
        return {isMatch: expression.charAt(index) === rule.value, numChars: 1}
    } else if (rule.type === 'and' && rule.subRules1) {
        let success = true;
        let charactersMatched = 0;
        for (let i = 0; i < rule.subRules1.length; i++) {
            let nextLoop = loop;
            if (rule.subRules1[i] === ruleId) {
                nextLoop = loop + 1;
            }

            const result = transverse(expression, index + charactersMatched, rule.subRules1[i], nextLoop);
            if (result.isMatch) {
                charactersMatched += result.numChars;
            } else {
                success = false;
                break;
            }
        }
        // console.log(`Rule: ${success}`);
        return {isMatch: success, numChars: charactersMatched};
    } else if (rule.type === 'or' && rule.subRules1 && rule.subRules2) {
        let r1Success = true, r2Success = true;
        let r1CharsMatched = 0, r2CharsMatched = 0;

        for (let i = 0; i < rule.subRules1.length; i++) {
            let nextLoop = loop;
            if (rule.subRules1[i] === ruleId) {
                nextLoop = loop + 1;
            }

            const result = transverse(expression, index + r1CharsMatched, rule.subRules1[i], nextLoop);
            if (result.isMatch) {
                r1CharsMatched += result.numChars;
            } else {
                r1Success = false;
                r1CharsMatched = 0;
                break;
            }
        }

        for (let i = 0; i < rule.subRules2.length; i++) {
            let nextLoop = loop;
            if (rule.subRules2[i] === ruleId) {
                nextLoop = loop + 1;
            }

            const result = transverse(expression, index + r2CharsMatched, rule.subRules2[i], nextLoop);
            if (result.isMatch) {
                r2CharsMatched += result.numChars;
            } else {
                r2Success = false;
                r2CharsMatched = 0;
                break;
            }
        }
        
        // console.log(`Rule: ${r1Success || r2Success}`);
        let charsMatched = 0;
        if (r1Success && !r2Success) {
            charsMatched =  r1CharsMatched;  
        } else if (!r1Success && r2Success) {
            charsMatched =  r2CharsMatched;
        } else {
            charsMatched = Math.min(r1CharsMatched, r2CharsMatched)
        }

        return {isMatch: r1Success || r2Success, numChars: charsMatched};
    }

    return {isMatch: false, numChars: 0}; // default
}

// let count = 0;
// for (let exp of expressions) {
//     const result = transverse(exp, 0, 0, 0);

//     if (result.isMatch && result.numChars === exp.length) {
//         count++;
//     }

//     console.log(exp);
//     console.dir(result);
// }


// const result = transverse('babbbbaabbbbbabbbbbbaabaaabaaa', 0, 0, 0);
// console.dir(result);
// console.log('babbbbaabbbbbabbbbbbaabaaabaaa'.length);

//console.log(`count = ${count}`);

const buildRegularExpression = (ruleId: number): string => {

    if (!ruleMap.has(ruleId)) {
        console.error(`${ruleId} not found`);
        return '';
    }
    let result = '';

    const rule = ruleMap.get(ruleId)!;
    if (rule.type === 'leaf' && rule.value) {
        result = rule.value;
    } else if (rule.type === 'and' && rule.subRules1) {
        result = '(' + rule.subRules1.reduce( (p, r) => p + buildRegularExpression(r), '') + ')';       
    } else if (rule.type === 'or' && rule.subRules1 && rule.subRules2) {
        result = '(' + rule.subRules1.reduce( (p, r) => p + buildRegularExpression(r), '') + '|' + rule.subRules2.reduce( (p, r) => p + buildRegularExpression(r), '') + ')';
    } else {
        result = '';
    }

    // if (ruleId === 31 || ruleId === 42) {
    //     result += '+';
    // }



    return result;
};

const rule42 = buildRegularExpression(42);
const rule31 = buildRegularExpression(31);

let count = 0;
// const regex = new RegExp('^' + buildRegularExpression(0) + '$');
// console.log(regex); 

for (let exp of expressions) {

        for (let i = 1; i < 10; i++) {
            const regex = new RegExp(`^(${rule42})+(${rule42}){${i}}(${rule31}){${i}}$`);
            console.dir(regex);
            if (regex.test(exp)) {
                count++;
            } 
        }
        
}

console.log(`count = ${count}`);