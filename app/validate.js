'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db_actions = require('./config/db_actions');

var _db_actions2 = _interopRequireDefault(_db_actions);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _jwt_config = require('./config/jwt_config');

var _jwt_config2 = _interopRequireDefault(_jwt_config);

var _db = require('./config/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    validateSignUp: function validateSignUp(req, res, next) {
        var errors = {},
            bool = 0;

        if (isBlank(req.body.users.email)) {
            errors.email = "Only real emails are accepted";
            bool = 1;
        }

        console.log(req.body.users.email);
        if (!validateEmail(req.body.users.email)) {
            errors.email = "This email is not valid email";
            bool = 1;
        }

        if (isBlank(req.body.users.password)) {
            errors.password = "Not a valid password";
            bool = 1;
        }
        bool ? res.json(errors) : next();
    },

    validateLogin: function validateLogin(req, res, next) {
        var errors = {},
            bool = 0;
        if (isBlank(req.body.users.email)) {
            errors.email = "This email is not valid or already in use";
            bool = 1;
        }
        if (isBlank(req.body.users.password)) {
            errors.password = "Not a valid password";
            bool = 1;
        }
        bool ? res.json(errors) : next();
    },

    validateRequest: function validateRequest(req, res, next) {
        console.log("in validateRequest", req.headers.authorization);
        var token = req.headers.authorization.split(' ')[1];

        var decoded = _jsonwebtoken2.default.verify(token, _jwt_config2.default);
        console.log("in validateRequest", decoded.id);
        if (!decoded) res.json({ error: "not authorized" });
        _db2.default.handleMongo(_db2.default.findDoc, "users", { "id": decoded.id }).then(function (usersResult) {
            //console.log("checking headers1",usersRes)
            console.log("checking headers", usersResult["email"], decoded.username, "-", usersResult["id"], decoded.id);
            console.log("checking headers", usersResult["email"] == decoded.username && usersResult["id"] == decoded.id);
            if (!usersResult) res.json({ error: "not authorized" });
            if (usersResult["email"] == decoded.username && usersResult["id"] == decoded.id) res.json({ error: false });
        });

        //next();
        //return authFail(res);
        /*  if(!decoded || decoded.auth !== 'magic') {
            return authFail(res);
          } */ //else {
        //  return privado(res, token);
        //  }
    }

};


function isBlank(str) {
    return !str || /^\s*$/.test(str);
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}