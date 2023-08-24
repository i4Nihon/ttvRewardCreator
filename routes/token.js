const express = require('express');
const router = express.Router();
const http = require('http')
require('dotenv').config()

router.get( '/', (req, res) => {
    let status;
    if (req.session.ttvCode) {
        const optionsGetToken = {
            hostname: 'https://id.twitch.tv/oauth2/token',
            method: 'POST'
        }
        const bodyGetToken = JSON.stringify({
                client_id: process.env.CLENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                code: req.session.ttvCode,
                grant_type: "authorization_code",
                redirect_uri: process.env.GET_TOKEN_REDIRECT
        })
        const reqGetToken = http.request(optionsGetToken, (res) => {
            req.session.accessTokenNotValidate = res.headers.access_token
            req.session.refreshToken = res.headers.refresh_token
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
                console.log('No more data in response.');
            });
        })
        reqGetToken.on('error', (e) => {
            console.log("error:", e.message)
        })
        reqGetToken.write(bodyGetToken)
        reqGetToken.end()

        const optionsValidateToken = {
            hostname: "https://id.twitch.tv/oauth2/validate",
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${req.session.accessTokenNotValidate}`
            }
        }
        const reqValidate = http.request(optionsValidateToken, (res) => {
            status = res.statusCode
            res.on('end', () => {
                console.log('No more data in response.');
            });
        })

        reqValidate.on('error', (e) => {
            console.log('error: ', e.message)
        })
        reqValidate.write(JSON.stringify({}))
        reqValidate.end()

        if (status === 401){
            res.render('failure', {errorCode: "fail in getToken", title: "failure", TryAgainUrl: process.env.TRY_AGAIN_URL})
        }
        if (status === 200){
            req.session.accessToken = req.session.accessTokenNotValidate;
        }
         res.redirect('/token/redirect')
    }
    else {
        res.render('failure', {errorCode: "fail in getToken", title: "failure", TryAgainUrl: process.env.TRY_AGAIN_URL})
    }
})



router.get('/redirect', (req, res)=>{
    if (req.session.sessionAuthenticated === false) {
        res.render('failure', {title: "Failure", errorCode: "some err in /token/redirect", TryAgainUrl: process.env.TRY_AGAIN_URL})
    } else {
        res.redirect('/home');
    }
})


module.exports = router;
