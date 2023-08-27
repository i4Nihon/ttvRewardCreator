const express = require('express');
const router = express.Router();
const {exec} = require('child_process')
const vars = require('../variables')
require('dotenv').config()

router.get('/', async (req, res) => {

  if (vars.ttvCode !== undefined) {
    const curlGetToken = `curl -X POST -k https://id.twitch.tv/oauth2/token -d "client_id=${process.env.CLENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${vars.ttvCode}&grant_type=authorization_code&redirect_uri=${process.env.REDIRECT}"`
    await exec(curlGetToken, async (err, stdout) => {
      if (err) return console.log(err)

      const values1 = JSON.parse(stdout)
      vars.refreshToken = values1.refresh_token
      vars.expiresIn = values1.expiers_in

      const curlValidate = `curl -X GET -k https://id.twitch.tv/oauth2/validate -H "Authorization: Bearer ${values1.access_token}"`
      await exec(curlValidate, async (err2, stdout2) => {

        if (err2) return console.log(err2)

        const values2 = await JSON.parse(stdout2)
        if (values2.login) {
          vars.sessionAuthenticated = true
          vars.accessToken = values1.access_token;
          res.redirect('/redirect')

        }
        else if (values2.status === 401) {
          res.render('failure', {errorCode: "fail in getToken", title: "failure", TryAgainUrl: process.env.TRY_AGAIN_URL})

        }
      })
    })
  } else {
    res.render('failure', {errorCode: "fail in getToken", title: "failure", TryAgainUrl: process.env.TRY_AGAIN_URL})
  }

})


module.exports = router;
