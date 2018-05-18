var express = require('express');
var router = express.Router();
var moment = require('moment');

var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

var multer  = require('multer')
var multerGridFs = require('multer-gridfs-storage');

var Gridfs = require('gridfs-stream');

const multerGridFsStorage = multerGridFs({
   url: process.env.DB_URI
});
var upload = multer({ storage: multerGridFsStorage });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/allRequests', function(req, res){
  // console.log(req.user._json.sub);

  req.db.collection('requests').find({'userId':req.user._json.sub}).toArray(function(err, requests){
    for(var i in requests){
      // console.log(products[i].images);
      var m =moment(requests[i].requested_at).fromNow();
      requests[i].newTime = m;
    }
    res.render('allRequests', {requests: requests, user: req.user, scripts: ['allListing.js']});
  });
});

router.get('/allListings', function(req, res){
  // console.log(req.user._json.sub);

  req.db.collection('products').find({'posted_by.id':req.user._json.sub}).toArray(function(err, products){
    for(var i in products){
      // console.log(products[i].images);
      var m =moment(products[i].posted_at).fromNow();
      products[i].newTime = m;
      products[i].dispImg =  products[i].images[0];
    }
    res.render('allListings', {products: products, user: req.user, scripts: ['allListing.js']});
  });
});

router.get('/editListing/:productId', function(req, res){
  // console.log(req.user._json.sub);
  var productId = ObjectId(req.params.productId);

  req.db.collection('products').findOne({'_id':productId}, function(err, product){
   console.log(product);
      res.render('editListing',{user: req.user, product: product, scripts: ['postListing.js', 'editListing.js']});
  });
});

router.post('/editListing', function(req, res){
  // console.log(req.body.id);
  // res.send('data');
    var productId = ObjectId(req.body.id);
    var prod = Object();
    prod.name = req.body.name;
    prod.description = req.body.description;
    prod.category = req.body.category;
    prod.type = req.body.type;
    prod.price = req.body.price;
    prod.posted_by = {id:req.user._json.sub, name: req.user.displayName, picture: req.user.picture, email: req.user.emails[0].value};
    prod.posted_at = Date.now();

    if(prod.category == "Apartment"){
      var apartment = Object();
      apartment.beds = req.body.beds;
      apartment.bath = req.body.bath;
      apartment.area = req.body.area;
      apartment.pets = req.body.pets;
      apartment.parking = req.body.parking;
      apartment.ac = req.body.ac;
      apartment.address = req.body.address;
      apartment.location = req.body.location;
      prod.apartment = apartment;

  }
    if(prod.category == "Book"){
    prod.book = true;
  }
  if(prod.category == "Furniture"){
    prod.furniture = true;
  }
  if(prod.category == "Bike"){
    prod.bike = true;
  }
  if(prod.category == "Other"){
    prod.other = true;
  }


  if(prod.type == "Rent"){
      var rent = Object();
      rent.start = req.body.from_date;
      rent.end = req.body.to_date;
      prod.rent = rent;
  }

  req.db.collection('products').findOne({'_id':productId}, function(err, results){
     console.log(results);
     var images = results.images;
     prod.images= images;
     prod.comments = results.comments;
     req.db.collection('products').deleteOne({'_id':productId}, function(err, results){
       req.db.collection('products').insertOne(prod, function(err, results){
           console.log(results);
           res.redirect('/user/allListings');
       });
     });
      // res.send("Done");
  });

    // console.log(prod);
  // req.db.collection('products').updateOne({'_id':productId},prod, function(err, results){
  //    console.log(results);
  //     res.send("Done");
  // });
    // console.log(req.body.name);
    // console.log(req.body.description);
});

router.post('/deleteRequest', function(req, res){
  console.log(req.body.id);
  var id = ObjectId(req.body.id);
  req.db.collection('requests').deleteOne({_id: id}, function(err, results){
    // console.log(results);
    //send success status to client side
    res.status(200).send('success');
  });
});


router.post('/deleteListing', function(req, res){
  console.log(req.body.id);
  var id = ObjectId(req.body.id);
  req.db.collection('products').deleteOne({_id: id}, function(err, results){
    // console.log(results);
    //send success status to client side
    res.status(200).send('success');
  });
});

router.get('/editProfile', function(req, res){
  // console.log(req.user._json.sub);
  req.db.collection('users').findOne({'_id': req.user._json.sub}, function(err, result){
    console.log(result);
    res.render('editProfile', {user: req.user,  result:result, scripts:['profile.js']});
  });
});

router.post('/editProfile', upload.single('profileImage'), function(req, res){
  // console.log(req.user._json.sub);
  console.log("Hi in edit profile");
  console.log(req.file);
  console.log("Heylooooooo");

  req.db.collection('users').updateOne({_id:req.user._json.sub}, {$set:{displayName:req.body.displayName,
    email:req.body.email, contactNumber:req.body.contactNumber, picture : req.file}}, function(err, result){
      console.log(result);

    });

  });

  module.exports = router;
