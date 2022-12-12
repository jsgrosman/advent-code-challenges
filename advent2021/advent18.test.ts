import { explode, split, reduce, add } from './advent18-functions';


describe ("Exploding", () => {

    test ('parse explode with left-most pair', () => {
        const input = '[[[[[9,8],1],2],3],4]';
        const expected = '[[[[0,9],2],3],4]';
        
        const output = explode(input);
        expect(output).toBe(expected);
    });

    test ('parse explode with right-most pair', () => {
        const input = '[7,[6,[5,[4,[3,2]]]]]';
        const expected = '[7,[6,[5,[7,0]]]]';
        const output = explode(input);
        expect(output).toBe(expected);
    });

    test ('parse explode with middle pair', () => {
        const input = '[[6,[5,[4,[3,2]]]],1]';
        const expected = '[[6,[5,[7,0]]],3]';
        const output = explode(input);
        expect(output).toBe(expected);
    });

    test ('parse explode two possibilities', () => {
        const input = '[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]';
        const expected = '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]';
        const output = explode(input);
        expect(output).toBe(expected);
    });

    test ('parse explode again', () => {
        const input = '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]';
        const expected = '[[3,[2,[8,0]]],[9,[5,[7,0]]]]';
        const output = explode(input);
        expect(output).toBe(expected);
    });

    test ('explode example 1', () => {
        const input = '[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]';
        const expected = '[[[[0,7],4],[7,[[8,4],9]]],[1,1]]';
        const output = explode(input);
        expect(output).toBe(expected);
    });

    test ('explode example 2', () => {
        const input = '[[[[0,7],4],[7,[[8,4],9]]],[1,1]]';
        const expected = '[[[[0,7],4],[15,[0,13]]],[1,1]]';
        const output = explode(input);
        expect(output).toBe(expected);
    });

    test ('explode example 3', () => {
        const input = '[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]';
        const expected = '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]';
        const output = explode(input);
        expect(output).toBe(expected);
    });

});

describe ("Splitting", () => {
    test ('split example 1', () => {
        const input = '[[[[0,7],4],[15,[0,13]]],[1,1]]';
        const expected = '[[[[0,7],4],[[7,8],[0,13]]],[1,1]]';
        const output = split(input);
        expect(output).toBe(expected);
    });

    test ('split example 2', () => {
        const input = '[[[[0,7],4],[[7,8],[0,13]]],[1,1]]';
        const expected = '[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]';
        const output = split(input);
        expect(output).toBe(expected);
    });

});

describe ("Reducing", () => {
    test ('reducing example 1', () => {
        const input = '[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]';
        const expected = '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]';
        const output = reduce(input);
        expect(output).toBe(expected);
    });

    test ('reducing example 2', () => {
        const input = '[[[[0,7],[15,0]],[[7,7],[7,6]]],[[[22,11],[6,11]],[[10,10],[5,0]]]]';
        const expected = '[[[[7,0],[7,7]],[[7,7],[7,8]]],[[[7,7],[8,8]],[[7,7],[8,7]]]]';
        const output = reduce(input);
        expect(output).toBe(expected);
    });
});

describe ("Adding", () => {
    test ('Adding example 1', () => {
        const input = [
            '[1,1]',
            '[2,2]',
            '[3,3]',
            '[4,4]'
        ]
        const expected = '[[[[1,1],[2,2]],[3,3]],[4,4]]';

        let output = input.shift() || '';
        for (let line of input) {
            const sum = add(output, line);
            console.log(`sum: ${sum}`);
            const reduced = reduce(sum);
            console.log(`reduced: ${reduced}`);
            output = reduced;
        }
        expect(output).toBe(expected);
    });

    test ('Adding example 2', () => {
        const input = [
            '[1,1]',
            '[2,2]',
            '[3,3]',
            '[4,4]',
            '[5,5]'
        ]
        const expected = '[[[[3,0],[5,3]],[4,4]],[5,5]]';

        let output = input.shift() || '';
        for (let line of input) {
            const sum = add(output, line);
            console.log(`sum: ${sum}`);
            const reduced = reduce(sum);
            console.log(`reduced: ${reduced}`);
            output = reduced;
        }
        expect(output).toBe(expected);
    });

    test ('Adding example 3', () => {
        const input = [
            '[1,1]',
            '[2,2]',
            '[3,3]',
            '[4,4]',
            '[5,5]',
            '[6,6]'
        ]
        const expected = '[[[[5,0],[7,4]],[5,5]],[6,6]]';

        let output = input.shift() || '';
        for (let line of input) {
            const sum = add(output, line);
            console.log(`sum: ${sum}`);
            const reduced = reduce(sum);
            console.log(`reduced: ${reduced}`);
            output = reduced;
        }
        expect(output).toBe(expected);
    });

    test ('Adding example 4', () => {
        const input = [
            '[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]',
            '[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]',
        ]
        const expected = '[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]';

        let output = input.shift() || '';
        for (let line of input) {
            const sum = add(output, line);
            console.log(`sum: ${sum}`);
            const reduced = reduce(sum);
            console.log(`reduced: ${reduced}`);
            output = reduced;
        }
        expect(output).toBe(expected);
    });

    test ('Adding example 5', () => {
        const input = [
            '[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]',
            '[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]',
        ]
        const expected = '[[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]';

        let output = input.shift() || '';
        for (let line of input) {
            const sum = add(output, line);
            console.log(`sum: ${sum}`);
            const reduced = reduce(sum);
            console.log(`reduced: ${reduced}`);
            output = reduced;
        }
        expect(output).toBe(expected);
    });

    test ('Adding example 6', () => {
        const input = [
            '[[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]',
            '[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]',
        ]
        const expected = '[[[[7,0],[7,7]],[[7,7],[7,8]]],[[[7,7],[8,8]],[[7,7],[8,7]]]]';

        let output = input.shift() || '';
        for (let line of input) {
            const sum = add(output, line);
            console.log(`sum: ${sum}`);
            const reduced = reduce(sum);
            console.log(`reduced: ${reduced}`);
            output = reduced;
        }
        expect(output).toBe(expected);
    });


});