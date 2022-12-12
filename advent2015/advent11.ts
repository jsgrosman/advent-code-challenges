
const incrementChar = ( value: string ) => {
    let ascii = value.charCodeAt(0);
    ascii++;
    
    if (ascii === 123) {
        ascii = 97;
    }

    return String.fromCharCode(ascii);
}

const incrementString = ( value: string ) => {

    const charArray = value.split('');

    for (let i = charArray.length - 1; i >= 0; i--) {
        const newChar = incrementChar(charArray[i]);
        charArray[i] = newChar;
        if (newChar !== 'a') {
            break;
        }
    }

    return charArray.join('');
}

const checkForStraight = ( value: string ) => {
    for (let i=97,a='';i<123;i++) {
        const letter1 = String.fromCharCode(i);
        const letter2 = String.fromCharCode(i + 1);
        const letter3 = String.fromCharCode(i + 2);
        if (value.includes(letter1 + letter2 + letter3)) {
            return true;
        }
    } 

    return false;
}

const checkForBadChars = ( value: string ) => {
    return value.includes('i') || value.includes('o') || value.includes('l');
}

const hasDoubleDouble = (contents: string) => {

    let doubleCount = 0;
    for (let i=97,a='';i<123;) {
        const letter = String.fromCharCode(i++)
        if (contents.includes(letter + letter)) {
            doubleCount++;
        }
    } 

    return doubleCount > 1;
};

const isGoodPassword = (contents: string) => {
    return checkForStraight(contents) 
        && !checkForBadChars(contents)
        && hasDoubleDouble(contents);
}


let startingString = 'cqjxxyzz';
console.log(startingString);

while (true) {
    startingString = incrementString(startingString);

    if (isGoodPassword(startingString)) {
        console.log(startingString);
        break;
    } 
}



