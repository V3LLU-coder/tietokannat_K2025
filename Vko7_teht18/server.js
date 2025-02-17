process.on('uncaughtException', (err) => {
    console.log('Ei käsitelty virhe:', err);
    process.exit(1);
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    console.log('Ei käsitelty lupausvirhe:', reason);
  });


const express = require('express');
const cors = require('cors');
const pool = require('./db');
const opiskelijaRoutes = require('./routes/opiskelijaRoutes');
const opintojaksoRoutes = require('./routes/opintojaksoRoutes');
const arviointiRoutes = require('./routes/arviointiRoutes');
const loginRoutes = require('./routes/loginRoutes');
const bcrypt = require('bcryptjs');  
const mysql = require('mysql2');     
const expressBasicAuth = require('express-basic-auth');  
const app = express();

app.use(cors());
app.use(express.json());



app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    console.log("Rekisteröintipyyntö saapui", { username, password }); // Loggaa pyynnön tiedot
  
    if (!username || !password) {
      console.log("Puuttuva käyttäjätunnus tai salasana");
      return res.status(400).json({ message: 'Kayttajatunnus ja salasana vaaditaan' });
    }
  
    console.log("Kryptataan salasana...");
    const hashedPassword = await bcrypt.hash(password, 10);  
    console.log("Salasana kryptattu:", hashedPassword); // Loggaa kryptattu salasana (älä tee tätä tuotannossa)
  
    console.log("Tarkistetaan, onko käyttäjätunnus jo olemassa...");
    try {
        const [results] = await pool.execute('SELECT * FROM user WHERE username = ?', [username]);
      
        if (results.length > 0) {
          console.log('Käyttäjätunnus löytyy:', username);
          return res.status(400).json({ message: 'Käyttäjätunnus on jo käytössä' });
        }
      
        console.log("Käyttäjätunnus ei löytynyt.");
    
      } catch (err) {
        console.error('Virhe tietokannan hakiessa käyttäjätunnusta:', err);
        return res.status(500).json({ message: 'Virhe tietokannassa' });
      }
      
      
      try {
        const [result] = await pool.execute('INSERT INTO user (username, password) VALUES (?, ?)', [username, hashedPassword]);
        console.log('Käyttäjä lisätty onnistuneesti', result);
        res.status(201).json({ message: 'Kayttaja lisatty onnistuneesti' });
      } catch (err) {
        console.error('Virhe tietokannan lisäyksessä:', err);
        res.status(500).json({ message: 'Virhe kayttajan lisaamisessa' });
      }
      
    });
  


  async function myAuthorizer(username, password, cb) {
    console.log("Tarkistetaan käyttäjätunnus:", username); // Loggaa käyttäjätunnus
    pool.query('SELECT * FROM user WHERE username = ?', [username], async (err, results) => {
      if (err) {
        console.log('Virhe tietokannan kyselyssä', err);
        return cb(null, false);
      }
  
      if (results.length === 0) {
        console.log('Käyttäjätunnusta ei löydy');
        return cb(null, false);
      }
  
      const user = results[0];
      console.log("Tarkistetaan salasana käyttäjälle:", username); // Loggaa käyttäjä ja salasana vertailu
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        console.log('Salasana oikein');
        return cb(null, true);  
      } else {
        console.log('Salasana väärin');
        return cb(null, false);  
      }
    });
  }
  

app.use(expressBasicAuth({
  authorizer: myAuthorizer,  
  challenge: true,           
  realm: 'Kayttajatunnus ja salasana vaaditaan' 
}));


app.get('/protected', (req, res) => {
  res.send('Tervetuloa suojattuun alueeseen!');
});


app.use('/api/opiskelijat', opiskelijaRoutes);
app.use('/api/opintojaksot', opintojaksoRoutes);
app.use('/api/arvioinnit', arviointiRoutes);
app.use('/api/login', loginRoutes);


app.get('/', (req, res) => {
    console.log("Paasivun pyynto saapui");
  res.send('Tervetuloa Opintorekisteri-API:in!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Palvelin kaynnissa portissa ${PORT}`);
});
