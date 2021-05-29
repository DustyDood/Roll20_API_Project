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

        //We start by checking if the monster will enrage this turn through enrageCheck().
        this.enrageCheck();

        //We then find out who the monster will lock on to. 
        let aggroTarget = AggroTest(this.name);
        log(`distanceCounter = ${aggroTarget[0]}, aggroTarget = ${aggroTarget[1]}`)
        if (aggroTarget[0] > 0) {
            setTimeout( ()=> {sendChat("Narrator", `${this.name} is out of range!`)}, 2000);
        }
        else {
            log("The monster is attacking.");
            //As we are only passing the target, we pass the 2nd item of the array, which is the target itself. 
            setTimeout( ()=> {this.attack(aggroTarget[1])}, 2000);
        }

    }


    //We start the attack function by using randomInteger, giving a number from 1 to 100 to determine which attack the monster will use
    attack(aggroTarget) {
        let attackChance = randomInteger(100);
        log(`attackChance = ${attackChance} and aggroTarget is ${aggroTarget}.`);

        //Check if the monster is enraged for too long, thus needing a break instead of attacking. 
        let attackGo = this.enrageBreak();
        if (attackGo) {
          setTimeout( () => {this.attackChoice(attackChance, aggroTarget)}, 2000);
        }

    }

    //The value from attack is then passed to attackChoice. This tree will be different for each monster!
    attackChoice(value, aggroTarget) {
        log("you shouldn't see this!");
    }

    //Here we'll find out if our monster is enraged. If so, there's no need to run this function.
    //If they're not enraged, we determine if they will enrage by checking their current HP vs. their max HP.
    //This chance is inversely proportional, so the lower the current HP, the higher the chance the monster will enrage.
    enrageCheck() {

        if (this.enraged == true) {
            return;
        }

        let enemy = findObjs({name: this.name});
        let currentHP = enemy[0].get("bar1_value");
        let maxHP = enemy[0].get("bar1_max");

        log(`${this.name}'s current hp is ${currentHP} and its max hp is ${maxHP}`);

        let HPRatio = currentHP/maxHP;
        let enrageValue = Math.random();

        log(`${HPRatio} is our HP Ratio, ${enrageValue} is our enrage value.`);

        if (HPRatio < enrageValue) {
            sendChat("Narrator", `${this.name} has enraged!!`);
            this.enraged = true;
            return;
        }
        else {
            return;
        }

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

    hitCheck(hitValue, aggroTarget) {
        let hitChance = randomInteger(20) + hitValue;
        log(`${aggroTarget} is the monster's target.`);
        let aggroToken = findObjs({name: aggroTarget});

        //Something's breaking here... The controlledby is getting their id vs name
        let aggroPlayer = aggroToken[0].get("controlledby");
        sendChat("Narrator", `Does a ${hitChance} hit you, ${aggroPlayer}?`);

        //Creating a switch/case statement to give variety to the dice type rolled
        let diceType = 0;
        switch(hitValue) {
            case 1:
                diceType = 6;
                break;
            case 2:
                diceType = 8;
                break;
            case 3:
                diceType = 10;
                break;
            case 4:
                diceType = 10;
                break;
            default:
                diceType = 8;
                break;
        }

        //Ok, so we're going to create 2 buttons here.
        //No will give some generic dodge message.
        //Yes will actually send a message to roll for damage.
        sendChat("Narrator", `[Yes](!rollfordamage ${aggroTarget} ${hitValue} ${diceType} ${hitValue + 1}) [No](!splittest aggroTarget)`);
        return true;
    }
}
