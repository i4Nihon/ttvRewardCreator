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
        res.redirect(`https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.CLENT_ID}&redirect_uri='ttvrewardavocado.pl/auth/redirect/'&scope=channel:manage:redemptions`);
    } else {
        res.redirect('/home');
    }
});

router.get('/auth/redirect', (req, res) => {

    if (req.query.error){
        res.render('faliure', {title: 'faliure', errorCode: req.query.error, errorDesc:req.query.error_description})
    }
    if (req.query.code){
        config.ttvCode = req.query.code;
        config.sessionAuthenticated = true;
        res.redirect('/gettoken/')
    }
})

module.exports = router;