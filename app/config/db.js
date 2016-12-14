'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoClient = _mongodb2.default.MongoClient;
var db = null;
var mlab = process.env.MONGOLAB_URI;

var connectMongo = function connectMongo() {
    MongoClient.connect(mlab, function (err, _db) {
        if (err) {
            //console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            db = _db; //stores db instance of mongoclient in variable db
        }
    });
};

function insertDoc(doc, collection) {
    return new Promise(function (resolve, reject) {
        collection.insert(doc, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

function findDoc(doc, collection) {

    return new Promise(function (resolve, reject) {
        collection.findOne(doc, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

function updateDoc(doc1, doc2, doc3, collectionString) {
    var dbCollection = db.collection(collectionString);
    return new Promise(function (resolve, reject) {
        dbCollection.update(doc1, doc2, doc3, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

function findDocToArray(doc, collection) {

    return new Promise(function (resolve, reject) {
        collection.find(doc).toArray(function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

function saveDoc(doc, collection) {

    return new Promise(function (resolve, reject) {
        collection.save(doc, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

function deleteDoc(doc, collection) {
    return new Promise(function (resolve, reject) {
        collection.remove(doc, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

function findAndModify(doc, collection) {
    return new Promise(function (resolve, reject) {
        collection.findAndModify(doc, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

var handleMongo = function handleMongo(work, appCollection, doc) {
    //root function which handles db operations

    return new Promise(function (resolve, result) {

        var collection = db.collection(appCollection);

        work(doc, collection, db).then(function (result) {
            resolve(result);
        });
    });
};

var closeMongo = function closeMongo() {
    db.close();
};
exports.default = {
    connectMongo: connectMongo,
    insertDoc: insertDoc,
    deleteDoc: deleteDoc,
    findDoc: findDoc,
    handleMongo: handleMongo,
    closeMongo: closeMongo,
    findDocToArray: findDocToArray,
    updateDoc: updateDoc,
    saveDoc: saveDoc,
    findAndModify: findAndModify
};
