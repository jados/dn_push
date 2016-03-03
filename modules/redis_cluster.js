var log4js = require('log4js');
log4js.configure('./config/log4js.json');
var log = log4js.getLogger("redis");

var config = require('../routes/config.js').redis;
var redis = require('ioredis');
var cluster = new redis.Cluster(config.cluster);

var getNoti = function(socket){
	cluster.exists(config.key_prefix + 'noti', function(err, res){
		//console.log('redis_cluster:', err,res);
    	if(res == 1){
    		cluster.hgetall(config.key_prefix + 'noti', function(err, res){
		        socket.emit('getData', {title: res.title, link: res.link});
		    });
    	}else{
    		socket.emit('getData', 	{title: 'not exists', link: 'http://null.com'});
    	}
    });
};

var setNoti = function(data){
    cluster.hmset(config.key_prefix + 'noti', data, function(err, res){
        if(err) log.warn(err);
        else log.info(data);
    });
};

module.exports = {
    getNoti: getNoti,
    setNoti: setNoti,
    redis: cluster
};