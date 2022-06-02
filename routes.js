const axios = require("axios");
const express = require('express');
const router = new express.Router();

router.get('/', function(req, res){
    return res.render("index.html");
})

router.get('/game', function(req, res){
    // const solution = axios.get()
    return res.render("game.html");
})

module.exports = router;