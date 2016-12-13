'use strict';

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
        console.log("sjnfkejnrf", _url2.default.parse(mlab));

        if (err) {
            //console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', mlab);
            db = _db; //stores db instance of mongoclient in variable db
        }
    });
};

function insertDoc(doc, collection) {
    return new Promise(function (resolve, reject) {
        collection.insert(doc, function (err, res) {
            if (err) {
                console.log("error finding document");
                reject(err);
            } else {
                console.log("in insertDoc");
                resolve(res);
            }
        });
    });
}

function findDoc(doc, collection) {

    return new Promise(function (resolve, reject) {
        collection.findOne(doc, function (err, res) {
            if (err) {
                console.log("error finding document");
                reject(err);
            } else {
                console.log("in findDoc");
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
                console.log("error finding document");
                reject(err);
            } else {
                console.log("in updateDoc");
                console.log(res);
                resolve(res);
            }
        });
    });
}

function findDocToArray(doc, collection) {

    return new Promise(function (resolve, reject) {
        collection.find(doc).toArray(function (err, res) {
            if (err) {
                console.log("error finding document");
                reject(err);
            } else {
                console.log("in findDoc");
                console.log(res);
                resolve(res);
            }
        });
    });
}

function saveDoc(doc, collection) {

    return new Promise(function (resolve, reject) {
        collection.save(doc, function (err, res) {
            if (err) {
                console.log("error finding document");
                reject(err);
            } else {
                console.log("in findDoc");
                console.log(res);
                resolve(res);
            }
        });
    });
}

function deleteDoc(doc, collection) {
    return new Promise(function (resolve, reject) {
        collection.remove(doc, function (err, res) {
            if (err) {
                //console.log("error deleting document");
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
                //console.log("error deleting document");
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
            console.log("result from handleMongo");
            resolve(result);
        });
    });
};

var closeMongo = function closeMongo() {
    db.close();
    //console.log("Mongo Closed");
};
module.exports = {
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