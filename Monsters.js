
//We want to start by defining an initial Monster class
//This will contain attacks and aggro behavior!!

class Monster {
    constructor(name, headAttack, armAttack, tailAttack) {
        this.name = name;
        this.headAttack = headAttack;
        this.armAttack = armAttack;
        this.tailAttack = tailAttack;
        this.enraged = false;
        this.enragedTimer = 0;
    }

    takeTurn() {
        log(`The ${this.name} takes its turn!`);

    }


    //We start the attack function by using randomInteger, giving a number from 1 to 100 to determine which attack the monster will use
    attack() {
        let attackChance = randomInteger(100);
        log(`attackChance = ${attackChance}`);
        sendChat(`${this.name} takes its turn!`);
        
        //Check if the monster is enraged
        this.enrageCheck();

        this.attackChoice(attackChance);
    }

    //The value from attack is then passed to attackChoice. This tree will be different for each monster!
    attackChoice(value) {
        log("you shouldn't see this!");
    }

    //Enraged check: We'll see if the monster is enraged or not. If so, it'll increment an int.
    //A monster will only stay enraged for 3 turns. After that, it'll take a turn to rest.
    //If it's not enraged, it'll proceed to attack like normal.
    enrageCheck() {
        if (this.enraged) {
            if (this.enragedTimer == 3) {
                sendChat("Narrator",`${this.name} is taking a breather after being enraged so long!`)
                //Want to stop full code execution here!
                return;
            }
            else {
                sendChat("Narrator", `${this.name} is currently enraged!`);
                this.enragedTimer++;
                log(`${this.name} enrage state: ${this.enragedTimer}`);
            }
        }
        else {
            log(`${this.name} is not currently enraged.`);
        }
    }
}


