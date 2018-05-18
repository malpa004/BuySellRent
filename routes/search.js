var express = require('express');
var router = express.Router();
var moment = require('moment');

var mongodb = require('mongodb');

router.get('/', function(req, res, next) {
    var sitem=req.query.sitem;
    var category=req.query.category;
    var sortBy=req.query.SortBy;
    var sellType=req.query.SellType;

    if(sortBy=='priceA')
         sortBy={ price : 1 };
    else if(sortBy=='priceD')
         sortBy={ price : -1 };
    else if(sortBy=='Date-PostedA')
         sortBy={ posted_at : 1 };
    else
        sortBy={ posted_at : -1 };


    var searchBy;

    if(!!!sitem){
        searchBy =  {category:category};
    }else{
        if(category=="All"){
            searchBy = { $text: { $search: sitem  } };
        }
        else{
            if(sellType=="All")
                {
                    searchBy= {$and: [{ $text: { $search: sitem  } },{category:category} ] };
                }
            else{
                if(sellType!=null){
                    searchBy= {$and:[{$and: [{ $text: { $search: sitem  } },{category:category}]},{type: sellType} ] };
                }
                else{
                    searchBy= {$and: [{ $text: { $search: sitem  } },{category:category} ] };
                }

            }


        }
    }

    req.db.collection("products").find(searchBy).sort(sortBy).toArray(function(err, result){
            sendData(result);
    });

    function sendData(result){
        var utcMilliSeconds;
        var d = new Date(0);
        for(var i in result){
            if(!!result[i].images)
            result[i].img = result[i].images[0];
        }

        for(var i in result){
            if(!!result[i].posted_at)
                {
                    var m = moment(result[i].posted_at).fromNow();
                    result[i].newTime = m;
                    console.log(result[i].newTime);
                }
        }
//        console.log(utcMilliSeconds);

//        console.log(result);
//        console.log(result.posted_at);
//    console.log(result.images);
        res.render('search',{
        scripts: ['search.js'],
        user: req.user,
        result: result,
        sitem: sitem  ,
        category: category
        });
    }
});

module.exports = router;
