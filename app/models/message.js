/*推送消息体*/
const mongoose = require('../connection');
var user = require('Site');

const Schema = mongoose.Schema;
const siteSchema = new Schema({
    //标题
    title: String,
    //正文
    content: String,
    //图片地址
    imgSrc: String,
    //点击后跳转地址
    sourceUrl: String,
    //所属站点（关联到Site）
    site: {
        type: String,
        ref: 'Site'
    }
});

module.exports = mongoose.model('Message', siteSchema);