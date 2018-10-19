var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path");
var util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const ALARMS_JSON = path.join(__dirname, "../alarms.json");

// hack to allow the app to run from the react dev server (disabled in production)
if(process.env.NODE_ENV !== "production") {
  router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });
}

// GET alarms
router.get('/', function(req, res) {
  res.sendFile(ALARMS_JSON);
});

// delete an alarm 
router.get("/delete/:id", async function(req, res) {
  let data = JSON.parse(await readFile(ALARMS_JSON, "utf8"));

  data.alarms = data.alarms.filter(alarm => alarm.id !== +req.params.id);

  await writeFile(ALARMS_JSON, JSON.stringify(data, null, 4));

  res.writeHead(200, {
    "Content-Type": "text/plain"
  });

  res.end("Ok");
});

// create a new alarm
router.get("/create", async function(req, res) {
  let data = JSON.parse(await readFile(ALARMS_JSON, "utf8"));

  data.alarms.push({
    id: data.nextId++,
    day: +req.query.day,
    seconds: +req.query.seconds
  });

  await writeFile(ALARMS_JSON, JSON.stringify(data, null, 4));

  res.writeHead(200, {
    "Content-Type": "text/plain"
  });

  res.end("Ok");
});

module.exports = router;
