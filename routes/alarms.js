var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path");
var util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const ALARMS_JSON = path.join(__dirname, "../alarms.json");

// The id to use for the next item created
let nextId = require(ALARMS_JSON)
  .reduce((id, alarm) => Math.max(id, alarm.id), 1);

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// GET alarms
router.get('/', function(req, res) {
  res.sendFile(ALARMS_JSON);
});

// delete an alarm 
router.get("/delete/:id", async function(req, res) {
  let alarms = JSON.parse(await readFile(ALARMS_JSON, "utf8"));
  alarms = alarms.filter(alarm => alarm.id !== +req.params.id);
  await writeFile(ALARMS_JSON, JSON.stringify(alarms, null, 4));

  res.writeHead(200, {
    "Content-Type": "text/plain"
  });

  res.end("Ok");
});

// create a new alarm
router.get("/create", async function(req, res) {
  let alarms = JSON.parse(await readFile(ALARMS_JSON, "utf8"));

  alarms.push({
    id: nextId++,
    day: +req.query.day,
    seconds: +req.query.seconds
  });

  await writeFile(ALARMS_JSON, JSON.stringify(alarms, null, 4));

  res.writeHead(200, {
    "Content-Type": "text/plain"
  });

  res.end("Ok");
});

module.exports = router;
