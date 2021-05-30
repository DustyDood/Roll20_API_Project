function DodgeOptions(player) {
    let dodgeMessage = randomInteger(100);

    switch(true) {
        case(dodgeMessage <= 20):
            sendChat("Narrator", `${player} narrowly dodges out of the way!`);
            break;
        case(dodgeMessage >= 21 && dodgeMessage <= 40):
            sendChat("Narrator", `${player} evades the attack!`);
            break;
        case(dodgeMessage >= 41 && dodgeMessage <= 60):
            sendChat("Narrator", `${player} uses some fancy footwork to dodge the attack!`);
            break;
        case(dodgeMessage >= 61 && dodgeMessage <= 80):
            sendChat("Narrator", `${player} easily steps out of harm's way!`);
            break;
        case(dodgeMessage >= 81):
            sendChat("Narrator", `${player} laughs in the face of danger!`);
            break;
        default:
            sendChat("Narrator", `${player} dodges the attack.`);
    }
}