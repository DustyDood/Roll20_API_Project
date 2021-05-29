//WHAT IF WE DID AWAY with chat response and instead just make yes or no buttons??
//That way we can avoid this asynchronous frustration haha

//Checking for a response from whomever is being targeted by the Monster!
function chatResponse(player) {
    log("chatResponse successfully called!");
    let listenerOn = true;
    
    if (listenerOn) {
        on("chat:message", function(msg) {
            log(`Event called; msg type = ${msg.type}; player = ${msg.who}`);
            if (msg.type == "general" && msg.who == player) {
                log(msg.content);
                let tR = msg.content.toLowerCase();

                //Check if the player is saying yes
                if (tR == "y" || tR == "yes" || tR == "yay" || tR == "yeah") {
                    log("Yes response");
                    listenerOn = false;
                    return true;
                }

                //Check if the player is saying no
                else if (tR == "n" || tR == "no" || tR == "nay" || tR == "nope") {
                    log ("No response");
                    listenerOn = false;
                    return false;
                }
            }
        });
    }

}