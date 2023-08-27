const express = require('express');
const router = express.Router();
const vars = require('../variables')
router.get('/', (req, res) => {
    if (vars.sessionAuthenticated === true) {



        res.render('home');
    } else {
        res.render('failure', {title: "Failure", errorCode: "you are not authorised"})
    }
});

module.exports = router;