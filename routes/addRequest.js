var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.redirect('/');
});

router.post('/', function(req, res){

      console.log(req.body);

      var request = Object();
      request.email = req.user.emails[0].value;
      request.userId = req.user._json.sub;
      request.requested_at = Date.now();
      request.name = req.user.displayName;
      request.category = req.body.category;
      request.requirement = req.body.requirement;
      request.message = req.body.requestMessage;
      //time if possible

      req.db.collection('requests').insertOne(request, function(err, results){
          res.send("Done")
      })

    });

module.exports = router;
