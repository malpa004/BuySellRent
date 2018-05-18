var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');

var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  req.db.collection('requests').find().toArray(function(err, requests){
    console.log(requests);
    req.db.collection('products').find().sort({posted_at: -1}).toArray(function(err, products){
      var apartments =[], books=[], furniture=[], bikes=[], others = [];
      var aptCounter = 0, bookCounter = 0, sCounter = 0, bikeCounter = 0, oCounter = 0;
      for(var i in products){
        if(!!products[i].images){
          products[i].displayImage = products[i].images[0];
          var m =moment(products[i].posted_at).fromNow();
          products[i].newTime = m;
        }
        if(products[i].category == "Apartment" && aptCounter != 4){
          apartments[aptCounter++] = products[i];
        }
        if(products[i].category == "Book" && bookCounter != 4){
            books[bookCounter++] = products[i];
        }
        if(products[i].category == "Bike" && bikeCounter != 4){
          bikes[bikeCounter++] = products[i];
        }
        if(products[i].category == "Furniture" && sCounter != 4){
          furniture[sCounter++] = products[i];
        }
        if(products[i].category == "Other" && oCounter != 4){
            others[oCounter++] = products[i];
        }
      }
      // console.log(apartments);


      res.render('index', { title: 'Goldy Shoppy!', user: req.user, request :requests,
      apartment : apartments, book:books, bike:bikes, furniture:furniture, other:others, scripts:['mainPage.js']});
    });
  });
});

module.exports = router;
