const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();  // .env 파일 로드

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

module.exports = {
  query: (sql, values) => {
    return new Promise((resolve, reject) => {
      pool.query(sql, values, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
};