const mysql = require('mysql');
const util = require('util');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    port:3306,
    database: 'node_js',
});
pool.query = util.promisify(pool.query);
module.exports = pool;