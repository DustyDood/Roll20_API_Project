//This is our Rajang class!
//I honestly think he's going to hit way too hard. I'll need to test him a little.

class Rajang extends Monster {

    constructor(name, headAttack, armAttack, tailAttack) {
        super(name, headAttack, armAttack, tailAttack);
    }

    attackChoice(value, aggroTarget) {
        let attackSuccess = false;

        //Somehow, aggroTarget here is becoming 0, name rather than just name
        log(`Monster is enraged: ${this.enraged} and the aggroTarget is ${aggroTarget}.`)

        if (!this.enraged) {
            //Attack tree for non-enraged
            switch(true) {
                case(value <= 30):
                    sendChat("Narrator", "The Rajang charges forward, headbutting you!!");
                    setTimeout(()=> {this.hitCheck(this.headAttack, aggroTarget)}, 1500);
                    break;

                case(value >= 31 && value <= 80):
                    sendChat("Narrator", "The Rajang raises his arm and takes a massive swing!!!");
                    setTimeout(()=> {this.hitCheck(this.armAttack, aggroTarget)}, 1500);
                    break;

                case(value >= 81 && value <= 100):
                    sendChat("Narrator", "The Rajang jumps backward hastily, knocking you aside!");
                    setTimeout(()=> {this.hitCheck(this.tailAttack, aggroTarget)}, 1500);
                    break;

                default:
                    sendChat("Narrator", "The Rajang is grooming himself...");
                    break;
            }
            log(`attackSuccess is ${attackSuccess}`);
        }
        else {
            //Increment the enragedTimer to ensure the monster doesn't stay enraged forever.
            //Attack tree for enraged
            //There is no option for dawdling when enraged!!
            switch(true) {
                case(value <= 35):
                    sendChat("Narrator", "The Rajang unleashes a massive beam of lightning!!!");
                    setTimeout(()=> {this.hitCheck(this.headAttack + 1, aggroTarget)}, 1500);
                    break;

                case(value >= 36 && value <= 75):
                    sendChat("Narrator", "The Rajang, in an amazing feat of strength, rips out a tree and throws it at you!!!");
                    setTimeout(()=> {this.hitCheck(this.armAttack + 1, aggroTarget)}, 1500);
                    break;

                case(value >= 76 && value <= 100):
                    sendChat("Narrator", "The Rajang jumps into the air, curling into a ball!");
                    setTimeout(()=> {this.hitCheck(this.tailAttack + 1, aggroTarget)}, 1500);
                    break;

                default:
                    sendChat("Narrator", "The Rajang is taking a breather...");
                    break;
            }
            log(`attackSuccess is ${attackSuccess}`);
        }

    }


}
