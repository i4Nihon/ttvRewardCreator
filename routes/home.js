const express = require('express');
const router = express.Router();
const configFile = require("../config");
const config = Object.keys(configFile)

router.get('/', (req, res) => {
    if (config.sessionAuthenticated === true) {
        // Użytkownik jest zautoryzowany, wygeneruj stronę home.hbs
        res.render('home');
    } else {
        // Użytkownik nie jest zautoryzowany, przekieruj go na /auth
        res.render('failure', {title: "Failure", errorCode: "you are not authorised", TryAgainUrl: process.env.TRY_AGAIN_URL})
    }
});

module.exports = router;