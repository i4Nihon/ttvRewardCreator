const express = require('express');
const router = express.Router();
const configFile = require("../config");
router.get('/', (req, res) => {
    if (req.session.sessionAuthenticated === true) {
        // Użytkownik jest zautoryzowany, wygeneruj stronę home.hbs
        res.render('home');
    } else {
        // Użytkownik nie jest zautoryzowany, przekieruj go na /auth
        res.render('failure', {title: "Failure", errorCode: "you are not authorised"})
    }
});

module.exports = router;