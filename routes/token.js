const express = require('express');
const router = express.Router();
const https = require('https')
const fetch = require("node-fetch")
require('dotenv').config()

router.get( '/', (req, res) => {
    let status;
    let accessTokenLocalVar;
    if (req.session.ttvCode) {
        const bodyGetToken =
            {
                method: 'POST',
                body: {
                    client_id: process.env.CLENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    code: req.session.ttvCode,
                    grant_type: "authorization_code",
                    redirect_uri: 'https://ttvrewardavocado.pl/token/redirect',
                }
            }
        fetch('https://id.twitch.tv/oauth2/token', bodyGetToken).then((responese) => {
            req.session.accessTokenNotValidate = responese.accessToken
            accessTokenLocalVar = responese.accessToken
            req.session.refreshToken = responese.refreshToken
        })
        fetch('https://id.twitch.tv/oauth2/validate', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${req.session.accessTokenNotValidate}`
            },
        }).then((response) => {
            status = response.status
            req.session.accessToken = accessTokenLocalVar
        })

        // const reqGetToken = https.request({
        //     hostname: 'id.twitch.tv',
        //     path: '/oauth2/token',
        //     method: 'POST',
        // }, (res) => {
        //     res.on('data', (chunk) => {
        //         req.session.accessTokenNotValidate = chunk.accessToken
        //         req.session.refreshToken = chunk.refreshToken
        //     })
        //     res.on("end", () => {
        //         console.log("no more data")
        //     })
        // })
        // reqGetToken.write(bodyGetToken)
        // reqGetToken.on("error", (e) => {
        //     console.log(e)
        // })
        // reqGetToken.end()

        // const optionsValidateToken = {
        //     hostname: 'id.twitch.tv',
        //     path: '/oauth2/validate',
        //     method: 'GET',
        //     headers: {
        //         'Authorization': `Bearer ${req.session.accessTokenNotValidate}`
        //     }
        // }
        // const  reqValidateToken = https.request(optionsValidateToken, (res) => {
        // req.session.accessToken = accessTokenLocalVar
        // status = res.statusCode
        // })
        // reqValidateToken.on("error", (e) => {
        //     console.log(e)
        // })

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
