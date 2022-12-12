


const startingNumber = 1321131112;

let currentSequence = String(startingNumber);
console.log(currentSequence);

for (let i = 0; i < 50; i++) {

    const arrayOfDigits = currentSequence.split('');

    let newSequence = '';
    let currentDigit = arrayOfDigits.shift()!;
    let digitCount = 1;

    for (let digit of arrayOfDigits) {
        if (digit === currentDigit) {
            digitCount++; 
        } else {
            newSequence += digitCount + currentDigit;
            digitCount = 1;
            currentDigit = digit;
        }
    }
    newSequence += digitCount + currentDigit;
    console.log(newSequence);
    
    currentSequence = newSequence;
}

console.log("length: " + currentSequence.length);

