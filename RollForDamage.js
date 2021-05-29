function RollForDamage(player, numberOfDice, diceType, flatBonus) {
    sendChat("Narrator", `${player} takes a hit!`);
    sendChat("Narrator", `/r ${numberOfDice}d${diceType} + ${flatBonus}`);
}