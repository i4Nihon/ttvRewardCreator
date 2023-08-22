const express = require('express');
const configFile = require("../config");
const config = Object.keys(configFile)
const router = express.Router();
require('dotenv').config()

router.get('/', (req, res) => {

    if (!config.sessionAuthenticated) {
        // Użytkownik nie jest zautoryzowany, przekieruj go na /auth
        res.redirect('/auth');
    } else {
        // Użytkownik jest zautoryzowany, wygeneruj stronę home.hbs
        res.redirect('/home');
    }
});

router.get('/auth/', (req, res) => {
    if (!config.sessionAuthenticated) {
        res.redirect(`https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.CLENT_ID}&redirect_uri=${process.env.AUTH_REDIRECT}&scope=channel%3Amanage%3Aredemptions%20channel%3Aread%3Aeditors%20channel%3Aread%3Aredemptions%20channel%3Amanage%3Avips%20channel%3Aread%3Avips`);
    } else {
        res.redirect('/home');
    }
});

router.get('/auth/redirect', (req, res) => {

    if (req.originalUrl.toString().includes('error')){
        res.render('failure', {title: 'failure', errorCode: params.get('error'), errorDesc: params.get('error_description'), TryAgainUrl: process.env.TRY_AGAIN_URL})
    }
    if (req.originalUrl.toString().includes('code')){
        req.session.ttvCode = req.query.code
        res.redirect('/token');
    }
})

module.exports = router;
