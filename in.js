var app = require('express')();
var log4js = require('log4js');
var bodyParser = require('body-parser');

log4js.configure('config/log4js.json');
var logger = log4js.getLogger('app');

var routes = require('./routes/index');

app.set('port', process.env.PORT || 4000);
app.use(bodyParser.urlencoded({extended: true}));
app.use(log4js.connectLogger(log4js.getLogger("socket"), { level: 'auto' }));

app.use('/', routes);

app.listen(app.get('port'), function(){
  console.log('Server listening on port ' + app.get('port'));
});