var express = require('express');
var router = express.Router();
var models = require('../models/');

router.get('/', function(req,res,next){
    models.Hotel.find(function(err,hotels){
        models.Restaurant.find(function(err, rest){
            models.ThingToDo.find(function(err,things){
                res.render('index',{
                    hotelList: hotels,
                    restList: rest,
                    thingList: things
                })
            })
        })
    })
})

module.exports = router;

/*
var async = require  async;
router.get('/', function(req, res, next){
    async.parallel({
        hotels: function(done){
            models.Hotel.find(done)
        },
        restaurants: function(done){
    
        },
        thingsToDo: function(done){
            
        }
    }, function(err, resultsHash){
        res.json(resultsHash)
    })
})
*/