const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db');  
const router = express.Router();


router.post('/', async (req, res) => {
    const { username, password } = req.body;

    
    if (!username || !password) {
        return res.status(400).json({ error: 'Kayttajatunnus ja salasana ovat pakollisia' });
    }

    try {
        
        const [users] = await pool.execute(
            'SELECT * FROM user WHERE username = ?',
            [username]
        );
        
        if (users.length === 0) {
            return res.status(400).json({ error: 'Virheelliset kirjautumistiedot' });
        }
        
        const user = users[0]; 
        

        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Virheelliset kirjautumistiedot' });
        }

        
        res.status(200).json({ message: 'Kirjautuminen onnistui!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Sisainen palvelinvirhe' });
    }
});

module.exports = router;
