import { Md5 } from "ts-md5";

const SEED = 'ihaygndm';

let keyCount = 0;
let index = -1;

const keyHashMap: Map<string, number> = new Map<string, number>();
const mapOfHashes: Map<number, string> = new Map<number, string>();

const doHash = (index: number) => {
    if (mapOfHashes.has(index)) {
        return mapOfHashes.get(index)!;
    } else {
        let hash = Md5.hashAsciiStr(SEED + index);
        for (let hashCount = 0; hashCount < 2016; hashCount++) {
            hash = Md5.hashAsciiStr(hash);
        }

        mapOfHashes.set(index, hash);
        return hash;
    }
}

KEY_LOOP:
while (keyCount < 64) {
    index++;

    const hash = doHash(index);
   // console.log(`${index}: ${hash}`);

    const result = hash.match(/(.)\1{2}/);
    if (result != null) {
        // console.log(`repeated char = ${result![1]}`);
        const repeatedChar = result![1];
        const keySearchString = repeatedChar.repeat(5);
        // console.log(keySearchString);

        if (keyHashMap.has(repeatedChar)) {
            const repeatedIndex = keyHashMap.get(repeatedChar)!;
            if (repeatedIndex > index) {
                console.log(`Saved key found at index ${repeatedIndex} `);
                keyCount++;
                continue KEY_LOOP;
            }
        }

        for (let keyIndex = index + 1; keyIndex < index + 1000 + 1; keyIndex++) {
            const keyHash =  doHash(keyIndex);
            // console.log(`checking ${keyIndex}: ${keyHash}`);
            if (keyHash.includes(keySearchString)) {
                console.log(`Key found at index ${keyIndex} `);
                keyHashMap.set(repeatedChar, keyIndex);
                keyCount++;
                continue KEY_LOOP;
            }    
        }
    }

}

console.log(`Key Count = ${keyCount} at index ${index}`);