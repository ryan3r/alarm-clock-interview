var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path");
var util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const ALARMS_JSON = path.join(__dirname, "../alarms.json");

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

/* GET alarms */
router.get('/', function(req, res) {
  res.sendFile(ALARMS_JSON);
});

router.get("/delete/:id", async function(req, res) {
  let alarms = JSON.parse(await readFile(ALARMS_JSON, "utf8"));
  alarms.splice(req.params.id, 1);
  await writeFile(ALARMS_JSON, JSON.stringify(alarms, null, 4));

  res.writeHead(200, {
    "Content-Type": "text/plain"
  });

  res.end("Ok");
});

module.exports = router;
