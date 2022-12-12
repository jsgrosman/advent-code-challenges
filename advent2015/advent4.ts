import * as crypto from 'crypto';
export const md5 = (contents: string) => crypto.createHash('md5').update(contents).digest("hex");


let secretKey = 1
while (true) {
    console.log(secretKey);
    const hash = md5('bgvyzdsv' + secretKey);

    if (hash.startsWith('000000')) {
        console.log(secretKey + ' => ' + hash);
        break;
    }

    secretKey++;
}