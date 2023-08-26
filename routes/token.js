const express = require('express');
const router = express.Router();
const {exec} = require('child_process')
require('dotenv').config()

router.get('/', (req, res) => {
  let status;
  let accessTokenLocalVar;

  if (req.session.ttvCode) {
    const curlGetToken = `curl -X POST https://id.twitch.tv/oauth2/token -d "client_id=${process.env.CLENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${req.session.ttvCode}&grant_type=authorization_code&redirect_uri=${process.env.REDIRECT}"`
    exec(curlGetToken, (err, stdout, stderr) => {
      if (err) return console.log(err)
      else if (stderr) return console.log(stderr)

      accessTokenLocalVar = stdout.accessToken
      req.session.refreshToken = stdout.refreshToken
    })

    const curlValidate = `curl -X GET https://id.twitch.tv/oauth2/validate -H "Authorization: Bearer ${accessTokenLocalVar}"`

    exec(curlValidate, (err, stdout, stderr) => {
      if (err) return console.log(err)
      else if (stderr) return console.log(stderr)

      status = stdout.status
    })

    if (status === 401) {
      res.render('failure', {errorCode: "fail in getToken", title: "failure", TryAgainUrl: process.env.TRY_AGAIN_URL})
    }
    if (status === 200) {
      req.session.accessToken = accessTokenLocalVar;
      res.redirect('/redirect')
    }
  } else {
    res.render('failure', {errorCode: "fail in getToken", title: "failure", TryAgainUrl: process.env.TRY_AGAIN_URL})
  }

})


module.exports = router;
