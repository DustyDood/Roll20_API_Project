//I need a way to connect the digital tokens created in Roll20
//With an instance of the monster that I create through code!
class Tetranadon extends Monster {

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
                case(value <= 10):
                    sendChat("Narrator", "The Tetranadon uses a massive body slam!!!");
                    attackSuccess = this.hitCheck(this.headAttack, aggroTarget);
                    break;

                case(value >= 11 && value <= 65):
                    sendChat("Narrator", "The Tetranadon swipes with his tiny arms!");
                    attackSuccess = this.hitCheck(this.armAttack, aggroTarget);
                    break;

                case(value >= 66 && value <= 90):
                    sendChat("Narrator", "The Tetranadon shakes his tiny tail before backing up suddenly!!");
                    attackSuccess = this.hitCheck(this.tailAttack, aggroTarget);
                    break;

                default:
                    sendChat("Narrator", "The Tetranadon is lounging about...");
                    break;
            }
            log(`attackSuccess is ${attackSuccess}`);
        }
        else {
            //Increment the enragedTimer to ensure the monster doesn't stay enraged forever.
            //Attack tree for enraged
            //There is no option for dawdling when enraged!!
            switch(true) {
                case(value <= 45):
                    sendChat("Narrator", "The Tetranadon expands his belly before using the ultimate belly flop!!!");
                    attackSuccess = this.hitCheck(this.headAttack + 1, aggroTarget);
                    break;

                case(value >= 46 && value <= 85):
                    sendChat("Narrator", "The Tetranadon picks up a massive rock and hurls it at you!");
                    attackSuccess = this.hitCheck(this.armAttack + 1, aggroTarget);
                    break;

                case(value >= 86 && value <= 100):
                    sendChat("Narrator", "The Tetranadon raises his leg and stomps suddenly, shaking the ground!!");
                    attackSuccess = this.hitCheck(this.tailAttack + 1, aggroTarget);
                    break;

                default:
                    log("Tetra does nothing");
                    break;
            }
            log(`attackSuccess is ${attackSuccess}`);
        }

    }


}
