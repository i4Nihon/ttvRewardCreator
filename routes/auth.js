var express = require('express');
const passport = require("passport");
const {Strategy: TwitchStrategy} = require("passport-twitch");
var router = express.Router();

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
        res.redirect("https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=wa3pgtt6k8l4qerbyqhekmlj7h9cbu&redirect_uri=ttvrewardavocado.pl/twitch-callback&scope=channel:manage:redemptions");
    } else {
        res.redirect('/home');
    }
});

router.get('ttvrewardavocado.pl/twitch-callback', (req, res) => {
    const {code, error} = req.query;

    if (error) {
        // Użytkownik odmówił dostępu, więc możesz przekierować go z powrotem na /auth
        res.redirect('/auth');
    } else if (code) {
        req.session.twitchCode = code;
        res.redirect('/home');
    } else {
        // Obsługa innych przypadków
        res.status(400).send('Nieprawidłowa odpowiedź Twitch.');
    }
})

router.get('/home', (req, res) => {
    if (req.session.authenticated) {
        // Użytkownik jest zautoryzowany, wygeneruj stronę home.hbs
        res.render('home');
    } else {
        // Użytkownik nie jest zautoryzowany, przekieruj go na /auth
        res.redirect('/auth');
    }
});

module.exports = router;