const readline = require("readline");


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question("Anna ensimmäinen luku: ", function(firstNumber) {
    
    rl.question("Anna toinen luku: ", function(secondNumber) {
        
        let num1 = parseFloat(firstNumber);
        let num2 = parseFloat(secondNumber);

        
        if (isNaN(num1) || isNaN(num2)) {
            console.log("Virhe! Anna kelvolliset numerot.");
        } else {
            
            if (num1 > num2) {
                console.log(`Suurempi luku on: ${num1}`);
            } else if (num2 > num1) {
                console.log(`Suurempi luku on: ${num2}`);
            } else {
                console.log("Luvut ovat yhtä suuret.");
            }
        }

        rl.close();
    });
});
