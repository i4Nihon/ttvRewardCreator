const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const params = new  URLSearchParams(req.originalUrl)
  if (params.has('/redirect?code')) {
    req.session.ttvCode = params.get('/redirect?code')
    res.redirect('/token')
  }
  else if (req.session.sessionAuthenticated === true) {
    res.redirect('/home');
  }

})


module.exports = router;