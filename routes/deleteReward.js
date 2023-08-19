var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.authenticated) {
        // Użytkownik nie jest zautoryzowany, przekieruj go na /auth
        res.redirect('/auth');
    } else {
        // Użytkownik jest zautoryzowany, wygeneruj stronę
        res.render('deleteReward', { title: 'Usuń' });
    }
});

module.exports = router;
