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

const indexArray = Array.from(indexMap.keys());
const primeArray = Array.from(indexMap.values());

console.dir(indexArray);
console.dir(primeArray);


const modularMultiplicativeInverse = (a:number, b:number) => {

    var b0 = b;
    var x0 = 0;
    var x1 = 1;
    var q, tmp;
    if( b== 1){
      return 1;
    }
    while(a>1){
      q = Math.floor(a/b);
      tmp = a;
      a = b;
      b = tmp%b;
      tmp = x0;
      x0 = x1 - (q * x0);
      x1 = tmp;
    }
    if(x1 <0){
      x1 = x1+b0;
    }
    return x1;
  }

  const solveCRT = (a: number[], n: number[]) => {
    var p = 1;
    var i = 1;
    var prod = 1;
    var sm = 0;
    for(i=0; i< n.length; i++){
      prod = prod * n[i];
    }
    for(i=0; i< n.length; i++){
      p = prod / n[i];
      sm = sm + ( a[i] * modularMultiplicativeInverse(p, n[i]) * p);
    }
    return sm % prod;
  }

const result = solveCRT(indexArray, primeArray);
console.log(`Result: ${result}`);