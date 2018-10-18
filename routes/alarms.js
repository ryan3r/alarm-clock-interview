var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path");

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

/* GET alarms */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, "../alarms.json"));
});

module.exports = router;
