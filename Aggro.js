function AggroTest(enemyName) {
    //The idea of aggro test is that an enemy will have a list of all available targets, meaning characters actually controlled by players.
    //The monster will ignore other monsters and typically focus on whichever target is closest.
    //THE EXCEPTION: If a monster takes a large enough amount of damage or is taunted by Drew/an illusion from Christina, it'll go after them instead.
    //I'll probably add an aggroTarget option to the Monster class, which will bypass this whole function lol.
    
    let monster = findObjs({name: enemyName});
    let monsterPage =  monster[0].get("pageid");
    

    //We start by finding all the graphics, meaning our tokens.
    //We then call our filter function checkPlayer, which checks if the controlledby doesn't equal me.
    //Theoretically, this will create a list of tokens that are controlled by players.
    var graphicslist = findObjs({_type: "graphic", _pageid: monsterPage, layer: "objects"}).filter(checkPlayer);

    

    //Next, we take the position of our monster token and store the top and left coordinates.
    let monsterLeft = monster[0].get("left");
    let monsterTop = monster[0].get("top");

    log(`${monster[0].get("name")}'s position: ${monsterLeft} to the left, ${monsterTop} to the top.`);

    let absDistance = 100000;
    let aggroTarget = "";
    //graphicslist.forEach(ClosestEnemy);

    //I use an arrow function here, as I wanted to pass absDistance and aggroTarget. Just referencing the function
    //was causing the variables to drop, for some reason.
    graphicslist.forEach( (enemyArray) => {
        let enemyLeft = enemyArray.get("left");
        let enemyTop = enemyArray.get("top");
        //log(`${enemyArray.get("name")} is at ${enemyLeft} left and ${enemyTop} top.`);
    
        //We then use Absolute Values to calculate the distance from the enemy.
        let newAbsDistance = Math.abs(monsterLeft - enemyLeft) + Math.abs(monsterTop - enemyTop);
    
        //If the current absDistance is equal to the previous absDistance, it'll do a 50/50 between the two.
        //Technically, I don't think this is fully random, as the later objects will have a greater chance of being aggro'd.
        //Honestly, it's not enough an issue to fix, as it'll be rare that two or more enemies are equidistant from a monster.
        if (newAbsDistance == absDistance) {
            //coinflip will either be 0 or 1. If 1, it'll store the new object as the enemy.
            let coinflip = Math.round(Math.random());
            if (coinflip == 1) {
                absDistance = newAbsDistance;
                aggroTarget = enemyArray.get("name");
            }
        }

        //If the current absDistance is less than the previous absDistance, I want to store the new enemy.
        if (newAbsDistance < absDistance) {
            absDistance = newAbsDistance;
            aggroTarget = enemyArray.get("name");
        }
        
        /*
        if (newAbsDistance > absDistance) {
            log(`${enemyArray.get("name")} is further away than the previous target.`);
        }
        */
    });

    log(`The aggro target is ${aggroTarget}`);
    sendChat("Narrator", `${enemyName} has locked on to ${aggroTarget}`);
    
    //Basic player info
    let player = findObjs({name: aggroTarget, pageid: monsterPage});
    let playerLeft = player[0].get("left");
    let playerTop = player[0].get("top");
    log(`${player[0].get("name")} is at ${playerLeft} left and ${playerTop} top.`);
    
    //70 * 6, representing 30 speed.
    let gapdistance = 420;
    let distanceCounter = 0;
    
    //Here we'll have our monster start to approach the hunter it's locked on to.
    if (monsterLeft == playerLeft + 105) {
        
    }
    else if (monsterLeft > playerLeft + 105) {
        if (monsterLeft - playerLeft > gapdistance + 105) {
            monster[0].set("left", monsterLeft + gapdistance);
            distanceCounter++;
        }
        else {
            monster[0].set("left", playerLeft + 105);
        }
    }
    else if (monsterLeft < playerLeft - 105) {
        if (playerLeft - monsterLeft > gapdistance + 105) {
            monster[0].set("left", monsterLeft + gapdistance);
            distanceCounter++;
        }
        else {
            monster[0].set("left", playerLeft - 105);
        }
    }

    if (monsterTop == playerTop + 105) {
        
    }
    else if (monsterTop > playerTop + 105) {
        if (monsterTop - playerTop > gapdistance + 105) {
            monster[0].set("top", monsterTop + gapdistance);
            distanceCounter++;
        }
        else {
            monster[0].set("top", playerTop + 105);
        }
    }
    else if (monsterTop < playerTop - 105) {
        if (playerTop - monsterTop > gapdistance + 105) {
            monster[0].set("top", monsterTop + gapdistance);
            distanceCounter++;
        }
        else {
            monster[0].set("top", playerTop - 105);
        }
    }
    
    
    return [distanceCounter, aggroTarget];

}

//The code looks funny, but that's how my player name is stored.
//I feel like there should be a way to grab the GM name and store it/reference it here, as that would improve scalability.
function checkPlayer(token) {
    return token.get("controlledby") != "-MYf3JateclRHxkQq6be";
}