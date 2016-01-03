/*mongoose connection*/
const mongoose = require('mongoose');
var config = require('./config');
connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);

function listen() {
    console.log('connection opened!');
}

function connect() {
    var options = config.db_option;
    return mongoose.connect(config.db, options).connection;
}

module.exports = mongoose;