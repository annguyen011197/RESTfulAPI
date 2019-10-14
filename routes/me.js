var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log(req)
    res.send(req.user);
});

module.exports = router;