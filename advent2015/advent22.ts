import { MageCombat }  from "./MageCombat";


let min = 20000000;
let minSpells: string[] = [];
let minLog: string[] = [];
for (let i = 0; i < 20000; i ++){
    const combat = new MageCombat(false, min);
    if (combat.executeCombat()) { // player wins
        const totalCost = combat.spentMana;
        console.log(`totalCost = ${totalCost}`);
        min = Math.min(min, totalCost);
        minSpells = [...combat.castSpells];
        minLog = [...combat.combatLog];
    }
}

console.log ("----------------")
console.log(`Minimum Mana: ${min}`);
console.dir(minSpells);
console.dir(minLog);
console.log ("----------------");