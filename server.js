// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

    mongoose.connect('mongodb://1.34.137.108/local');     // connect to mongoDB database on modulus.io

   // app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

//for CORS(port)
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://1.34.137.108');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

    // define model =================
    var Tarot = mongoose.model('Tarot', {
        name : String,
        position : String,
        imageUrl : String
    });

    var Record = mongoose.model('Record',{
        askerName : String,
        cardType : String,
        cards : [Number],
        time : Date,
        comment: String,
        oldComment: String,
        readByBack: Boolean
    });

    // routes ======================================================================

    // api ---------------------------------------------------------------------
    app.get('/api/results', function(req, res,next) {
        console.log(req.query);
        //if time==null, query all
        if(req.query.time==null){
            Record.find(function(err,results){
                if(err) res.send(err);
                else res.json(results);
            });
        }
        //query specific record with time as key
        else {
        Record.findOne(req.query,function(err, results) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);
            else{
            res.json(results); 
            console.log(results);
            }
        });
        }   
    });

    // create record
    app.post('/api/results', function(req, res,next) {

        console.log(req.body);
        // create a result, information comes from AJAX request from Angular
        Record.create(
        {           
            askerName : req.body.askerName,
            cardType : req.body.cardType,
            cards: req.body.cards,
            time: req.body.time,
            comment: req.body.comment,
            oldComment: "",
            readByBack: false
        }, 
        function(err, result) {
            if (err)
                res.send(err);
           else res.send("success"); 
        }
        );

    });
    //update comment to specific record
    app.put('/api/results',function(req,res,next){
        console.log(req.body);
        Record.findOneAndUpdate(
            {time:req.body.time},
            {
                comment:req.body.comment,
                oldComment:req.body.oldComment,
                readByBack:req.body.readByBack
            },
            {new:true},
            function(err,updated){
                if (err) res.send(err);
                else res.json(updated);
            console.log("updated="+updated);
            }
            )        
    });

 // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");