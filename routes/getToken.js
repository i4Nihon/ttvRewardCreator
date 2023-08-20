const express = require('express');
const router = express.Router();
const { exec } = require("child_process");

router.get('/getToken', (req) =>{
    const curlPrompt = `curl -X POST client_id=wa3pgtt6k8l4qerbyqhekmlj7h9cbu&client_secret=887mma1eixqm6p6wbumhfhk30mgdd1&code=${req.session.twitchCode}&grant_type=authorization_code&redirect_uri='ttvrewardavocado.pl/redirect/'`
    if (req.session.twitchCode){
        exec(curlPrompt, (error, stdout, stderr) =>{
            if (error) console.log(error)
            else {
                console.log(stderr)
                return
            }
            console.log(stdout)

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
