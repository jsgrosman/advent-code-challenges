import { getFileContents } from "../Utils";


const part1 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const list1: number[] = lines.map( n => Number(n.split(/\s+/)[0]));
    const list2: number[] = lines.map( n => Number(n.split(/\s+/)[1]));

    list1.sort();
    list2.sort();

    let total = 0;
    for (let i = 0; i < lines.length; i++) {
        total += Math.abs(list1[i] - list2[i]);
    }
    console.log(total);


};


const part2 = () => {
    const contents = getFileContents();
    const lines = contents.trim().split(/\n/g);

    const list1: number[] = lines.map( n => Number(n.split(/\s+/)[0]));
    const list2: number[] = lines.map( n => Number(n.split(/\s+/)[1]));


    let total = 0;
    for (let i = 0; i < lines.length; i++) {
       const num = list1[i];
       total += num * list2.filter( n => n === num).length;
    }
    console.log(total);

};

const both = () => {
    const contents = getFileContents();
    const c = getFileContents().trim().split(/\n/g);

    const [l, r] = [0, 1].map(i => c.map( n => +(n.split(/\s+/)[i])).toSorted( (a,b) => a - b));
    const [t1, t2] = l.reduce( ([p1, p2], v, i) => [p1 + Math.abs(v - r[i]), p2 + v * r.filter( n => n === v).length], [0, 0]);
    console.log(`Part 1: ${t1}, Part 2: ${t2}`);
};

//part1();
// part2();
both();