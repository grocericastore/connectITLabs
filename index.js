// server.js
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const mailService = require('./services/mailService');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

app.post('/api/sendMail', function(req, res) {
    let msg = mailService.sendMail(req.body[0]);
    if (msg) {
        return res.json({
            status: 'success'
        });
    } else {
        res.status(500).send('Unable to send mail');
    }
});

app.get('*', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 3000);
console.log("Server started on port 3000");