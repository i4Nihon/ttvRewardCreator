const express = require('express');
const router = express.Router();
const vars = require('../variables')
streamersJson = require('../streamersNames.json')
const {getEditors} = require("../getEditors")
router.get('/', (req, res) => {
    let ifEditorFounded = getEditors(vars.streamerId, streamersJson[vars.editorName].accessToken, process.env.CLENT_ID, vars.editorName)
    if (ifEditorFounded) {

        res.render('home');
    } else {
        res.render('failure', {title: "Failure", errorCode: "you are not authorised"})
    }
});

module.exports = router;