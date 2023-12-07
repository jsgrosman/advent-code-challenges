
export function moveLetterToPosition(pos1: number, pos2: number, password: string) {
    let char1 = password.charAt(pos1);

    password = password.substring(0, pos1) + password.substring(pos1 + 1);
    password = password.substring(0, pos2) + char1 + password.substring(pos2);
    return password;
}

export function swapLettersByLetter(char1: string, char2: string, password: string) {
    const pos1 = password.indexOf(char1);
    const pos2 = password.indexOf(char2);
    password = password.substring(0, pos2) + char1 + password.substring(pos2 + 1);
    password = password.substring(0, pos1) + char2 + password.substring(pos1 + 1);

    return password;
}

export function swapLettersByPosition(pos1: number, pos2: number, password: string) {
    let char1 = password.charAt(pos1);
    let char2 = password.charAt(pos2);
    password = password.substring(0, pos2) + char1 + password.substring(pos2 + 1);
    password = password.substring(0, pos1) + char2 + password.substring(pos1 + 1);

    return password;
}

export function rotateStringLeft(n: number, str: string) {
   return str.slice(n % str.length) + str.slice(0, n % str.length);
}

export function rotateStringRight(n: number, str: string) {
    return str.slice(-n % str.length) + str.slice(0, -n % str.length);
 }

 export function reverseBetween(pos1: number, pos2: number, password: string) {
    let stringToBeReversed = password.substring(pos1, pos2 + 1);
    stringToBeReversed = stringToBeReversed.split('').reverse().join('');

    password = password.substring(0, pos1) + stringToBeReversed + password.substring(pos2 + 1);
    return password;
}

export function rotateStringBasedOnX(char: string, password: string): string {
    const indexOfX = password.indexOf(char);
  
    if (indexOfX === -1) {
      // 'X' not found, no rotation needed
      return password;
    }
    const rotationAmount = 1 + indexOfX + (indexOfX >= 4 ? 1 : 0);
  
    return rotateStringRight(rotationAmount, password);
}