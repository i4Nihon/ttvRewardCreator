var express = require('express');
var router = express.Router();
const vars = require('../variables')

router.get('/', (req, res) => {
    if (vars.sessionAuthenticated) {
        res.render('editReward', { title: 'Edytuj' });
    } else {
        res.redirect('/auth');
    }
});
module.exports = router;
