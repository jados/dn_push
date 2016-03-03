var express = require('express');
var router = express.Router();
var io = require('socket.io-client');
var serveStatic = require('serve-static');
var path = require('path');

var config = require('../routes/config');
var redis = require('../modules/' + config.redis.type);
var socket = io.connect('http://' + config.get('proxy').host + ':' + config.get('proxy').port);

router.use(serveStatic(path.resolve(__dirname, '../public')));

router.post('/', function(req, res){
	/*var log4js = require('log4js');
	log4js.configure('config/log4js.json');
	var logger = log4js.getLogger('app');
	*/
    redis.setNoti(req.body);
    socket.emit('set', {title: req.body.title, link: req.body.link});
    res.send(req.body.title);
});

module.exports = router;