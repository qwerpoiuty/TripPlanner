var express = require('express');
var router = express.router();
var models = require('../Models/');

router.get('/', function(req,res,next){
    models.Hotel.find(function(err,result){
        res.render('index',{
            title: "ALL THE THINGS",
            docs: result
        })
    })
})

modules.exports = router;
