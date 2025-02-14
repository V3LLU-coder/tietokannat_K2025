const express = require('express');
const app = express();
const port = 3000;


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


app.use(express.json());


let kirjat = [
    { id: 1, nimi: "Sapiens", kirjailija: "Yuval Noah Harari" },
    { id: 2, nimi: "1984", kirjailija: "George Orwell" },
    { id: 3, nimi: "Mestari ja Margarita", kirjailija: "Mihail Bulgakov" }
];


app.get('/kirjat', (req, res) => {
    res.json(kirjat);
});


app.get('/kirja/:id', (req, res) => {
    const kirja = kirjat.find(k => k.id === parseInt(req.params.id));
    if (kirja) {
        res.json(kirja);
    } else {
        res.status(404).send('Kirjaa ei löytynyt');
    }
});


app.get('/kirja/:kirjailija/:nimi', (req, res) => {
    const { kirjailija, nimi } = req.params;
    const kirja = kirjat.find(k => k.kirjailija === kirjailija && k.nimi === nimi);
    if (kirja) {
        res.json(kirja);
    } else {
        res.status(404).send('Kirjaa ei löytynyt');
    }
});


app.post('/kirja', (req, res) => {
    const uusiKirja = req.body;
    kirjat.push(uusiKirja);
    res.send(`Kirja lisätty: ${JSON.stringify(uusiKirja)}`);
});


app.listen(port, () => {
    console.log(`Palvelin käynnissä portissa ${port}`);
});
