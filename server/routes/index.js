var path = require("path");
var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

router.get('/', controllers.index);
router.post('/api/login', controllers.login);
router.post('/api/registration', controllers.registration);
router.post('/api/update', controllers.update);

module.exports = router;