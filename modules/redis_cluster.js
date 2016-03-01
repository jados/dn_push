var log4js = require('log4js');
log4js.configure('./config/log4js.json');
var log = log4js.getLogger("redis");

var redis = require('ioredis');
var cluster = new redis.Cluster([{
  port: 6380,
  host: '10.1.1.128'
}, {
  port: 6381,
  host: '10.1.1.128'
}, {
  port: 6382,
  host: '10.1.1.128'
}, {
  port: 6380,
  host: '10.1.1.148'
}, {
  port: 6381,
  host: '10.1.1.148'
}, {
  port: 6382,
  host: '10.1.1.148'
}]);

var getNoti = function(socket){
	cluster.exists('hummingbird/dn/push/noti', function(err, res){
		//console.log('redis_cluster:', err,res);
    	if(res == 1){
    		cluster.hgetall('hummingbird/dn/push/noti', function(err, res){
		        socket.emit('getData', {title: res.title, link: res.link});
		    });
    	}else{
    		socket.emit('getData', 	{title: 'not exists', link: 'http://null.com'});
    	}
    });
};

var setNoti = function(data){
    cluster.hmset('hummingbird/dn/push/noti', data, function(err, res){
        if(err) log.warn(err);
        else log.info(data);
    });
};

module.exports = {
    getNoti: getNoti,
    setNoti: setNoti,
    redis: cluster
};