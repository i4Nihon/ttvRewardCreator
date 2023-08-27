const express = require('express');
const router = express.Router();
const vars = require('../variables')

router.get('/', (req, res) => {
    res.render("index")
    if (vars.sessionAuthenticated === true) {
        res.redirect('/rewards');
    } else {
        res.redirect('/auth');
    }
});

module.exports = router;