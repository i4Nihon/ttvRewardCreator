const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.query.code) req.session.ttvCode = req.query.code

    if (req.session.sessionAuthenticated === true) {
        res.redirect('/home');
    } else {
        res.render('failure', {title: "Failure", errorCode: "some err in /redirect", TryAgainUrl: process.env.TRY_AGAIN_URL})
    }

})


module.exports = router;