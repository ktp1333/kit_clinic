var MongoClient = require('mongodb').MongoClient;
var moment = require('moment');
var mongoose = require('mongoose');
var async = require('async');
var dbpath = 'mongodb://localhost:27017/clinic';
exports.findlastHN = function (req, res) {

    MongoClient.connect(dbpath, (connectErr, db) => {
        var dbo = db;
        dbo.collection(req.body.mfile).find(
            {
                // name: req.body.name,
                // orguid: req.body.orguid,
            }).sort({ _id: -1 }).toArray((err, docs) => {
                console.log(docs);
                res.status(200).json({ data: docs });
                db.close();
            });
    });
}
exports.savedata2local = function (req, res) {
    if (req.body.newHN != undefined) {
        MongoClient.connect(dbpath, (connectErr, db) => {
            var dbo = db;
            var newdata = {};
            newdata.title = req.body.title;
            newdata.name = req.body.name;
            newdata.surname = req.body.surname;
            newdata.gender = req.body.gender;
            newdata.address = req.body.address;
            newdata.district = req.body.district;
            newdata.amphoe = req.body.amphoe;
            newdata.province = req.body.province;
            newdata.zipcode = req.body.zipcode;
            newdata.email = req.body.email;
            newdata.nationalID = req.body.nationalID;
            newdata.statusflag= "A";
            newdata.HN = req.body.newHN;
            dbo.collection(req.body.mfile).save(newdata, function (Innererr) {
                if (!Innererr) {
                    res.status(200).json({ data: newdata });

                } else {
                    res.status(500).json({ error: 'ERRORS.CREATEERROR' });
                }
            });



        })
    } else {

    }

}
exports.finddata = function (req, res) {

    MongoClient.connect(dbpath, (connectErr, db) => {
        var dbo = db;
        dbo.collection(req.body.mfile).find(
            {
                name: req.body.name,
                // orguid: req.body.orguid,
            }).toArray((err, docs) => {
                console.log(docs);
                res.status(200).json({ data: docs });
                db.close();
            });
    });
}
exports.savedata_user = function (req, res) {
    var mongoose = require('mongoose')
    MongoClient.connect(dbpath, (connectErr, db) => {
        if (req.body != null) {
            var dbo = db;
            dbo.collection(req.body.mfile).find(
                {
                    name: req.body.name,
                }).toArray((err, docs) => {
                    if (docs.length == 0) {
                        var newdata = {};
                        newdata.name = req.body.name;
                        newdata.password = req.body.password;
                        dbo.collection(req.body.mfile).save(newdata, function (Innererr) {
                            if (!Innererr) {
                                res.status(200).json({ data: 1 });
                            } else {
                                res.status(500).json({ error: 'ERRORS.CREATEERROR' });
                            }
                        });

                    } else {
                        res.status(200).json({ data: 0 });
                    }

                });
        } else {
            res.status(500).json({ error: 'ERRORS.CODEINUSE' });
        }
    });
}
exports.savedata_dr = function (req, res) {
    var mongoose = require('mongoose')
    MongoClient.connect(dbpath, (connectErr, db) => {
        if (req.body != null) {
            var dbo = db;
            dbo.collection(req.body.mfile).find(
                {
                    name: req.body.name,
                }).toArray((err, docs) => {
                    if (docs.length == 0) {
                        var newdata = {};
                        newdata.name = req.body.name;
                        newdata.password = req.body.password;
                        newdata.drid = req.body.drid;
                        dbo.collection(req.body.mfile).save(newdata, function (Innererr) {
                            if (!Innererr) {
                                res.status(200).json({ data: 1 });
                            } else {
                                res.status(500).json({ error: 'ERRORS.CREATEERROR' });
                            }
                        });

                    } else {
                        res.status(200).json({ data: 0 });
                    }

                });
        } else {
            res.status(500).json({ error: 'ERRORS.CODEINUSE' });
        }
    });
}
exports.search_existHN = function (req, res) {

    MongoClient.connect(dbpath, (connectErr, db) => {
        var dbo = db;
        dbo.collection(req.body.mfile).aggregate([{
            $match: {
                "statusflag": "A",
                "HN": req.body.hn,
                // orguid: req.body.orguid,
            }
        },]).toArray((err, docs) => {
            console.log(docs);
            res.status(200).json({
                data: docs
            });
            db.close();
        });
    });
}
