'use strict';
const mysql = require('mysql');
const util = require('util');

const config = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'invoiceplus'
};

const pool = mysql.createPool(config);

pool.query = util.promisify(pool.query)

module.exports = pool;
