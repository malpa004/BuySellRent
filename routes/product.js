var express = require('express');
var router = express.Router();
var moment = require('moment');
var nodemailer = require('nodemailer');

var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

router.get('/:productId', function(req, res, next) {
  var productId = ObjectId(req.params.productId);
  req.db.collection('products').findOne({'_id':productId}, function(err, product){
    // console.log(product);
    if(product){
      var m =moment(product.posted_at).fromNow();
      product.newTime = m;

      for(var i in product.comments){
        var t =moment(product.comments[i].comment_time).fromNow();
        product.comments[i].newTime = t;
      }
      console.log(product);
        res.render('product', {
          user: req.user,
          product: product,
          scripts: ['local.js']
        });
    }else{
      res.render('error');
    }
  });
});

router.post('/comment', function(req, res){
  var userid = req.body.userid;
  var username = req.body.username;
  var userpic = req.body.userpic;
  var comment = req.body.comment;
  var time = Date.now();
  var productId = ObjectId(req.body.productId);

  req.db.collection('products').update({'_id': productId}, {$push: { comments:{comment_by: username, comment_by_id: userid, comment_by_pic: userpic, comment_content: comment, comment_time: time}}},
  function(err, results){
    // console.log(results);
      res.status(200).send('success');
  });

});

router.post('/contactSeller', function(req, res){
  var productId = ObjectId(req.body.productId);
  var msgFrom = req.user.emails[0].value;
  var subject = req.body.subject;
  var text = "<h3>"+req.user.displayName+" is interesed in your Listing</h3>"+ req.body.text;

  req.db.collection('products').findOne({'_id':productId}, function(err, product){
    // console.log(product);
    if(product){
      var msgTo = product.posted_by.email;
      sendEmail({sub: subject, text: text, from: msgFrom, to: msgTo});
      res.status(200).send('success');
    }
  });
});

router.post('/replyRequest', function(req, res){
  var email = req.body.email;
  var msgFrom = req.user.emails[0].value;
  var subject = req.body.subject;
  var text = "<h3>"+req.user.displayName+" replied to your Request</h3>"+ req.body.message;

sendEmail({sub: subject, text: text, from: msgFrom, to: email});
res.status(200).send('success');
});

function sendEmail(data){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'servertest665@gmail.com',
      pass: 'popo1234'
  }
});

const mailOptions = {
from: 'Goldy Shppy<'+data.from+'>', // sender address
to: data.to, // list of receivers
replyTo: data.from,
subject: data.sub, // Subject line
html: data.text// plain text body
};

transporter.sendMail(mailOptions, function (err, info) {
 if(err)
   console.log(err)
 else
   console.log(info);
});


}

module.exports = router;
