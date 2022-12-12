import { getFileContents } from "../Utils";

const contents = getFileContents();
const lines = contents.trim().split(/\n/g);

const validateYear = (yr: string, min: number, max: number) => {
    const year = parseInt(yr, 10);
    if (year) {
        return year >= min && year <= max;
    } 
    return false;
}

const validateHeight = (hgt: string) => {
    if (/\d+[cm|in]/.test(hgt)) {
        const height = parseInt(hgt.replace('cm', '').replace('in', ''), 10);
        if (hgt.includes('cm')) {
            return height >= 150 && height <= 193;
        } else {
            return height >= 59 && height <= 76;
        }
    }

    return false;
}

interface stuff {
    byr: string;
    iyr: string;
    eyr: string;
    hgt: string;
    hcl: string;
    ecl: string;
    pid: string;
    cid?: string;
}

const validate = (passport: stuff) => {
    /*
    byr (Birth Year)
    iyr (Issue Year)
    eyr (Expiration Year)
    hgt (Height)
    hcl (Hair Color)
    ecl (Eye Color)
    pid (Passport ID)
    */

    const keys = Object.keys(passport);
    //console.dir(passport);

    let valid = true;

    const validFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    for (let field of validFields) {
        if (!keys.includes(field)) {
            valid = false;
            console.log(`INVALID: missing ${field}`);
        }
    }

    if (valid) {
        if (!validateYear(passport['byr'], 1920, 2002)) {
            console.log(`INVALID byr`);
            valid = false;
        }
        if (!validateYear(passport['iyr'], 2010, 2020)) {
            console.log(`INVALID iyr`);
            valid = false;
        }
        if (!validateYear(passport['eyr'], 2020, 2030)) {
            console.log(`INVALID eyr`);
            valid = false;
        }
        if (!validateHeight(passport['hgt'])) {
            console.log(`INVALID hgt`);
            valid = false;
        }
        if (!/^\#[0-9a-f]{6}$/.test(passport['hcl'])) {
            console.log(`INVALID hcl`);
            valid = false;
        }
        if (!/^(amb|blu|brn|gry|grn|hzl|oth)$/.test(passport['ecl'])) {
            console.log(`INVALID ecl`);
            valid = false;
        }
        if (!/^[0-9]{9}$/.test(passport['pid'])) {
            console.log(`INVALID pid`);
            valid = false;
        }
    }

    return valid;
}

let validCount = 0;

let jsonStr = '{';
for (let line of lines) {

    
    if (line.trim() !== '') {
        jsonStr += line.replace(/ /g, ',') + ',';
    }
    else {
        jsonStr = jsonStr.substring(0, jsonStr.length - 1) + '}';
        jsonStr = jsonStr.replace(/(\w+):([a-zA-Z0-9#]+)/g, '\"$1\":\"$2\"');
        //console.log(jsonStr);
        const jsonObj = JSON.parse(jsonStr);
        
        if (validate(jsonObj)) {
            validCount++;
        } else {
            console.dir(jsonObj);
            console.log(jsonStr);
        }

        jsonStr = '{';
    }
}

console.log(`Valid Count: ${validCount}`);