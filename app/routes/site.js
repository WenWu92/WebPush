const express = require('express');
const user = require('../controllers/site');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/list', user.list);
//router.get('/detail/:id', user.detail);
router.post('/create', user.create);

module.exports = router;
