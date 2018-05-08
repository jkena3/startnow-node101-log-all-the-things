const express = require('express');
const fs = require('fs');
const app = express();
var dataLog =[];

app.use((req, res, next) => {
    //write your logging code here
    let agent = req.headers['user-agent'].replace(',', '') + ',';
    let time = new Date().toISOString() + ',';
    let method = req.method + ',';
    let resource = req.path + ',';
    let version = 'HTTP/' + req.httpVersion + ',';
    let status = 200 + '/n'; // req.statusCode + '/n'
    let csvLog = (agent + time + method + resource + version + status);

    var data = {
        'Agent': req.headers['user-agent'].replace(',', ''),
        'Time': new Date().toISOString(),
        'Method': req.method,
        'Resource': req.path,
        'Version': 'HTTP/' + req.httpVersion,
        'Status': 200
    }

    dataLog.push(data);

    //console.log(csvLog);

    fs.appendFile('log.csv', csvLog, function (err) {
        if (err) throw err;

    });
    console.log(csvLog);
    next();
});

app.get('/', (req, res) => {
    // write your code to respond "ok" here
    res.sendStatus(200);

});

app.get('/logs', (req, res) => {
    // write your code to return a json object containing the log data here
    res.json(dataLog);

});

module.exports = app;
