

// BASE SETUP
// =============================================================================

// call the packages we need
let express = require('express'); // call express
let app = express(); // define our app using express

let path = require('path');

app.use(express.static(path.join(__dirname, '/build')));

let port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
let router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // This is a place where we could write code to be handled for all requests
    // such as checking for errors or checking for authentication
    // do logging
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

router.get('/dealerships', function(req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

router.get('/dealerships/:name', function(req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

router.get('/health', function(req, res) {
    res.json({ status: 'UP' });
});

router.get('/info', function(req, res) {
    let pjson = require('package.json');
    let deployEnv = process.env.DEPLOYMENT_ENV;

    if (!deployEnv) {
        deployEnv = 'unknown';
        console.log('Unknown deployment environment');
    }

    console.log(pjson.name + ' v' + pjson.version + ' running in ' + deployEnv);
    res.json({ name: pjson.name, version: pjson.version, deploy_env: deployEnv });
});

// REGISTER OUR ROUTES -------------------------------

app.use('/', router);
app.use('/dealerships', router);
app.use('/dealerships/:name', router);


// START THE SERVER
// =============================================================================

let server = app.listen(port, function() {
    console.log('Server running on port: ' + port);
});

module.exports = server;