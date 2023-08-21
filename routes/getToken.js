const express = require('express');
const router = express.Router();
const { exec } = require("child_process");
const configFile = require("../config");
const config = Object.keys(configFile)
require('dotenv').config()
router.get('/getToken/', (req, res) =>{
    const config = req.app.get('config')
    if (req.query.twitchCode) {

        const curlPromptToGetToken = `curl -X POST client_id=${process.env.CLENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${req.session.twitchCode}&grant_type=authorization_code&redirect_uri='ttvrewardavocado.pl/getToken/redirect/'`
        exec(curlPromptToGetToken, (error, stdout, stderr) =>{
            if (error) console.log(error)
            if (stderr) console.log(stderr)


            let keysWithTokens = Object.keys(stdout)

            config.accessTokenNotValidate = keysWithTokens.access_token;
            config.refreshToken = keysWithTokens.refresh_token;


        })


        const curlPromptToValidateToken = `curl -X GET https://id.twitch.tv/oauth2/validate Authorization: Bearer ${req.session.accessTokenNotValidate}`
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
    }
})

router.get('/getToken/redirect', (req, res)=>{
    if (!config.sessionAuthenticated) {
        // Użytkownik nie jest zautoryzowany, przekieruj go na /auth
        res.redirect('/auth');
    } else {
        // Użytkownik jest zautoryzowany, wygeneruj stronę home.hbs
        res.redirect('/home');
    }
})


module.exports = router;
