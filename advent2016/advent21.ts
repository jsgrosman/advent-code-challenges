import { getFileContents } from "../Utils";

const swapLettersByPosition = (p1: number, p2: number, password: string) => {
    const l1 = password.charAt(p1);
    const l2 = password.charAt(p2);

    const passwordArray = password.split('');
    passwordArray[p1] = l2;
    passwordArray[p2] = l1;
    
    return passwordArray.join('');
};

const rotateStringLeft = (pos: number, password:string) => {
    
    for (let i = 0; i < pos; i++) {
        password = password.substring(1) + password.charAt(0);
    }
    return password;
}

const rotateStringRight = (pos: number, password:string) => {
    
    for (let i = 0; i < pos; i++) {
        password = password.charAt(password.length - 1) + password.substring(0, password.length - 1);
    }
    return password;
}

const reverseBetween = (pos1: number, pos2: number, password: string) => {
    let stringToBeReversed = password.substring(pos1, pos2 + 1);
    stringToBeReversed = stringToBeReversed.split('').reverse().join('');
    const passwordArray = password.split('');
    passwordArray.splice(pos1, stringToBeReversed.length, stringToBeReversed);
    return passwordArray.join('');
};

const moveLetterToPosition = (pos1: number, pos2: number, password:string) => {
    const passwordArray = password.split('');
    const letterAt = passwordArray.splice(pos1, 1)[0];
    passwordArray.splice(pos2, 0, letterAt);

    return passwordArray.join('');
}


const part1 = () => {
    let password = 'abcdefgh';
    console.log(password);

    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    let steps = 0;
    let result: RegExpMatchArray | null = null;
    for (const instruction of lines) {
        steps++;

        result = instruction.match(/swap position (\d+) with position (\d+)/);
        if (result) {
                const pos1 = Number(result[1]);
                const pos2 = Number(result[2]);
                password = swapLettersByPosition(pos1, pos2, password);
                console.log(`${steps}: swapLettersByPosition: ${instruction} => ${password}`);
                continue;
        }

        result = instruction.match(/swap letter (\w) with letter (\w)/);
        if (result) {
                const char1 = result[1];
                const char2 = result[2];
                password = swapLettersByPosition(password.indexOf(char1), password.indexOf(char2), password);
                console.log(`${steps}: swapLettersByLetter: ${instruction} => ${password}`);
                continue;
        }

        result = instruction.match(/rotate left (\d+) step/);
        if (result) {
            const pos = Number(result[1]);
            password = rotateStringLeft(pos, password);
            console.log(`${steps}: rotateStringLeft: ${instruction} => ${password}`);
            continue;
        }

        result = instruction.match(/rotate right (\d+) step/);
        if (result) {
            const pos = Number(result[1]);
            password = rotateStringRight(pos, password);
            console.log(`${steps}: rotateStringRight: ${instruction} => ${password}`);
            continue;
        }

        result = instruction.match(/rotate based on position of letter (\w)/);
        if (result) {
            const char = result[1];
            let rotationAmount = 1 + password.indexOf(char);
            if (password.indexOf(char) >= 4) {
                rotationAmount++;
            } 

            password = rotateStringRight(rotationAmount, password);
            console.log(`${steps}: rotateStringBasedOnX: ${rotationAmount} ${instruction} => ${password}`);
            continue;
        }

        result = instruction.match(/reverse positions (\d+) through (\d+)/);
        if (result) {
            const pos1 = Number(result[1]);
            const pos2 = Number(result[2]);
            password = reverseBetween(pos1, pos2, password);
            console.log(`${steps}: reverseBetween: ${instruction} => ${password}`);
            continue;
        }

        result = instruction.match(/move position (\d+) to position (\d+)/);
        if (result) {
            const pos1 = Number(result[1]);
            const pos2 = Number(result[2]);
            password =  moveLetterToPosition(pos1, pos2, password);
            console.log(`${steps}: moveLetterToPosition: ${instruction} => ${password}`);
            continue;
        }

        console.log(`${steps}: missing: ${instruction}`);
    }

    console.log(password);
};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);


};

part1();
// part2();