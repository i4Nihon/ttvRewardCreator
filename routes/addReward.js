const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.authenticated) {
        // Użytkownik nie jest zautoryzowany, przekieruj go na /auth
        res.redirect('/auth');
    } else {
        // Użytkownik jest zautoryzowany, wygeneruj stronę
        res.render('addReward', { title: 'Dodaj' });
    }
});

router.get('/addreward/commandOutput', function (req, res, next){

    res.render('commandOutput', {title: 'cmdOut'})

})

module.exports = router;
