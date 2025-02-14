const book = {

    bookArray: [
        { id: 1, title: "The Night Circus", author: "Erin Morgenstern", isbn: "9780385534635" },
        { id: 2, title: "The Goldfinch", author: "Donna Tartt", isbn: "9780316055444" },
        { id: 3, title: "The Silent Patient", author: "Alex Michaelides", isbn: "9781250301697" },
        { id: 4, title: "Normal People", author: "Sally Rooney", isbn: "9780571334650" },
        { id: 5, title: "The Hunger Games", author: "Suzanne Collins", isbn: "9780439023528" },
        { id: 6, title: "A Little Life", author: "Hanya Yanagihara", isbn: "9780804172707" }
    ],


    getAllBooks: function() {
        console.log("Kaikki kirjat:");
        console.log(this.bookArray);
    },


    getOneBook: function(x) {
        const foundBook = this.bookArray.find(book => book.id === x);
        if (foundBook) {
            console.log("Kirjan tiedot:");
            console.log(foundBook);
        } else {
            console.log(`Kirjaa id:llä ${x} ei löytynyt.`);
        }
    },


    addBook: function(id_book, name, author, isbn) {
        const newBook = {
            id: id_book,
            title: name,
            author: author,
            isbn: isbn
        };
        this.bookArray.push(newBook);
        console.log("Uusi kirja lisätty!");
        console.log(newBook);
    }
};


module.exports = book;
