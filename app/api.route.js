var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var moment = require('moment');
var mongoose = require('mongoose');
var async = require('async');
var md5 = require('md5');
var dbpath = require('../config/db').dbpath;
exports.find_site = function (req, res) {
    MongoClient.connect(dbpath, (connectErr, db) => {
        var dbo = db;
        dbo.collection("organisations").aggregate([
            {
                "$match": {
                    "_id": mongoose.Types.ObjectId(req.body.orguid),
                    "statusflag": "A",
                }
            },
        ]).toArray((err, docs) => {
            console.log(docs);
            res.status(200).json({ data: docs });
            db.close();
        });
    });
}
exports.gettitle = function (req, res) {

    MongoClient.connect(dbpath, (connectErr, db) => {
        var dbo = db;
        dbo.collection("referencevalues").aggregate([
            {
                "$match": {
                    "orguid": mongoose.Types.ObjectId(req.body.orguid),
                    "statusflag": "A",
                    "domaincode" : 'TITLE',
                }
            },
           
            {
                "$project": {
                    "_id": 0,
                    "code": "$valuecode",
                    "valuedescription": 1,
                    // "domaincode" : 1,
                    "statusflag" : 1,

                }
            },
            {
                "$sort": {
                    "valuedescription": 1.0
                }
            }
        ]).toArray((err, docs) => {
            console.log(docs);
            res.status(200).json({ data: docs });
            db.close();
        });
    });
}
exports.getzipcode = function (req, res) {

    MongoClient.connect(dbpath, (connectErr, db) => {
        var dbo = db;
        dbo.collection("areas").aggregate([
            {
                "$match": {
                    // "orguid": mongoose.Types.ObjectId(req.body.orguid),
                    "statusflag": "A",
                }
            },
           
            {
                "$project": {
                    "_id": 0,
                    "code": 1,
                    "name": 1,
                    "locallangname" : 1,
                    "country" : 1,
                }
            },
            {
                "$sort": {
                    "name": 1.0
                }
            }
        ]).toArray((err, docs) => {
            console.log(docs);
            res.status(200).json({ data: docs });
            db.close();
        });
    });
}
exports.login = function (req, res) {
    var password = md5(req.body.password);
    MongoClient.connect(dbpath, (connectErr, db) => {
        var dbo = db;
        dbo.collection("users").aggregate([{
            $match: {
                "statusflag": "A",
                "activeto": null,
                "loginid": req.body.loginid,
                "password": password,
            }
        }, ]).toArray((err, docs) => {
            console.log(docs);
            res.status(200).json({
                users: docs
            });
            db.close();
        });
    });
}
