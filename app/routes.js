'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (app) {

    app.post('/signup', _validate2.default.validateSignUp, function (req, res) {
        _db_actions2.default.insertUser(req, res);
    });

    app.post('/login', _validate2.default.validateLogin, function (req, res) {
        _db_actions2.default.findUser(req, res);
    });

    app.post('/search', function (req, res) {
        console.log("got search", req.body.search);
        (0, _Yelp2.default)(req.body.search).then(function (result) {
            res.json(result);
        });
    });

    app.post('/eventsAdd', _validate2.default.validateRequest, function (req, res) {
        console.log(_typeof(req.body.events));
        var events = req.body.events.split(',');
        console.log(events);
        _db2.default.handleMongo(_db2.default.insertDoc, "events", { id: events[0], name: events[1], store_id: events[2], city: events[3].toLowerCase() });
        res.status('200').send();
    });

    app.post('/eventsUndo', function (req, res) {
        console.log("events undo", req.body.events);
        var events = req.body.events.split(',');
        _db2.default.handleMongo(_db2.default.deleteDoc, "events", { id: events[0], name: events[1] });
        res.status('200').send();
    });

    app.post('/getEvents', function (req, res) {
        console.log(req.body.search);
        _db2.default.handleMongo(_db2.default.findDocToArray, "events", { city: req.body.search }).then(function (result) {
            console.log(result);
            res.json(result);
        });
    });
};

var _db = require('./config/db');

var _db2 = _interopRequireDefault(_db);

var _db_actions = require('./config/db_actions');

var _db_actions2 = _interopRequireDefault(_db_actions);

var _validate = require('./validate');

var _validate2 = _interopRequireDefault(_validate);

var _Yelp = require('./config/Yelp');

var _Yelp2 = _interopRequireDefault(_Yelp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }