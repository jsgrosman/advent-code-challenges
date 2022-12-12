import * as fs from "fs";
import * as yargs from "yargs";

export const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export interface point{
    x: number;
    y: number;
};

export interface line{
    start: point;
    end: point;
    dist: number;
}

export const pointCompare = (p1: point, p2: point) => {
    return p1.x === p2.x && p1.y === p2.y;
}

export const getNeigborPoints = (row: number, col: number, arr: any[][], includeDiags: boolean) => {

    const result: point[] = [];

    if (row > 0) {
        result.push({
            y: row - 1, 
            x: col
        }); // top
    }
    if (row < arr.length - 1) { 
        result.push({
            y: row + 1, 
            x: col
        }); // bottom
    }
    if (col > 0) {
        result.push({
            y: row, 
            x: col - 1
        }); // left
    }
    if (col < arr[0].length - 1) {
        result.push({
            y: row, 
            x: col + 1
        }); // right
    }

    if (includeDiags) {

        if (row > 0 && col > 0) {
            result.push({
                y: row - 1, 
                x: col - 1
            }); // top left
        }

        if (row > 0 && col < arr[0].length - 1) {
            result.push({
                y: row - 1, 
                x: col + 1
            }); // top right
        }

        if (row < arr.length - 1 && col > 0) {
            result.push({
                y: row + 1, 
                x: col - 1
            }); // bottom left
        }

        if (row < arr.length - 1 && col < arr[0].length - 1) {
            result.push({
                y: row + 1, 
                x: col + 1
            }); // bottom right
        }

    }

    return result;
}


export const getNeigborValues = (row: number, col: number, arr: any[][], includeDiags: boolean) => {

    const result: any[] = [];

    if (row > 0) {
        result.push(arr[row - 1][col]); // top
    }
    if (row < arr.length - 1) {
        result.push(arr[row + 1][col]); // bottom
    }
    if (col > 0) {
        result.push(arr[row][col - 1]); // left
    }
    if (col < arr[0].length - 1) {
        result.push(arr[row][col + 1]); // right
    }

    if (includeDiags) {

        if (row > 0 && col > 0) {
            result.push(arr[row - 1][col - 1]); // top left
        }

        if (row > 0 && col < arr[0].length - 1) {
            result.push(arr[row - 1][col + 1]); // top right
        }

        if (row < arr.length - 1 && col > 0) {
            result.push(arr[row + 1][col - 1]); // bottom left
        }

        if (row < arr.length - 1 && col < arr[0].length - 1) {
            result.push(arr[row + 1][col + 1]); // bottom right
        }

    }

    return result;
}

export const getLeftNeighborValues = ( p: point, arr: any[][] ) => {
    const row = arr[p.y];
    return row.slice(0, p.x).reverse();
}

export const getRightNeighborValues  = ( p: point, arr: any[][] ) => {
    const row = arr[p.y];
    return row.slice(p.x + 1);
}

export const getUpNeighborValues = ( p: point, arr: any[][] ) => {

    const ret: number[] = [];
    for (let i = 0; i < p.y; i++) {
        ret.push(arr[i][p.x]);
    }
    return ret.reverse();
}

export const getDownNeighborValues = ( p: point, arr: any[][] ) => {

    const ret: number[] = [];
    for (let i = p.y + 1; i < arr.length; i++) {
        ret.push(arr[i][p.x]);
    }
    return ret;
}


export const getFileContents = () => {
    const args = yargs.options({
        'file': { type: 'string', demandOption: true, alias: 'f' },
    }).argv;
    
    const fullFilePath = `${process.cwd()}/${args['file']}`;

    if (!fs.existsSync(fullFilePath)) {
        console.error("No such file: " + fullFilePath);
    }

    return fs.readFileSync(fullFilePath, 'utf8');
}

export const sortHashmap = (h: Map<string, any>) => {
    return new Map([...h.entries()].sort((a, b) => b[1] - a[1]));
}

export const letterFrequencyCount = (str: string) => {
    const freqMap = new Map<string, number>();

    for (let c of str.split('')) {
        if (freqMap.has(c)) {
            freqMap.set(c, freqMap.get(c)! + 1);
        } else {
            freqMap.set(c, 1);
        }
    }

    return freqMap;
}

export const print2dArr = (arr: any[][]) => {

    console.log();
    for (let row = 0; row < arr.length; row++) {
        let s = '';
        for (let col = 0; col < arr[0].length; col++) {
            s += ' ' + arr[row][col] + ' ';
        }
        console.log(s);
    }

}