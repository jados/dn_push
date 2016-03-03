var argv = require('minimist')(process.argv.slice(2));
var app = require('express')();
var log4js = require('log4js');
var bodyParser = require('body-parser');

log4js.configure('config/log4js.json');
var logger = log4js.getLogger('app');

var config = require('./routes/config').get('receiver');
var routes = require('./routes/index');

if(argv.p === undefined){
	argv.p = config.port;
}

app.set('host', config.host);
app.set('port', Number(argv.p));
app.set('env', config.env);
app.use(bodyParser.urlencoded({extended: true}));
app.use(log4js.connectLogger(log4js.getLogger("socket"), { level: 'auto' }));

app.use('/', routes);

app.listen(app.get('port'), app.get('host'), function(){
  console.log('Server listening on port ' + app.get('port'));
});