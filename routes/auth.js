const express = require('express');
const router = express.Router();
require('dotenv').config()

router.get('/', (req, res) => {
    if (req.session.sessionAuthenticated === true) {
        res.redirect('/home');
    } else {
        res.redirect(`https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.CLENT_ID}&redirect_uri=${process.env.AUTH_REDIRECT}&scope=channel%3Amanage%3Aredemptions%20channel%3Aread%3Aeditors%20channel%3Aread%3Aredemptions%20channel%3Amanage%3Avips%20channel%3Aread%3Avips`);
    }
});

router.get('/redirect', (req, res) => {

    if (req.originalUrl.toString().includes('error')){
        res.render('failure', {title: 'failure', errorCode: params.get('error'), errorDesc: params.get('error_description')})
    }
    if (req.originalUrl.toString().includes('code')){
        req.session.ttvCode = req.query.code
        res.redirect('/token');
    }
})

module.exports = router;
