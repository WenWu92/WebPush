'use strict';

const session = require('express-session');

//const User = require('../models/user');
const Site = require('../models/site');
const resPattern = require('../utils/reponsePattern');

exports.list = function (req, res) {
    Site.find({}, {name: 1, address: 1, key: 1}, function (err, sites) {
        if (err) {
            console.error(err);
            return err;
        }
        res.send(resPattern.success(sites));
    });
};

exports.create = function (req, res) {
    var site = req.body;
    Site.find({name: site.address}).exec(function (err, sites) {
        if (sites.length > 0) {
            res.send(resPattern.error('该域名已存在！'));
        } else {
            (new Site(site)).save(function (err) {
                if (err) {
                    return handleError(err);
                } else {
                    res.send(resPattern.success());
                }
            });
        }
    });
};