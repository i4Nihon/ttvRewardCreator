const express = require('express');
const router = express.Router();
const {exec} = require('child_process')
const vars = require('../variables')
const fs = require("fs");
require('dotenv').config()

router.get('/', async (req, res) => {

  if (vars.ttvCode !== undefined) {
    const curlGetToken = `curl -X POST -k https://id.twitch.tv/oauth2/token -d "client_id=${process.env.CLENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${vars.ttvCode}&grant_type=authorization_code&redirect_uri=${process.env.REDIRECT}"`
    await exec(curlGetToken, async (err, stdout) => {
      if (err) return console.log(err)
      else {
        const values1 = JSON.parse(stdout)

        const curlValidate = `curl -X GET -k https://id.twitch.tv/oauth2/validate -H "Authorization: Bearer ${values1.access_token}"`
        await exec(curlValidate, async (err2, stdout2) => {

          if (err2) return console.log(err2)
          else {
            const values2 = await JSON.parse(stdout2)
            if (values2.login) {
              const userName = getUserName(values1.access_token)
              if (userName === "error") {
                res.render("failure", {title: "failure", errorCode: "ERROR WITH GETTING USER NAME"})
              } else {
                let dataFromFile = fs.readFileSync("../streamersNames.json").toString().slice(1, -1)
                dataFromFile += `,\n"${userName}":"{accessToken: \"${values1.access_token}\",\nrefreshToken: \"${values1.refresh_token}\",\nexpiresIn: \"${values1.expiers_in}\""`
                let data = `{${dataFromFile}}`
                fs.writeFileSync("./test.json", data)
                res.redirect('/redirect')
              }

            } else if (values2.status === 401) {
              res.render('failure', {
                errorCode: "fail in getToken",
                title: "failure",
                TryAgainUrl: process.env.TRY_AGAIN_URL
              })

            }
          }
        })
      }
    })
  } else {
    res.render('failure', {errorCode: "fail in getToken", title: "failure", TryAgainUrl: process.env.TRY_AGAIN_URL})
  }

})

function getUserName(token) {
  let userName;
  let curlGetUserName = `curl -H "Authorization: Bearer ${token}" -H "Client-ID:${process.env.CLENT_ID}" -X GET 'https://api.twitch.tv/helix/users`
  exec(curlGetUserName, (error, stdout) => {
    if (error) {
      console.log(error)
      userName = "error"
    } else {
      vars.streamerId = stdout.data[0].id
      userName = stdout.data[0].login
    }
  })
  return userName
}


module.exports = router;
