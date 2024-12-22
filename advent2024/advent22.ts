import { getFileContents } from "../Utils";


/*
Calculate the result of multiplying the secret number by 64. Then, mix this result into the secret number. Finally, prune the secret number.
Calculate the result of dividing the secret number by 32. Round the result down to the nearest integer. Then, mix this result into the secret number. Finally, prune the secret number.
Calculate the result of multiplying the secret number by 2048. Then, mix this result into the secret number. Finally, prune the secret number.
Each step of the above process involves mixing and pruning:

To mix a value into the secret number, calculate the bitwise XOR of the given value and the secret number. Then, the secret number becomes the result of that operation. (If the secret number is 42 and you were to mix 15 into the secret number, the secret number would become 37.)
To prune the secret number, calculate the value of the secret number modulo 16777216. Then, the secret number becomes the result of that operation. (If the secret number is 100000000 and you were to prune the secret number, the secret number would become 16113920.)


*/

const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const NUM_ITERATIONS = 2000;

    const mix = (givenNum: bigint, secretNum: bigint) => givenNum ^ secretNum;
    const prune = (secretNum: bigint) => secretNum % 16777216n;
    const nextSecret = (secretNum: bigint) => {
        const mult64 = prune(mix(secretNum * 64n, secretNum));
        const div32 = prune(mix(mult64/32n, mult64));
        const mult2048 = prune(mix(div32 * 2048n, div32));
        return mult2048;
    }


    let total = 0n;
    for (let secret of lines) {
        let secretNum = BigInt(secret);
        for (let i = 0; i < NUM_ITERATIONS; i++) {
            secretNum = nextSecret(secretNum);
        }
        console.log(`${secret}: ${secretNum}`);
        total += secretNum;

    }
    console.log(`total = ${total}`);
};

const sortHashmap = (h: Map<any, any>) => {
    return new Map([...h.entries()].sort((a, b) => b[1] - a[1]));
}

const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const NUM_ITERATIONS = 2000;

    const mix = (givenNum: bigint, secretNum: bigint) => givenNum ^ secretNum;
    const prune = (secretNum: bigint) => secretNum % 16777216n;
    const nextSecret = (secretNum: bigint) => {
        const mult64 = prune(mix(secretNum * 64n, secretNum));
        const div32 = prune(mix(mult64/32n, mult64));
        const mult2048 = prune(mix(div32 * 2048n, div32));
        return mult2048;
    };

    const allPrices: number[][] = [];
    const allPriceChanges: number[][] = [];
    const priceMap: Map<string, number> = new Map<string, number>();

    let total = 0n;
    for (let secret of lines) {
        const pricesForMonkey: number[] = [+secret.charAt(secret.length - 1)];
        const priceChangesForMonkey: number[] = [];
        const priceMapForMonkey: Map<string, number> = new Map<string, number>(); 
        
        let secretNum = BigInt(secret);
        for (let i = 0; i < NUM_ITERATIONS; i++) {
            secretNum = nextSecret(secretNum);
            pricesForMonkey.push(Number(secretNum % 10n));
            priceChangesForMonkey.push(pricesForMonkey[pricesForMonkey.length - 1] - pricesForMonkey[pricesForMonkey.length - 2]);
        }
        allPrices.push(pricesForMonkey);
        allPriceChanges.push(priceChangesForMonkey);
        // console.log(`${secret}: ${secretNum} ${priceChangesForMonkey.length}`);
        total += secretNum;

        for (let i = 4; i <= priceChangesForMonkey.length; i++) {
            const priceSeq = priceChangesForMonkey.slice(i - 4, i).join(',');
            const finalPrice = pricesForMonkey[i];

            if (!priceMapForMonkey.has(priceSeq)) {
                priceMapForMonkey.set(priceSeq, finalPrice);
            } 
        }
        for (const [seq, p] of priceMapForMonkey.entries()) {
            if (!priceMap.has(seq)) {
                priceMap.set(seq, p);
            } else {
                priceMap.set(seq, p + priceMap.get(seq)!);
            }
        }
    }
   
    const sortedPrices = sortHashmap(priceMap);
    console.log(`part1: ${total}`);
    console.log(`part2: ${Array.from(sortedPrices.entries())[0]}`);
};

// part1();
part2();