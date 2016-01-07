'use strict';

const session = require('express-session');

const User = require('../models/user');
const pass = require('../utils/pass');
const resPattern = require('../utils/reponsePattern');

exports.list = function (req, res) {
    User.find({}, {name: 1, age: 1, sex: 1}, function (err, users) {
        if (err) {
            console.error(err);
            return err;
        }
        //res.send(users);
        res.send(resPattern.success(users));
    });
};

exports.detail = function (req, res) {
    res.send('I AM USER ' + req.params.id);
}

exports.create = function (req, res) {
    //var user = new User({name: 'asdf', password: '123', age: 10, sex: true});
    var user = req.body;
    User.find({name: user.name}).exec(function (err, users) {
        if (users.length > 0) {
            res.send(resPattern.error('user already exist'));
        } else {
            pass.hash(user.password, function (err, salt, hash) {
                if (err) throw err;
                // store the salt & hash in the "db"
                user.salt = salt;
                user.hash = hash;
                delete user.password;
                (new User(user)).save(function (err) {
                    if (err)
                        return handleError(err);
                    else
                        res.send(resPattern.success());
                });
            });
        }
    });
};

//登陆
exports.login = function (req, res) {
    var username = req.param('username');
    var password = req.param('password');

    authenticate(username, password, function (err, user) {
        if (user) {
            req.session.regenerate(function () {
                user.salt = undefined;
                user.hash = undefined;
                req.session.user = user;
                res.send(resPattern.success(user));
            });
        } else {
            //throw err;
            res.send(resPattern.error('invalid password'));
        }
    });
}

function authenticate(username, password, fn) {
    User.find({name: username}).exec(function (err, users) {
        var user = users[0];
        // query the db for the given username
        if (!user)
            return fn(new Error('cannot find user'));
        // apply the same algorithm to the POSTed password, applying
        // the hash against the pass / salt, if there is a match we
        // found the user
        pass.hash(password, user.salt, function (err, hash) {
            if (err)
                return fn(err);
            if (hash == user.hash)
                return fn(null, user);
            fn(new Error('invalid password'));
        });
    });
}