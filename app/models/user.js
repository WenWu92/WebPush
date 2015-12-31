const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    age: {
        type: Number,
        default: 0
    },
    sex: {
        type: Boolean,
        default: true
    }
});

var userModel = mongoose.model('user', userSchema);

module.exports = userModel;