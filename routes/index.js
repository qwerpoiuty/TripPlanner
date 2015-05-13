var express = require('express');
var router = express.Router();
var models = require('../models/');

router.get('/', function(req,res,next){
    models.Hotel.find(function(err,result){
        res.render('index',{
            title: "ALL THE THINGS",
            docs: result
        })
    })
})

module.exports = router;
