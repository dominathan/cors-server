var express = require('express');
var port = process.env.PORT || 3000;
var http = require('http');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.get('/', function(req,response) {
//   response.sendFile('public');
// });

app.post('/any-request/', function(req,res,next) {
  console.log('test', req.body);
  var url = req.body
  // var options = {
  //   url: req.body.url
  // }
  request.get({url: url}, function(err, response) {
    if(err) {
      console.log("OH FUCK", err);
      next(err);
    }
    console.log('YAAAYY', response);
    res.send(response.body);
  })
})

app.get('/any-request/:url', function(req,res,next) {
  console.log('REQ BODY', req.body);
  console.log("REQ PARAMS")
  var url = req.body
  // var options = {
  //   url: req.body.url
  // }
  request.get({url: url}, function(err, response) {
    if(err) {
      console.log("OH FUCK", err);
      next(err);
    }
    console.log('YAAAYY', response);
    res.send(response.body);
  })
})

// app.get('/weather/:lat/:long', function(req,res,next){
//   console.log("PARAMS", req.params);
//   var url = "https://api.forecast.io/forecast/854526c92cddcc6edaca6e044dc11acf/" + req.params.lat + ',' + req.params.long;
//   request.get({url: url}, function(err, response) {
//     console.log("ERR: ", err);
//     console.log("RESPONSE: ", response.body);
//     res.send(JSON.parse(response.body));
//   });
// });

app.listen(port, function() {
  console.log(" LISTENING ON PORT " + port);
});
