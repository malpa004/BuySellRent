var express = require('express');
var router = express.Router();
// add co lib to chain promises
var co = require('co');

var mongodb = require('mongodb');

// add multer lib to support file uploads
var multer  = require('multer')
var multerGridFs = require('multer-gridfs-storage');

// use this for sending files to browser from gridfs
var Gridfs = require('gridfs-stream');

// to store in memory:
// var upload = multer({ storage: multer.memoryStorage() })

// to store in mongodb (GridFS):
const multerGridFsStorage = multerGridFs({
   url: process.env.DB_URI
});
var upload = multer({ storage: multerGridFsStorage });


/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(req.user.email);
  res.render('postListing', {
    scripts: ['postListing.js'],
    user: req.user
  });
});

router.post('/newListing', upload.array('images'), function(req, res){
  // if (!req.file) {
  //   res.status(500).send('error: no file');
  // }
  var fileIds = [];
  if(req.files){
    // console.log(req.files);
    for(i in req.files){
      // console.log(req.files[i].id);
      fileIds.push(req.files[i].id);
    }
  }else{
    console.log("No images");
    res.status(500).send('error: no file');
  }
  console.log(fileIds);
  /*
  req.file:
    upload-file-form { fieldname: 'thefile',
    originalname: 'upload-me.txt',
    encoding: '7bit',
    mimetype: 'text/plain',
    destination: 'uploads/',
    filename: '4e5b95869729cf62b4db9005fe9ce575',
    path: 'uploads/4e5b95869729cf62b4db9005fe9ce575',
    size: 30 }
  */

  // res.json({
  //   'filename': req.file.originalname,
  //   'mimetype': req.file.mimetype,
  //   'size (bytes)': req.file.size
  // });

  var product = Object();
  product.name = req.body.name;
  product.description = req.body.description;
  product.type = req.body.type;
  product.price = req.body.price;
  product.images = fileIds;
  product.category = req.body.category;
  product.posted_by = {id:req.user._json.sub, name: req.user.displayName, picture: req.user.picture, email: req.user.emails[0].value};
  product.posted_at = Date.now();

  if(product.category == "Apartment"){
      var apartment = Object();
      apartment.beds = req.body.beds;
      apartment.bath = req.body.bath;
      apartment.area = req.body.area;
      apartment.pets = req.body.pets;
      apartment.parking = req.body.parking;
      apartment.ac = req.body.ac;
      apartment.location = req.body.location;
      apartment.address = req.body.address;
      product.apartment = apartment;

  }
  if(product.category == "Book"){
    product.book = true;
  }
  if(product.category == "Furniture"){
    product.furniture = true;
  }
  if(product.category == "Bike"){
    product.bike = true;
  }
  if(product.category == "Other"){
    product.other = true;
  }


  if(product.type == "Rent"){
      var rent = Object();
      rent.start = req.body.from_date;
      rent.end = req.body.to_date;
      product.rent = rent;
  }

  req.db.collection('products').insertOne(product, function(err, results){
      console.log(results);
      res.redirect('/user/allListings');
  });
});

router.post('/coordinates', function(req, res){
  var address = req.body.address;
  res.send(address+" POPO");
});

module.exports = router;
