var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.redirect('/');
});

router.post('/', function(req, res){

      console.log(req.body);

      var comment = Object();
      comment.name = req.body.name;
      comment.commentMessage = req.body.commentMessage;
      comment.commentTime = Date.now();
      //time if possible

      req.db.collection('comments').insertOne(comment, function(err, results){
          res.send("Done")
      })

    });

module.exports = router;
