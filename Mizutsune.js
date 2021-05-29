//This is our Mizutsune class!
//Maybe all my monsters are a little too powerful...

class Mizutsune extends Monster {

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
                case(value <= 40):
                    sendChat("Narrator", "The Mizutsune lunges forward, biting you!!!");
                    setTimeout(()=> {this.hitCheck(this.headAttack, aggroTarget)}, 1500);
                    break;

                case(value >= 41 && value <= 60):
                    sendChat("Narrator", "The Mizutsune uses a double scratch attack!");
                    setTimeout(()=> {this.hitCheck(this.armAttack, aggroTarget)}, 1500);
                    break;

                case(value >= 61 && value <= 100):
                    sendChat("Narrator", "The Mizutsune swings her massive tail!!");
                    setTimeout(()=> {this.hitCheck(this.tailAttack, aggroTarget)}, 1500);
                    break;

                default:
                    sendChat("Narrator", "The Mizutsune is idly making bubbles...");
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
                    sendChat("Narrator", "The Mizutsune charges and release a highly pressurized stream of water!!!");
                    setTimeout(()=> {this.hitCheck(this.headAttack + 1, aggroTarget)}, 1500);
                    break;

                case(value >= 36 && value <= 75):
                    sendChat("Narrator", "The Mizutsune rears her body upwards before swiping with both claws!");
                    setTimeout(()=> {this.hitCheck(this.armAttack + 1, aggroTarget)}, 1500);
                    break;

                case(value >= 76 && value <= 100):
                    sendChat("Narrator", "The Mizutsune spins around and unleashes a massive tail swipe!!");
                    setTimeout(()=> {this.hitCheck(this.tailAttack + 1, aggroTarget)}, 1500);
                    break;

                default:
                    sendChat("Narrator", "The Mizutsune is blowing more bubbles...");
                    break;
            }
            log(`attackSuccess is ${attackSuccess}`);
        }

    }


}
