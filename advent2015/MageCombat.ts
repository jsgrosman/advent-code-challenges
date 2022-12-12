interface SpellData {
    name: Spell,
    mana: number,
    damage: number,
    healing: number,
    effect: Effect,
    timer: number
}

enum Effect {
    Poison = "POISON",
    Shield = "SHIELD",
    Recharge = "RECHARGE",
    None = "NONE"
  };

  enum Spell {
      MagicMissile = "MAGIC MISSILE",
      Drain = "DRAIN",
      Shield = "SHIELD",
      Poison = "POISON",
      Recharge = "RECHARGE"
  }

export class MageCombat {

    private spells: SpellData[] = [
        {
            name: Spell.MagicMissile,
            mana: 53,
            damage: 4,
            healing: 0,
            effect: Effect.None,
            timer: 0
        },
        {
            name: Spell.Drain,
            mana: 73,
            damage: 2,
            healing: 2,
            effect: Effect.None,
            timer: 0
        },
        {
            name: Spell.Shield,
            mana: 113,
            damage: 0,
            healing: 0,
            effect: Effect.Shield,
            timer: 6
        },
        {
            name: Spell.Poison,
            mana: 173,
            damage: 0,
            healing: 0,
            effect: Effect.Poison,
            timer: 6
        },
        {
            name: Spell.Recharge,
            mana: 229,
            damage: 0,
            healing: 0,
            effect: Effect.Recharge,
            timer: 5
        },
    ];

    private playerHP = 50;
    private playerMana = 500;
    private bossHP = 58;
    private bossDamage: number = 9;

    
    
    private playerDefense = 0;
    public spentMana = 0;
    public castSpells: string[] = [];
    public combatLog: string[] = [];

    private timers: { [key: string]: number} = {};

    private shieldTimer = 0;
    private poisonTimer = 0;
    private rechargeTimer = 0;

    private round = 1;

    private currentMin: number;

    private isDebug = false;

    constructor(debug: boolean, min: number) {
        this.timers[Effect.Poison] = 0;
        this.timers[Effect.Shield] = 0;
        this.timers[Effect.Recharge] = 0;
        this.timers[Effect.None] = 0;

        this.isDebug = debug;
        this.currentMin = min;
    }

    private shuffleSpells() {
        for (let i = this.spells.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.spells[i], this.spells[j]] = [this.spells[j], this.spells[i]];
        }
     }

    private handleEffect() {
        if (this.timers[Effect.Recharge]! > 0) {
            this.playerMana += 101;
            this.timers[Effect.Recharge]!--;
            this.debug(`Recharge provides 101 mana; its timer is now ${this.timers[Effect.Recharge]}.`);
        }

        if (this.timers[Effect.Shield]! > 0) {
            if (this.timers[Effect.Shield]! === 6) {
                this.playerDefense += 7;
            } else if (this.timers[Effect.Shield]! === 1) {
                this.playerDefense -= 7;
            }
            
            this.timers[Effect.Shield]!--;
            this.debug(`Shield's timer is now ${this.timers[Effect.Shield]}.`)
        } 

        if (this.timers[Effect.Poison]! > 0) {
            this.bossHP -= 3;
            this.timers[Effect.Poison]!--;
            this.debug(`Poison deals 3 damage; its timer is now ${this.timers[Effect.Poison]}.`)
        }
    }

    private displayStats() {
        this.debug(`- Player has ${this.playerHP} hit points, ${this.playerDefense} armor, ${this.playerMana} mana`);
        this.debug(`- Boss has ${this.bossHP} hit points`);
    }

    private playerAttacks() {

        this.playerHP--;
        if (this.playerHP <= 0) {
            return;
        }

        this.debug('-- Player turn --');
        this.displayStats();
        this.handleEffect();

        if (this.bossHP <= 0) {
            return;
        }

        this.shuffleSpells();

        let currentSpell: SpellData | undefined = undefined;
        for (let spell of this.spells) {
            if (this.playerMana >= spell.mana && this.timers[spell.effect] === 0) {
                currentSpell = spell;
                break;
            }
        }

        if (!currentSpell) {
            this.debug(`Can't find a spell to cast`);
            return;
        }

        this.playerMana -= currentSpell.mana;
        this.spentMana += currentSpell.mana;
        this.timers[currentSpell.effect] = currentSpell.timer;
        this.bossHP -= currentSpell.damage;
        this.playerHP += currentSpell.healing;
        this.castSpells.push(currentSpell.name);

        this.debug(`Player casts ${currentSpell.name}.`);
    }

    private bossAttacks() {

        this.debug(` -- Boss turn --`);
        this.displayStats();
        this.handleEffect();

        if (this.bossHP <= 0) {
            return;
        }

        const damage = Math.max(1, (this.bossDamage - this.playerDefense));
        this.playerHP -= damage;
        this.debug(`Boss attacks for ${damage} damage.`);
    }

    private combatRound(): boolean {
        
        this.playerAttacks();
        if (this.bossHP <= 0 || this.playerHP <= 0) {
            return true;
        }

        this.bossAttacks();
        if (this.bossHP <= 0 || this.playerHP <= 0) {
            return true;
        }

        this.round++;
        return false;
    }

    public executeCombat(): boolean {
        let hasWinner = false;

        while (!hasWinner) {
            // prune
            if (this.spentMana >= this.currentMin) {
                return false;
            }

            hasWinner = this.combatRound();
        }

        if (this.playerHP > 0) {
            return true;
        } else {
            return false;
        }



    }

    private debug(msg: string) {
        this.combatLog.push(msg);
        if (this.isDebug) {
            console.log(msg);
        }
    }

}

