var express = require('express');
var router = express.Router();
var io = require('socket.io-client');
var serveStatic = require('serve-static');
var path = require('path');

var redis = require('../modules/redis_cluster');
var socket = io.connect('http://10.1.1.69:8000');

router.use(serveStatic(path.resolve(__dirname, '../public')));

router.post('/', function(req, res){
    redis.setNoti(req.body);
    socket.emit('set', {title: req.body.title, link: req.body.link});
    res.send(req.body.title);
});

module.exports = router;