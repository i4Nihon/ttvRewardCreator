const express = require('express');
const router = express.Router();
const vars = require('../variables')


router.get('/', (req, res) => {
  const params = new  URLSearchParams(req.originalUrl)
  if (params.has('/redirect?code')) {
    vars.ttvCode = params.get('/redirect?code')
    res.redirect('/token')
  }
  else if (vars.sessionAuthenticated === true) {
    res.redirect('/home');
  }
  else {
    res.send("?????????????")
  }

})


module.exports = router;