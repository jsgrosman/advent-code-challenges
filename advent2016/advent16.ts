const DISK_SIZE = 35651584;

let disk = "10111011111001111";


let iteration = 0;
while (disk.length < DISK_SIZE) {
    iteration++;

    let a = disk;
    let b = a.split('').map( v => { 
        if (v === '1') {
            return '0';
        } else {
            return '1';
        }
    }).reverse().join('');

    disk = a + '0' + b;
}
disk = disk.substring(0, DISK_SIZE);
console.log(disk);

const doChecksum = (v: string) => {
    let result = '';

    for (let index = 0; index < v.length; index += 2) {
        if (v.charAt(index) === v.charAt(index + 1)) {
            result += '1';
        } else {
            result += '0';
        }
    }
    
    return result;
}

let checksum = doChecksum(disk);
while (checksum.length % 2 === 0) {
    console.log(checksum);
    checksum = doChecksum(checksum);
}

console.log(`checksum: ${checksum}`);