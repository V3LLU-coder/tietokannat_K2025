const book = require("./book");

console.log("Testataan metodit:\n");

book.getAllBooks();

console.log("\n---\n");

book.getOneBook(3);

console.log("\n---\n");

book.addBook(7, "Where the Crawdads Sing", "Delia Owens", "9780735219090");

console.log("\nUuden kirjan lisäämisen jälkeen:");
book.getAllBooks();
