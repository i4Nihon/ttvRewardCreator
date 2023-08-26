const express = require('express');
const router = express.Router();
const vars = require('../variables')
router.get('/', (req, res) => {
    if (vars.sessionAuthenticated === true) {
        // Użytkownik jest zautoryzowany, wygeneruj stronę home.hbs
        res.render('home');
    } else {
        // Użytkownik nie jest zautoryzowany, przekieruj go na /auth
        res.render('failure', {title: "Failure", errorCode: "you are not authorised"})
    }
});

module.exports = router;