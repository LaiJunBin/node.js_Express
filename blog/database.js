const mysql = require('mysql');
const config = require('./config');

const database = mysql.createConnection(config);

database.connect();

module.exports = database;