const express = require('express');
const router = express.Router();
const vars = require('../variables')

router.get('/', (req, res) => {
    if (vars.sessionAuthenticated) {
        res.render('addReward', { title: 'Dodaj' });
    } else {
        res.redirect('/auth');
    }
});

router.get('/addreward/commandOutput', function (req, res){

    res.render('commandOutput', {title: 'cmdOut'})

})

module.exports = router;
