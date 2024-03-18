import express from 'express';
import mysql from 'mysql2';

const app = express();

const mysqlConfig = {
  host: 'mysql_server',
  user: 'dan',
  password: 'secret',
  database: 'test_db',
};

let con = null;

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world ! Whats up?');
});

app.get('/connect', function (req, res) {
  con = mysql.createConnection(mysqlConfig);
  con.connect(function (err) {
    if (err) res.send('Nor connected');
    res.send('connected');
  });
});

app.get('/create-table', function (req, res) {
  con.connect(function (err) {
    if (err) throw err;
    const sql = `
    CREATE TABLE IF NOT EXISTS numbers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      number INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )  ENGINE=INNODB;
  `;
    con.query(sql, function (err, result) {
      if (err) res.send('Error');
      res.send('numbers table created');
    });
  });
});

app.get('/insert', function (req, res) {
  const number = Math.round(Math.random() * 100);
  con.connect(function (err) {
    if (err) throw err;
    const sql = `INSERT INTO numbers (number) VALUES (${number})`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(`${number} inserted into table`);
    });
  });
});

app.get('/fetch', function (req, res) {
  con.connect(function (err) {
    if (err) throw err;
    const sql = `SELECT * FROM numbers`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(JSON.stringify(result));
    });
  });
});

app.listen(5555);

console.log('listening on port 5555');
