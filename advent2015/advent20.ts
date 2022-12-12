
// const goal = 29000000;
const goal = 29000000;
let presentTotal = 0, house = 1, count = 0;
while (presentTotal < goal) {

    presentTotal = 0
    for (let elf = 1; elf <= Math.sqrt(house); elf++) {
        if (house % elf === 0) {
            const factor = house/elf;
//            console.log(`elf = ${elf}, factor = ${factor}`);

            if (factor <= 50) {
                presentTotal += (elf * 11);
            }
            
            if (elf != factor && elf <= 50) {
                presentTotal += (factor * 11);
            }
        }
    }
    console.log(`House ${house} got ${presentTotal} presents.`)
    house++;

}