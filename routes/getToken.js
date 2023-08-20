const express = require('express');
const router = express.Router();
const { exec } = require("child_process");
router.get('/getToken', (req, res) =>{
    if (req.session.twitchCode){
        const curlPromptToGetToken = `curl -X POST client_id=wa3pgtt6k8l4qerbyqhekmlj7h9cbu&client_secret=887mma1eixqm6p6wbumhfhk30mgdd1&code=${req.session.twitchCode}&grant_type=authorization_code&redirect_uri='ttvrewardavocado.pl/getToken/redirect/'`
        exec(curlPromptToGetToken, (error, stdout, stderr) =>{
            if (error) console.log(error)
            if (stderr) console.log(stderr)


            let keysWithTokens = Object.keys(stdout)

            req.session.accessTokenNotValidate = keysWithTokens.access_token;
            req.session.refreshToken = keysWithTokens.refresh_token;


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
    if (!req.session.authenticated) {
        // Użytkownik nie jest zautoryzowany, przekieruj go na /auth
        res.redirect('/auth');
    } else {
        // Użytkownik jest zautoryzowany, wygeneruj stronę home.hbs
        res.redirect('/home');
    }
})


module.exports = router;
