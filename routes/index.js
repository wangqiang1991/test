var express = require('express');
var router = express.Router();
var ReactDAO=require("../dao/ReactDAO.js");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
