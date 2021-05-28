//We want to start by defining an initial Monster class
//This will contain attacks and aggro behavior!!

//Maybe we'll make the methods static, as there is only one monster we're going to spawn per type...
//I feel like there should be a better solution, but that would involve using state

//Solomon's recommendation: Connect a dB for Monsters! I need to store their stats somewhere
//I'll need to continue looking into Roll20's APIs to see how I can do this.

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
        sendChat("Narrator", `${this.name} takes its turn!`);
        log(`The ${this.name} takes its turn!`);
        let aggroTarget = AggroTest(this.name);
        log(`distanceCounter = ${aggroTarget[0]}, aggroTarget = ${aggroTarget[1]}`)
        if (aggroTarget[0] > 0) {
            sendChat("Narrator", `${this.name} is out of range!`);
        }
        else {
            log("The monster is attacking.");
            this.attack();
        }

    }


    //We start the attack function by using randomInteger, giving a number from 1 to 100 to determine which attack the monster will use
    attack() {
        let attackChance = randomInteger(100);
        log(`attackChance = ${attackChance}`);


        //I need to add an aggro function here so we know who the monster is targeting!
        //This will also control movement and what not, as the monster will approach the token it is aggro'd on.
        //I'll need to also add a 'taunt' command to Drew's character so all monsters aggro him.

        //Check if the monster is enraged for too long, thus needing a break instead of attacking. 
        let attackGo = this.enrageBreak();
        if (attackGo) {
          this.attackChoice(attackChance);
        }

    }

    //The value from attack is then passed to attackChoice. This tree will be different for each monster!
    attackChoice(value) {
        log("you shouldn't see this!");
    }

    enrageCheck() {
        
    }

    //Enraged break: We'll see if the monster is enraged or not. If so, it'll increment an int.
    //A monster will only stay enraged for 3 turns. After that, it'll take a turn to rest.
    //If it's not enraged, it'll proceed to attack like normal.
    enrageBreak() {
        if (this.enraged) {
            if (this.enragedTimer == 3) {
                sendChat("Narrator",`${this.name} is taking a breather after being enraged so long!`)
                //Want to stop full code execution here while ensuring the enraged conditions reset!
                this.enraged = false;
                this.enragedTimer = 0;
                return false;
            }
            else {
                sendChat("Narrator", `${this.name} is currently enraged!`);
                this.enragedTimer++;
                log(`${this.name} enrage state: ${this.enragedTimer}`);
                return true;
            }
        }
        else {
            log(`${this.name} is not currently enraged.`);
            return true;
        }
    }
}
