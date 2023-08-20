const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.authenticated) {
        // Użytkownik nie jest zautoryzowany, przekieruj go na /auth
        res.redirect('/auth');
    } else {
        // Użytkownik jest zautoryzowany, wygeneruj stronę home.hbs
        res.redirect('/home');
    }
});

router.get('/auth', (req, res) => {
    if (!req.session.authenticated) {
        res.redirect("https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=wa3pgtt6k8l4qerbyqhekmlj7h9cbu&redirect_uri='auth.ttvrewardavocado.pl/'&scope=channel:manage:redemptions");
    } else {
        res.redirect('/home');
    }
});


module.exports = router;