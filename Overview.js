on("ready", function() {
    log("Does this work?");
    var d20Result = randomInteger(20);
    log("The d20 result is " + d20Result);

    //Our initial namespace creating for our state
    if( ! state.DustyDoodsMonster) {
        state.DustyDoodsMonster = {
          X: "BOOP",
          version: 1.0
        }
    }

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
            case "test":
                Test();
                break;
            case "spawntest":
                SpawnTest();
                break;
            case "aggrotest":
                AggroTest("Bobby");
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

    //This will store our newly created monsters in our state, functions and all!
    //They won't persist between sandbox sessions... But they will last for now.
    if( ! state.DustyDoodsMonster) {
        state.DustyDoodsMonster = {
          Tetranadon: tetranadon
        }
    } else {
      state.DustyDoodsMonster = {
        Tetranadon: tetranadon
      }
    }




    /*
    createObj('graphic', {
        name: 'Daniel',
        pageid: Campaign().get('playerpageid')
    });
    */

}

//Tetranadon's turn!
function TetraTurn() {
    let tetranadon = state.DustyDoodsMonster.Tetranadon;

    tetranadon.takeTurn();
    tetranadon.attack();
}

//Mizutsune's turn!
function MizuTurn() {
    sendChat("Narrator", "Mizutsune lunges forward with a strong bite!");
    var attackHit = randomInteger(20) + 5;
    sendChat("Narrator", `Does a ${attackHit} hit?`);
}

function SpawnTest() {
    createObj('graphic', {
        name: 'Daniel',
        pageid: '-MYf2kLz8N-RLoTsxb-c',
        layer: 'objects',
        left: '1225',
        top: '315'
    });
}

function Test() {
    log("Testing..?");
    var patroltoken = findObjs({_type: "graphic", name: "Ronny"})[0]; 
    sendChat("Narrator", `${patroltoken.get("name")} walks to the right!`);
    patroltoken.set("left", patroltoken.get("left") + 70);
    
    //We can declare a token marker and set it to the token, as seen below!
    patroltoken.set("status_skull", true);
    
    //log(JSON.parse(Campaign().get("token_markers")));
    //log(patroltoken.get("_pageid"));
    
    let masterLeft = patroltoken.get("left");
    let masterTop = patroltoken.get("top");
    log(`masterLeft = ${masterLeft}, masterTop = ${masterTop}`);
    
    
    var enemylist = findObjs({_type: "graphic", controlledby: ""});
    log(enemylist.length);
    log(enemylist[0].get("name"));
    
    //enemylist.forEach(myFunction);
        
        
    
}

//This successfully checks if a token has Bobby in the gm notes! 
//We use unescape to essentially decode how text is stored.
function myFunction(item, index) {
    var token = unescape(item.get('gmnotes'));
    if (token.includes("Bobby")) {
        log("He's Bobby!");
    }
    else {
        log("That's not Bobby...");
    }
}