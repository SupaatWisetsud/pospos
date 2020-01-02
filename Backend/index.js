"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const expressUpload = require('express-fileupload');
const cors = require('cors');
const mysql = require('mysql');
const { mkdirSync, existsSync } = require('fs');
const path = require('path');

existsSync(path.join(__dirname, '/image/product')) || mkdirSync(path.join(__dirname, '/image/product'));
existsSync(path.join(__dirname, '/image/user')) || mkdirSync(path.join(__dirname, '/image/user'));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_pospos"
});

db.connect(err => {
    if (err) console.log(err);
    else console.log("Connect databast success... !");
});

const app = express();

app.use(cors());
app.use(expressUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app, db);

app.use('/img', express.static('./Backend/image'));

app.listen(4000, console.log("Server is running..."));