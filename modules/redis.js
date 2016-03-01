var redis = require('redis'),
    RDS_PORT = 6379,
    RDS_HOST = '127.0.0.1',
    RDS_PWD = 'mustang',
    RDS_OPTS = {no_ready_check: true},
    //RDS_OPTS = {auth: 'mustang', no_ready_check: true}, //{auth:RDS_PWD},
    client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);
//client.auth(RDS_PWD);

client.select(15);

function getNoti(socket){
    var noti = null;
    client.exists('noti', function(err, res){
    	if(res == 1){
    		client.hgetall('noti', function(err, res){
		        console.log(err);
		        socket.emit('getData', {title: res.title, link: res.link});
		    });
    	}else{
    		socket.emit('getData', 	{title: 'not exists', link: 'http://null.com'});
    	}
    });
}

function setNoti(data){
    console.log('setNoti',data);
    client.hmset('noti', data, function(err, res){
        if(err) console.log(err);
        else console.log(data);
    });
}

module.exports = {
    getNoti: getNoti,
    setNoti: setNoti,
    client: client
};
