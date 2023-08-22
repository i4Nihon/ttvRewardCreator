const express = require('express');
const router = express.Router();
const { exec } = require("child_process");
const configFile = require("../config");
require('dotenv').config()
router.get('/', (req, res) =>{
    if (req.session.ttvCode) {

        const curlPromptToGetToken = `curl -X POST https://id.twitch.tv/oauth2/token -d "client_id=${process.env.CLENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${req.session.ttvCode}&grant_type=authorization_code&redirect_uri=${process.env.GET_TOKEN_REDIRECT}"`
        exec(curlPromptToGetToken, (error, stdout, stderr) =>{
            if (error) console.log(error)
            if (stderr) console.log(stderr)


            let keysWithTokens = Object.keys(stdout)

            req.session.accessTokenNotValidate = keysWithTokens.access_token;
            req.session.refreshToken = keysWithTokens.refresh_token;


        })


        const curlPromptToValidateToken = `curl -X GET https://id.twitch.tv/oauth2/validate -H Authorization: Bearer ${req.session.accessTokenNotValidate}`
        exec(curlPromptToValidateToken, (error, stdout, stderr) => {
            if (error) console.log(error)
            if (stderr) console.log(stderr)

            let keysWithStatus = Object.keys(stdout)

            if (keysWithStatus.status == 401){
                res.redirect('/auth')
            }
            if (keysWithStatus.client_id){
                req.session.accessToken = req.session.accessTokenNotValidate;
            }
        })
        req.session.sessionAuthenticated = true;
    }
    else {
        res.render('failure', {errorCode: "fail in getToken", title: "failure", TryAgainUrl: process.env.TRY_AGAIN_URL})
    }
})

router.get('/token/redirect', (req, res)=>{
    if (!req.session.sessionAuthenticated) {
        // Użytkownik nie jest zautoryzowany, przekieruj go na /auth
        res.redirect('/auth');
    } else {
        // Użytkownik jest zautoryzowany, wygeneruj stronę home.hbs
        res.redirect('/home');
    }
})


module.exports = router;
