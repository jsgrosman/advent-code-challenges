export class Combat {

    private playerDefense: number;
    private playerDamage: number;
    private bossDefense: number = 2;
    private bossDamage: number = 9;
    
    private playerHP = 100;
    private bossHP = 103;

    private round = 1;

    private isDebug = false;

    constructor(defense: number, damage: number, debug: boolean) {
        this.playerDefense = defense;
        this.playerDamage = damage;
        this.isDebug = debug;
    }

    private playerAttacks(): boolean {
        const damage = Math.max(1, this.playerDamage - this.bossDefense);
        this.bossHP -= damage;

        this.debug(`Round ${this.round}: The player deals ${this.playerDamage}-${this.bossDefense} = ${damage} damage; the boss goes down to ${this.bossHP} hit points`)

        return (this.bossHP <= 0);
    }

    private bossAttacks(): boolean {
        const damage = Math.max(1, this.bossDamage - this.playerDefense);
        this.playerHP -= damage;

        this.debug(`Round ${this.round}: The boss deals ${this.bossDamage}-${this.playerDefense} = ${damage} damage; the player goes down to ${this.playerHP} hit points`)

        return (this.playerHP <= 0);
    }

    private combatRound(): boolean {
        
        if (this.playerAttacks()) {
            return true;
        }

        if (this.bossAttacks()) {
            return true;
        }

        this.round++;
        return false;
    }

    public executeCombat(): boolean {

        this.debug(`Begin combat. Boss (damage: ${this.bossDamage}, defense: ${this.bossDefense}) Player (damage: ${this.playerDamage}, defense: ${this.playerDefense})`)
        
        let hasWinner = false;

        while (!hasWinner) {
            hasWinner = this.combatRound();
        }

        if (this.playerHP > 0) {
            return true;
        } else {
            return false;
        }
    }

    private debug(msg: string) {
        if (this.isDebug) {
            console.log(msg);
        }
    }

}

