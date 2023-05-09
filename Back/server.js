const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = 4000;

const session = require('express-session')
const bodyParser = require('body-parser');
const FileStore = require('session-file-store')(session)

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: '비밀번호486',	// 원하는 문자 입력
  resave: false,
  saveUninitialized: true,
  store:new FileStore(),
}))

app.post('/login', async (request, response) => {
  const username = request.body.id;
  const password = request.body.pw;
    if (username && password) {             // id와 pw가 입력되었는지 확인  
      const result = await db.query('SELECT * FROM user WHERE Id = ? AND Password = ?', [username, password])
        if (result.length > 0) {       // db에서의 반환값이 있으면 로그인 성공
          request.session.is_logined = true;      // 세션 정보 갱신
          request.session.nickname = username;
          request.session.save(function () {
            response.send({
              success: true,
              user: result[0].Id,
              grade: result[0].Grade
            });
          });
      } else {        
          response.send('불일치');    
      } 
    } else {
      response.send("미입력");   
    }
});





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