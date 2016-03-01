var fork = require('child_process').fork();




/*
var log4js = require('log4js');
log4js.configure('./config/log4js.json');
var log = log4js.getLogger("startup");

var cluster = require('express-cluster');
var cCPUs = require('os').cpus().length;
var clusterConfig = {
	count: require('os').cpus().length,
	respawn: true,
	verbose: false,
	workerListener: function(msg){
		log.info('master with pid', process.pid, 'received', msg, 'from worker');
		this.send('master acked your message');
	}
};

cluster(function() {
  var app = require('../app');
}, clusterConfig);
*/