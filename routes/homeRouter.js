const express = require('express');
const router = express.Router();
const config = require("../config");

router.get('/home', (req, res) => {
    if (config.sessionAuthenticated) {
        // Użytkownik jest zautoryzowany, wygeneruj stronę home.hbs
        res.render('home');
    } else {
        // Użytkownik nie jest zautoryzowany, przekieruj go na /auth
        res.redirect('/auth');
    }
});