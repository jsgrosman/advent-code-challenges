import { getFileContents } from "../Utils";

const contents = getFileContents().trim();

interface node {
    name: string;
    children: node[];
    weight: number;
};


const towers = contents.trim().split(/\n/g).map( v => v.split(' '));

const allPrograms: string[] = [];
const allChildren: string[] = [];

// test: tknk
// input: cqmvs

const towerTree = {
    name: 'cqmvs',
    children: [],
    weight: -1,
}


const addProgram = ( tree: node, parent: string, children: string[], weight: number): boolean => {

    if (tree.name === parent) {
        tree.weight = weight;
        children.forEach( (c) => {
            tree.children.push ({
                name: c,
                children: [],
                weight: -1,
            });
        })
        return true;
    }
    else {
        if (tree.children.length === 0) {
            return false;
        }
        else {
            let result = false;
            for (let n of tree.children) {
                result = addProgram(n, parent, children, weight);  
                if (result) {
                    break;
                }              
            }
            return result;
        }
    }
} 

const subWeights: Map<string, number> = new Map<string, number>();


const recurseTower = ( tower: node ) => {

    if (subWeights.has(tower.name)) {
        return subWeights.get(tower.name)!;
    }

    if (tower.children.length === 0) {
        subWeights.set(tower.name, tower.weight);
        return tower.weight;
    } else {
       let total = 0;
       let nameOutput = `${tower.name} + (`;
       let valuesOutput = `${tower.weight} + (`;
       tower.children.forEach( (t) => {
            nameOutput += ` ${t.name} +`;
            total += recurseTower(t);
            valuesOutput += ` ${subWeights.get(t.name)!} +`;
       })
       nameOutput = nameOutput.substring(0, nameOutput.length - 1);
       nameOutput += ')';

       valuesOutput = valuesOutput.substring(0, valuesOutput.length - 1);
       valuesOutput += ')';

       console.log(nameOutput + ' = ' + valuesOutput + ' = ' + (total + tower.weight));
       subWeights.set(tower.name, total + tower.weight);

       return total + tower.weight;
    }
}

let indexes: number[] = []
let currentLength = towers.length;
while (towers.length > 0) {
    for (let [index, tower] of towers.entries()) {

        const programName = tower[0];
        const programWeight = Number(tower[1].replace('(', '').replace(')', ''));
        const children = tower.slice(3).map( v => v.replace(',', ''));

        const result = addProgram(towerTree, programName, children, programWeight);
        if (result) {
            indexes.push(index);
            // console.dir(towerTree);
        }
    }

    for (let i of indexes.reverse()) {
        towers.splice(i, 1);
    }
    indexes = [];

    if (towers.length == currentLength) {
        console.log(`Something went wrong`);
        break;
    } else {
        currentLength = towers.length;
    }
}
//console.log(JSON.stringify(towerTree));
// console.dir(towerTree);


recurseTower(towerTree);
// console.dir(subWeights);





