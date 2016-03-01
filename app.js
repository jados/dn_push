var argv = require('minimist')(process.argv.slice(2));
var app = require('express')();
var log4js = require('log4js');

log4js.configure('config/log4js.json');
var logger = log4js.getLogger('app');
var routes = require('./routes/index');

if(argv.p === undefined){
	console.log('Error: Please specify a port.');
	process.exit();
}

app.set('port', Number(argv.p));
//app.set('port', 3000);
app.set('env', 'devel');
app.use(log4js.connectLogger(log4js.getLogger("app"), { level: 'auto' }));

app.use('/', routes);
logger.info('Process ID: ' + process.pid);

var server = app.listen(app.get('port'), function(){
  logger.info('Server listening on port ' + app.get('port') + ' with process ' + process.pid);
});

var io = require('socket.io')(server);
var redis = require('./modules/redis_cluster');

io.on('connection', function(socket){
    console.log('socketio connected');

    redis.getNoti(socket);

    socket.on('set', function(data){
        console.log('set_msg', JSON.stringify(data));
        socket.broadcast.emit('getData', data);
    });
});

module.exports = app;