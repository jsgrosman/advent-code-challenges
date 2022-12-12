const doorTestID = 'abc';
const doorInputID = 'ffykfhsq';

import * as crypto from 'crypto';

export const md5 = (contents: string) => crypto.createHash('md5').update(contents).digest("hex");

let secretKey = 1;
let passwordList: string[] = ['-1','-1','-1','-1','-1','-1','-1','-1'];
let password = '';
while (password.length < 8) {
    //console.dir(passwordList);
    //console.log(secretKey);
    const hash = md5(doorInputID + secretKey);

    if (hash.startsWith('00000')) {
        //console.log(secretKey + ' => ' + hash);
        const ind = parseInt(hash.charAt(5),10);
        const value = hash.charAt(6);
        if (!isNaN(ind)){
            //console.log(`ind: ${ind}, value: ${value}`);
            if (ind < 8){
                if (passwordList[ind] == '-1'){
                    passwordList[ind] = value;
                }
            }
        }
        password = '';
        for (let char of passwordList){
            if (char != '-1'){
                password += char;
                //console.log(password);
            }
        }
    }
    
    secretKey++;
}

console.log(password);