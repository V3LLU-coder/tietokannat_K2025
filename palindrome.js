const readline = require("readline");


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question("Anna sana: ", function(word) {
    
    let lowerCaseWord = word.toLowerCase();

    let reversedWord = lowerCaseWord.split("").reverse().join("");

    if (lowerCaseWord === reversedWord) {
        console.log(`"${word}" on palindromi!`);
    } 
    else {
        console.log(`"${word}" ei ole palindromi.`);
    }

    
    rl.close();
});
