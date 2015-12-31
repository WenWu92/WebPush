'use strict';

const mongoose = require('mongoose');
const User = require('../models/user');

exports.list = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.error(err);
            return err;
        }
        res.send(users);
    });
};

exports.detail = function (req, res) {
    res.send('I AM USER ' + req.params.id);
}

exports.save = function (req, res, next) {
    //var ObjWillBeSaved =
    //console.log(req);
    next();
};