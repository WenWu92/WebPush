/*站点*/
const mongoose = require('../connection');
var user = require('user');

const Schema = mongoose.Schema;
const siteSchema = new Schema({
    //站点名称
    name: String,
    //站点网址
    address: String,
    //push key
    key: String,
    //站长用户（关联到User）
    owner: {
        type: String,
        ref: 'User'
    },
    messages: [{
        type: Schema.Types.ObjectId, ref: 'Message'
    }]
});

module.exports = mongoose.model('Site', siteSchema);