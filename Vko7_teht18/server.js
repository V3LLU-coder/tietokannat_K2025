const express = require('express');
const cors = require('cors');
const pool = require('./db'); 
const opiskelijaRoutes = require('./routes/opiskelijaRoutes'); 
const opintojaksoRoutes = require('./routes/opintojaksoRoutes'); 
const arviointiRoutes = require('./routes/arviointiRoutes'); 

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/opiskelijat', opiskelijaRoutes);
app.use('/api/opintojaksot', opintojaksoRoutes);
app.use('/api/arvioinnit', arviointiRoutes);


app.get('/', (req, res) => {
    res.send('Tervetuloa Opintorekisteri-API:in!');
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Palvelin käynnissä portissa ${PORT}`);
});
