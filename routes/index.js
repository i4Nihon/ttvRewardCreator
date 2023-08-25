const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    if (req.session.sessionAuthenticated === true) {
        // Użytkownik nie jest zautoryzowany, przekieruj go na /auth
        res.redirect('/home');
    } else {
        // Użytkownik jest zautoryzowany, wygeneruj stronę home.hbs
        res.redirect('/auth');
    }
});

module.exports = router;