

const startValue = 130254;
const endValue = 678275;

const check = (val: number) => {

    const stringVal = String(val);
    const nums = stringVal.split('').map( (v) => parseInt(v, 10));

    for (let i = 0; i < nums.length - 1; i++ ) {
        if (nums[i] > nums[i+1]) {
            return false;
        }
    }

    return (stringVal.includes('00') && !stringVal.includes('000')) ||
    (stringVal.includes('11') && !stringVal.includes('111')) ||
    (stringVal.includes('22') && !stringVal.includes('222')) ||
    (stringVal.includes('33') && !stringVal.includes('333')) ||
    (stringVal.includes('44') && !stringVal.includes('444')) ||
    (stringVal.includes('55') && !stringVal.includes('555')) ||
    (stringVal.includes('66') && !stringVal.includes('666')) ||
    (stringVal.includes('77') && !stringVal.includes('777')) ||
    (stringVal.includes('88') && !stringVal.includes('888')) ||
    (stringVal.includes('99') && !stringVal.includes('999'))
}

let total = 0;
for (let v = startValue; v <= endValue; v++) {
    if (check(v)) {
        total++;
    }
}

console.log(`total = ${total}`);
