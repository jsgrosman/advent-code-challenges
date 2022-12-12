import { getFileContents } from "../Utils";

const contents = getFileContents();

const fullPacket = contents.split('').map( (char) => {
    return parseInt(char, 16).toString(2).padStart(4, '0');
}).join('');

interface returnValue {
    remainingPacket: string,
    literalValue: number
}

let totalVersionNumber = 0;

const getStandardHeader = (packet: string) => {
    const versionNumber = parseInt(packet.substr(0, 3), 2);
    // console.log(`packet: ${packet}, version: ${packet.substr(0, 3)} ==> ${versionNumber}`);
    
    if (versionNumber) {
        totalVersionNumber += versionNumber;
    }

    const typeId = parseInt(packet.substr(3, 3), 2);
    return {
        versionNumber,
        typeId
    }
}


// type 0
const getLengthOfSubpacket = (bin: string) => {
    return parseInt(bin.substr(0, 15), 2);
}

// type 1
const getNumberOfSubpackets = (bin: string) => {
    return parseInt(bin.substr(0, 11), 2);
}

const parseOperatorPacket = (packet: string, typeId: number) => {
    console.log(`parseOperatorPacket type: ${typeId}`);

    let remainingPacket = packet;
    const literals: number[] = [];
    const lengthTypeId = Number(packet.charAt(0));

    if (lengthTypeId === 0) {
        const length = getLengthOfSubpacket(packet.substr(1));
        
        let lengthOfProcessedPackets = 0;
        remainingPacket = packet.substr(16);

        while (lengthOfProcessedPackets < length) {
            const result = parsePacket(remainingPacket);
            lengthOfProcessedPackets += remainingPacket.length - result.remainingPacket.length;
            remainingPacket = result.remainingPacket;
            literals.push(result.literalValue);
            // console.dir(result);
        }
    } else  {
        const numSubpackets = getNumberOfSubpackets(packet.substr(1));
        remainingPacket = packet.substr(12);
        for (let i = 0; i < numSubpackets; i++) {
            const result = parsePacket(remainingPacket);
            remainingPacket = result.remainingPacket;
            literals.push(result.literalValue);
        }
    }
    console.dir(literals);
    
    let returnLiteralValue = 0;
    switch (typeId) {
        case 0: // sum
            returnLiteralValue = literals.reduce( (p, v) => p + v, 0);
            break;
        case 1: // product    
            returnLiteralValue = literals.reduce( (p, v) => p * v, 1);
            break;
        case 2: // min    
            returnLiteralValue = literals.reduce( (p, v) => p = Math.min(p, v), Number.POSITIVE_INFINITY);
            break;   
        case 3: // max
            returnLiteralValue = literals.reduce( (p, v) => p = Math.max(p, v), 0);
            break; 
        case 5: // greater
            returnLiteralValue = literals[0] > literals[1] ? 1 : 0;
            break; 
        case 6: // less
            returnLiteralValue = literals[0] < literals[1] ? 1 : 0;
            break; 
        case 7: // equal
            returnLiteralValue = literals[0] == literals[1] ? 1 : 0;
            break; 
    }

    return {
        remainingPacket,
        literalValue: returnLiteralValue
    };
    
}

const parseLiteralPacket = (bin: string) => {
    let fullValue = '';

    let packetLength = 0;    
    for (let literalIndex = 0;; literalIndex += 5) {
        packetLength += 5;
        const groupStart = bin.charAt(literalIndex);
        const value = bin.substr(literalIndex + 1, 4);
        fullValue += value;

        if (groupStart === '0') {
            break;
        }
    }
    
    // console.log(`parseLiteralPacket: ${parseInt(fullValue, 2)}`);
    return {
        remainingPacket: bin.substr(packetLength), 
        literalValue: parseInt(fullValue, 2)
    };

}

const parsePacket = (packet: string) => {
    
    const standardHeader = getStandardHeader(packet);
    
    if (standardHeader.typeId !== 4) {
        return parseOperatorPacket(packet.substr(6), standardHeader.typeId);
    } else {
        return parseLiteralPacket(packet.substr(6));
    }
}

const result = parsePacket(fullPacket);
console.log(`literal value = ${result.literalValue}`);

