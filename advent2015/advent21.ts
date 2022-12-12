import { Combat }  from "./Combat";

// shuffle array function
const shuffle = (array: item[]) => {
    {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
 }


// boss stats
const bossHP = 103, bossDamage = 9, bossArmor = 2;

// player stats
let playerHP = 100, playerDamage = 0, playerArmor = 0;

// item interface
interface item {
    name:string,
    cost:number,
    damage:number,
    armor:number,
};

const dagger = {
    name: 'dagger',
    cost: 8,
    damage: 4,
    armor: 0,
};

const shortsword = {
    name: 'shortsword',
    cost: 10,
    damage: 5,
    armor: 0,
};

const warhammer = {
    name: 'warhammer',
    cost: 25,
    damage: 6,
    armor: 0,
};

const longsword = {
    name: 'longsword',
    cost: 40,
    damage: 7,
    armor: 0,
};

const greataxe = {
    name: 'greataxe',
    cost: 74,
    damage: 8,
    armor: 0,
};

const leather = {
    name: 'leather',
    cost: 13,
    damage: 0,
    armor: 1,
};

const chainmail = {
    name: 'chainmail',
    cost: 31,
    damage: 0,
    armor: 2,
};

const splintmail = {
    name: 'splintmail',
    cost: 53,
    damage: 0,
    armor: 3,
};

const bandedmail = {
    name: 'bandedmail',
    cost: 75,
    damage: 0,
    armor: 4,
};

const platemail = {
    name: 'platemail',
    cost: 102,
    damage: 0,
    armor: 5,
};

const damageRing1 = {
    name: 'damageRing1',
    cost: 25,
    damage: 1,
    armor: 0,
};

const damageRing2 = {
    name: 'damageRing2',
    cost: 50,
    damage: 2,
    armor: 0,
};

const damageRing3 = {
    name: 'damageRing3',
    cost: 100,
    damage: 3,
    armor: 0,
};

const defenseRing1 = {
    name: 'defenseRing1',
    cost: 20,
    damage: 0,
    armor: 1,
};

const defenseRing2 = {
    name: 'defenseRing2',
    cost: 40,
    damage: 0,
    armor: 2,
};

const defenseRing3 = {
    name: 'defenseRing3',
    cost: 80,
    damage: 0,
    armor: 3,
};

const none = {
    name: 'none',
    cost: 0,
    damage: 0,
    armor: 0,
};

// lists
const weapons = [dagger,shortsword,warhammer,longsword,greataxe];
const armor = [leather,chainmail,splintmail,bandedmail,platemail,none];
const rings = [damageRing1,damageRing2,damageRing3,defenseRing1,defenseRing2,defenseRing3,none,none];
const items = [weapons,armor,rings];

let min = 20000000;
let max = 0;
let maxStuff: item[] = [];
let minStuff: item[] = [];
for (let i = 0; i < 50000; i ++){
    //shuffle lists
    shuffle(weapons);
    shuffle(armor);
    shuffle(rings);

    // choose items
    const boughtItems = [weapons[0],armor[0],rings[0],rings[1]];
    
    //calculate
    const [damage, defense] = boughtItems.reduce( (p, c) => {
        return [p[0] + c.damage, p[1] + c.armor];
    }, [0, 0]);

    const combat = new Combat(defense, damage, false);
    if (combat.executeCombat()) { // player wins
        let totalCost = 0;
        for (let thing of boughtItems) {
            totalCost += thing.cost;
        }
        min = Math.min(min,totalCost);
        if (min == totalCost){
            minStuff = [...boughtItems];
        }
    } else { // boss wins
        let totalCost = 0;
        for (let thing of boughtItems) {
            totalCost += thing.cost;
        }
        max = Math.max(max,totalCost);
        if (max == totalCost){
            maxStuff = [...boughtItems];
        }
    }
}

console.log ("----------------")
console.log(`Minimum Gold: ${min}`);
console.dir(minStuff);
console.log ("----------------");
console.log(`Maximum Gold: ${max}`);
console.dir(maxStuff);