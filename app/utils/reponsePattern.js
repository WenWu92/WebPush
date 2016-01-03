module.exports.success = function (msg, data) {
    var _msg,_data;
    if (data === undefined) {
        _msg = typeof(msg) === 'string' ? msg : 'success';
        _data = typeof(msg) === 'object' ? msg : {};
    }
    return {
        code: 0,
        msg: _msg,
        data: _data
    }
}

module.exports.restrict = function () {
    return {
        code: 1,
        msg: 'access denied'
    }
}

module.exports.error = function (msg) {
    return {
        code: 2,
        msg: msg
    }
}