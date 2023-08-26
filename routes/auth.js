const express = require('express');
const router = express.Router();
const vars = require('../variables')

require('dotenv').config()

router.get('/', (req, res) => {
    if (vars.sessionAuthenticated === true) {
        res.redirect('/home');
    } else {
        res.redirect(`https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.CLENT_ID}&redirect_uri=${process.env.REDIRECT}&scope=channel%3Amanage%3Aredemptions+channel%3Aread%3Aeditors+channel%3Amanage%3Avips`);
    }
});

module.exports = router;
