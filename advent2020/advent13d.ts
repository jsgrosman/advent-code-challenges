import { getFileContents, getNeigborValues } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

const startTime = Number(lines[0]);
const busIds = lines[1].split(',');

// console.dir(busIds);

const indexMap = new Map<number, number>()
for (let busIndex = 0; busIndex < busIds.length; busIndex++) {
    if (busIds[busIndex] !== 'x') {
        indexMap.set(busIndex, Number(busIds[busIndex]));
    }
}
console.dir(indexMap);

const indexArray = Array.from(indexMap.keys()).reverse().map( (v) => busIds.length - v - 1).map(BigInt);
const primeArray = Array.from(indexMap.values()).reverse().map(BigInt);

console.dir(indexArray);
console.dir(primeArray);

const modularMultiplicativeInverse = (a: bigint, modulus: bigint) => {
    // Calculate current value of a mod modulus
    const b = BigInt(a % modulus);
      
      // We brute force the search for the smaller hipothesis, as we know that the number must exist between the current given modulus and 1
      for (let hipothesis = BigInt(1); hipothesis <= modulus; hipothesis++) {
          if ((b * hipothesis) % modulus == BigInt(1)) return hipothesis;
      }
        // If we do not find it, we return 1
      return BigInt(1);
  }

  const solveCRT = (remainders: bigint[], modules: bigint[]) => {
    // Multiply all the modulus
    const prod : bigint = modules.reduce((acc: bigint, val) => acc * val, BigInt(1));
    
    return modules.reduce((sum, mod, index) => {
        // Find the modular multiplicative inverse and calculate the sum
    // SUM( remainder * productOfAllModulus/modulus * MMI ) (mod productOfAllModulus) 
        const p = prod / mod;
        return sum + (remainders[index] * modularMultiplicativeInverse(p, mod) * p);
    }, BigInt(0)) % prod;
}


const result = solveCRT(indexArray, primeArray) - BigInt(busIds.length - 1);
console.log(`Result: ${result}`);