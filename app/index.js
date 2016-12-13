'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _db = require('./config/db');

var _db2 = _interopRequireDefault(_db);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes.js');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_db2.default.connectMongo();

var app = (0, _express2.default)();
app.set('port', 9000);
app.use(_express2.default.static(_path2.default.join(__dirname, './build')));
app.use(_bodyParser2.default.json());

(0, _routes2.default)(app);

app.get('*', function (req, res) {
  console.log("sending");
  res.sendFile(_path2.default.join(__dirname, './build', 'index.html'));
});

/*
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
});
*/
app.listen(app.get('port'), function () {
  console.log("app running at " + app.get('port'));
});