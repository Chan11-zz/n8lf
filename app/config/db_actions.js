'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _crypt = require('./crypt');

var _crypt2 = _interopRequireDefault(_crypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _jwt_config = require('./jwt_config');

var _jwt_config2 = _interopRequireDefault(_jwt_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleMongo = _db2.default.handleMongo;
exports.default = {

  insertUser: function insert(req, res) {
    var password = req.body.users.password;
    var id = _crypt2.default.generateHash(req.body.users.email);
    var email = req.body.users.email;
    handleMongo(_db2.default.findDoc, "users", { "email": email }).then(function (response) {
      if (response != null && response.email == email) {
        res.json({ email: "This email is already taken" });
      } else {
        handleMongo(_db2.default.insertDoc, "users", { "id": id, "email": email, "password": password }).then(function (response) {
          res.json({ status: "ok" });
        });
      }
    });
  },

  findUser: function findUser(req, res) {
    handleMongo(_db2.default.findDoc, "users", { "email": req.body.users.email }).then(function (usersResult) {
      if (usersResult !== null && usersResult["email"] == req.body.users.email && usersResult["password"] == req.body.users.password) {
        var tk = _jsonwebtoken2.default.sign({
          id: usersResult.id,
          username: usersResult["email"],
          isAuthenticated: true
        }, _jwt_config2.default);
        res.json({ status: "ok", config: tk });
      } else {
        res.json({ error: "Not a Valid Email/Password" });
      }
    });
  }
};