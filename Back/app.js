const express = require('express');
const cors = require('cors');
const db = require('./DB');
const app = express();
const port = 4000;

app.use(cors());

app.get('/board', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM board');
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/post/:indexs', async (req, res) => {
  try {
    const indexs = req.params.indexs;
    const result = await db.query('SELECT * FROM board b, reply r WHERE b.Indexs = ?', [parseInt(indexs)]);
    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});