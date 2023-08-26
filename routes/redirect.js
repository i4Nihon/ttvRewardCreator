const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

  if (req.session.sessionAuthenticated === true) {
    res.redirect('/home');
  }
  const params = new  URLSearchParams(req.originalUrl)
  if (params.has('code')) {
    req.session.ttvCode = params.get('code')
    res.redirect('/token')
  }

})


module.exports = router;