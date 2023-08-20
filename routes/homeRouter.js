const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => {
    if (req.session.authenticated) {
        // Użytkownik jest zautoryzowany, wygeneruj stronę home.hbs
        res.render('home');
    } else {
        // Użytkownik nie jest zautoryzowany, przekieruj go na /auth
        res.redirect('/auth');
    }
});