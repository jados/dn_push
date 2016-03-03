var argv = require('minimist')(process.argv.slice(2));
var app = require('express')();
var log4js = require('log4js');

log4js.configure('config/log4js.json');
var logger = log4js.getLogger('app');
var config = require('./routes/config');
var routes = require('./routes/index');

if(argv.p === undefined){
	//console.log('Error: Please specify a port.');
	//process.exit();
	argv.p = config.get('server').port;
}

app.set('host', config.get('server').host);
app.set('port', Number(argv.p));
//app.set('port', 3000);
app.set('env', config.env);
app.use(log4js.connectLogger(log4js.getLogger("app"), { level: 'auto' }));

app.use('/', routes);

var server = app.listen(app.get('port'), app.get('host'), function(){
  logger.info('Server listening on port ' + app.get('port') + ' with process ' + process.pid);
});

var io = require('socket.io')(server);
var redis = require('./modules/' + config.redis.type);

io.on('connection', function(socket){
    logger.info('socketio connected with process id: ' + process.pid);

    redis.getNoti(socket);

    socket.on('set', function(data){
        console.log('set_msg', JSON.stringify(data));
        socket.broadcast.emit('getData', data);
    });
});

module.exports = app;