const express = require('express');
const router = express.Router();
const vars = require('../variables')

router.get('/', (req, res) => {

    if (vars.sessionAuthenticated === true) {
        // Użytkownik nie jest zautoryzowany, przekieruj go na /auth
        res.redirect('/home');
    } else {
        // Użytkownik jest zautoryzowany, wygeneruj stronę home.hbs
        res.redirect('/auth');
    }
});

module.exports = router;