var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  path = require('path'),
  config = require('./config/config.js'),
  app = express();
global.rootPath = path.resolve(__dirname);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoose.connect(config.dbUrl);
var User = require('./app/models/user.server.model.js');
var Thumbnail = require('./app/models/thumbnail.server.model.js');
var port = process.env.PORT || 8080;

require('./app/routes/routes.server.routes.js')(app, express);

app.listen(8080);
console.log('Listening server on 8080');
