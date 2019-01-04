var express = require('express');
var router = express.Router();
var restify = require('restify-clients');
var assert = require('assert');

var client = restify.createJsonClient({
    url:'http://localhost:4000'
});

//client.basicAuth('$login', '$password');

/* GET users listing. */
router.get('/', function(req, res, next) {
    client.get('/users', function(err, request, response, obj){
        assert.ifError(err);
        res.end(JSON.stringify(obj,null,2));
    });
});

module.exports = router;
