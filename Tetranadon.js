//I need a way to connect the digital tokens created in Roll20
//With an instance of the monster that I create through code!
class Tetranadon extends Monster {

    constructor(name, headAttack, armAttack, tailAttack) {
        super(name, headAttack, armAttack, tailAttack);
    }

    attackChoice(value) {
        let attackSuccess = false;

        if (this.enraged) {
            //Attack tree for non-enraged
            switch(true) {
                case(value <= 10):
                    sendChat("Narrator", "The Tetranadon uses a massive body slam!!!");
                    attackSuccess = this.hitCheck(this.headAttack);
                    break;
                case(value >= 11 && value <= 65):
                    sendChat("Narrator", "The Tetranadon swipes with his tiny arms!");
                    attackSuccess = this.hitCheck(this.armAttack);
                    break;
                
                case(value >= 66 && value <= 90):
                    sendChat("Narrator", "The Tetranadon shakes his tiny tail before backing up suddenly!!");
                    attackSuccess = this.hitCheck(this.tailAttack);
                    break;
                default:
                    log("Tetra does nothing");
                    break; 
            }
            log(`attackSuccess is ${attackSuccess}`);
        }
        else {
            //Attack tree for enraged
            //There is no option for dawdling when enraged!!
            switch(true) {
                case(value <= 10):
                    sendChat("Narrator", "The Tetranadon expands his belly before using the ultimate belly flop!!!");
                    attackSuccess = this.hitCheck(this.headAttack + 1);
                    break;
                case(value >= 11 && value <= 70):
                    sendChat("Narrator", "The Tetranadon picks up a massive rock and hurls it at you!");
                    attackSuccess = this.hitCheck(this.armAttack + 1);
                    break;
                
                case(value >= 71 && value <= 100):
                    sendChat("Narrator", "The Tetranadon raises his leg and stomps suddenly, shaking the ground!!");
                    attackSuccess = this.hitCheck(this.tailAttack + 1);
                    break;
                default:
                    log("Tetra does nothing");
                    break; 
            }
            log(`attackSuccess is ${attackSuccess}`);
        }

    }

    hitCheck(hitValue) {
        let hitChance = randomInteger(20) + hitValue;
        sendChat("Narrator", `Does a ${hitChance} hit you?`);
        return true;
    }
}