on("ready", function() {
    log("Does this work?");
    var d20Result = randomInteger(20);
    log("The d20 result is " + d20Result);



})


on('chat:message', handleInput);


//Start by handling API input. This is where we'll initially dole out commands.
function handleInput(message) {

    //Simple code to see who sent the message!
    //This confirms that message.who is just the display name!
    //WE can use this when trying to gather responses if an attack hits.

    /*
    log(`${message.who} has the id of ${message.playerid}`)
    if(message.who == "Dusty Z. (GM)") {
        log("Dusty sent this!")
    }
    else {
        log("Dusty not recognized")
    }
    */


    if(message.type == 'api') {
        let messageEdit = message.content.toLowerCase();
        messageEdit = messageEdit.substring(1, messageEdit.length)
        log(messageEdit);
        switch(messageEdit) {
            case "spawnenemies":
                spawnEnemies();
                break;
            case "tetra":
                TetraTurn();
                break;
            case "mizu":
                MizuTurn();
                break;
            default:
                log("API Command not recognized");
        }
    }
    else {
        //log("Nope, not working");
    }
}

//Initially spawn our enemy tokens!
function spawnEnemies() {
    sendChat("Narrator", "The enemies are spawning!");

    var tetranadon = new Tetranadon("Tetranadon", 1, 2, 3);
    log(tetranadon);

    //Let's try storing Tetranadon in the localStorage functionality
    localStorage.setItem('Tetranadon', JSON.stringify(tetranadon));

    /*
    createObj('graphic', {
        name: 'Daniel',
        pageid: Campaign().get('playerpageid')
    });
    */

}

//Tetranadon's turn!
function TetraTurn() {
    //Add in get for localStorage tetranadon functionality
    let tetranadon = JSON.parse(localStorage.getItem('Tetranadon'));

    tetranadon.takeTurn();
    tetranadon.attack();
}

//Mizutsune's turn!
function MizuTurn() {
    sendChat("Narrator", "Mizutsune lunges forward with a strong bite!");
    var attackHit = randomInteger(20) + 5;
    sendChat("Narrator", `Does a ${attackHit} hit?`);
}



