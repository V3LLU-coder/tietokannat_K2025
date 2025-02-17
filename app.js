let bookArray = [
    { id: 1, title: "The Night Circus", author: "Erin Morgenstern", year: 2011 },
    { id: 2, title: "The Goldfinch", author: "Donna Tartt", year: 2013 },
    { id: 3, title: "The Silent Patient", author: "Alex Michaelides", year: 2019 },
    { id: 4, title: "Normal People", author: "Sally Rooney", year: 2018 },
    { id: 5, title: "The Hunger Games", author: "Suzanne Collins", year: 2008 },
    { id: 6, title: "A Little Life", author: "Hanya Yanagihara", year: 2015 }
  ];
  
  console.log(typeof bookArray); // Object
  console.log(bookArray); // Koko taulu
  console.log(bookArray[0]); // Ensimmäinen rivi
  console.log(bookArray[0].title); // Ensimmäisen kirjan nimi
  console.log(bookArray.length); // Rivien määrä
  
  // Kaikkien kirjojen nimet
  bookArray.forEach(book => {
    console.log(book.title);
  });