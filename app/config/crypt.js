'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userPassword = null;
exports.default = {
    generateHash: function generateHash(password) {
        return _bcryptNodejs2.default.hashSync(password, _bcryptNodejs2.default.genSaltSync(8), null);
    },
    validPassword: function validPassword(password, a) {
        console.log(password, a);
        return _bcryptNodejs2.default.compareSync(password, a);
    },
    setPassword: function setPassword(password) {
        userPassword = password;
    },
    getPassword: function getPassword(password) {
        return userPassword;
    }
};