const express = require('express');
const router = express.Router();
const vars = require('../variables')
const {exec} = require("child_process");


router.get('/', (req, res) => {
  const params = new  URLSearchParams(req.originalUrl)
  if (params.has('/redirect?code') && vars.mod === false) {
    vars.ttvCode = params.get('/redirect?code')
    res.redirect('/token')
  }
  else if (vars.sessionAuthenticated === true) {
    res.redirect('/home');
  }
  else if (params.has('/redirect?code') && vars.mod === true){
    getEditorName()
    res.redirect("")
  }

})

function getEditorName(token) {
  let curlGetEditorName = `curl -H "Authorization: Bearer ${token}" -H "Client-ID:${process.env.CLENT_ID}" -X GET 'https://api.twitch.tv/helix/users`
  exec(curlGetEditorName, (error, stdout) => {
    if (error) {
      console.log(error)
      return "error"
    } else {
      vars.editorName = stdout.data[0].login
      return stdout.data[0].login
    }
  })
}


module.exports = router;