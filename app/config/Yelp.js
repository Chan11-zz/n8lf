"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodeYelpFusion = require("node-yelp-fusion");

var _nodeYelpFusion2 = _interopRequireDefault(_nodeYelpFusion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var key = process.env.YELP_KEY;
var secret = process.env.YELP_SECRET;
var yelp = new _nodeYelpFusion2.default({ id: key, secret: secret });

exports.default = function (term) {
    return new Promise(function (resolve, reject) {
        console.log("in Yelp:", term);
        yelp.search("term=Bar&location=" + term).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
};