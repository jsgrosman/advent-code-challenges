import { getFileContents } from "../Utils";

const contents = getFileContents();
const voltages = contents.trim().split(/\n/g).map( (v) => Number(v));


voltages.sort( (a, b) => a - b);
voltages.push(voltages[voltages.length - 1] + 3);
voltages.unshift(0);

// console.dir(voltages);

// let differences1Jolt = 0;
// let differences3Jolt = 0;

// for (let index = 0; index < voltages.length - 1; index++) {
//     const currentVoltage = voltages[index];
//     const nextVoltage = voltages[index + 1];
//     const diff = nextVoltage - currentVoltage;

//     if (diff === 1) {
//         differences1Jolt++;
//     } else if (diff === 3) {
//         differences3Jolt++
//     }
// }

// console.log(`1J: ${differences1Jolt}, 3J: ${differences3Jolt}`);
// console.log(`result: ${differences1Jolt * differences3Jolt}`);

const visit = (arr: number[], index: number, permutations: number) => {
    if (index === arr.length - 1) {
        // adapters.push(adapterString);
        return 1;
    }

    let resultPermutations = permutations;
    for (let vIndex = index + 1; vIndex < index + 4 && vIndex < arr.length; vIndex++) {
        if (arr[vIndex] - arr[index] <= 3) {
            // visit(vIndex, adapterString + `, ${voltages[vIndex]}`);
            resultPermutations += visit(arr, vIndex, permutations);
        }
    }

    return resultPermutations;
}

// const adaptercount = visit(voltages, 0, 0);

// console.dir(adapterCount);

let adaptercount = 1;
for (let i = 0; i < voltages.length - 1;) {

    let vIndex  = i;
    for (;vIndex < voltages.length - 1; vIndex++) {
        if (voltages[vIndex + 1] - voltages[vIndex] === 3) {
            const newVoltages = voltages.slice(i, vIndex + 1);
            // console.dir(newVoltages);
            // console.log(visit(newVoltages, 0, 0));
            adaptercount *= visit(newVoltages, 0, 0);
            i = vIndex + 1;
            break;
        }
    }
    if (vIndex === voltages.length - 1) {
        const newVoltages = voltages.slice(i, voltages.length);
        // console.dir(newVoltages);
        // console.log(visit(newVoltages, 0, 0));
        adaptercount *= visit(newVoltages, 0, 0);
        break;
    }



}

console.log(adaptercount);
