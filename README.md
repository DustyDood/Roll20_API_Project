# Roll20_API_Project

Hello! Roll20 is a website that allows for multiple users to connect online and play tabletop games, such as D&D. They have a robust amount of APIs for users, which I have been experimenting with.

This project is a work-in-progress for interfacing with those APIs! I'm ultimately going to create 3-4 monsters for a D&D session I'm hosting. These monsters will be JavaScript objects that not only interact with the virtual board and the tokens, but also the chatbox of the users!

In terms of technical concepts, I'm hoping to include:

1. JavaScript ES6
2. Classes and Inheritance (A "monster" class that the "Tetranadon", "Mizutsune", and other classes will inherit from)
3. Polymorphism (The behaviors of the subclasses will differ from the "monster" superclass)
4. API interaction (The program will interact with the board and with the users by utilizing Roll20's APIs!)
5. Looping and Probabilities (Checking which attack each monster will do)
6. Asynchronous Behavior (The API will check with the user of the token being targeted, asking if an "X" value would hit them. The user will respond yes or no. If yes, the API will roll for user damage).
