const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const SECRET_KEY = '비밀번호486';
const { verifyToken, verifyJWTToken } = require('./verify');

app.use(cors({
  origin: 'http://localhost:3000', // 클라이언트 도메인 주소
  methods: ['GET', 'POST', 'PUT'], // 허용할 http 메소드
  credentials: true // 쿠키를 전송할 수 있도록 설정
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
  const username = req.body.id;
  const password = req.body.pw;
    if (username && password) {             // id와 pw가 입력되었는지 확인  
      const result = await db.query('SELECT * FROM user WHERE Id = ? AND Password = ?', [username, password])
        if (result.length > 0) {       // db에서의 반환값이 있으면 로그인 성공
          //jwt.sign(payload, secretOrPrivateKey, [options, callback])
          token = jwt.sign({
            type: 'JWT',
            nickname: result[0].Id,
            grade: result[0].Grade
          }, SECRET_KEY, {
            expiresIn: '1h', // 만료시간
          });
          res.send({
            success: true,
            user: result[0].Id,
            grade: result[0].Grade,
            token: token
          });
      } else {        
        res.send('불일치');    
      } 
    } else {
      res.send("미입력");   
    }
});

app.post('/register', async (req, res) => {    
  const username = req.body.id;
  const password = req.body.pw;    
  const password2 = req.body.pw2;

  if (username && password && password2) {
    const result = await db.query('SELECT * FROM user WHERE Id = ?', [username]) // DB에 같은 이름의 회원아이디가 있는지 확인
    if (result.length <= 0 && password == password2) {     // DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우 
      const results = await db.query('INSERT INTO user (Id, Password) VALUES(?,?)', [username, password]);
      if (results.affectedRows === 1) {
        res.send({success: true});
      } else {
        res.send({success: false, message: '가입 실패'});
      }
    } else if (password != password2) {                     // 비밀번호가 올바르게 입력되지 않은 경우
      res.send({success: false, message: '비밀번호 불일치'});    
    }
    else {                                                  // DB에 같은 이름의 회원아이디가 있는 경우
      res.send({success: false, message: '존재하는 아이디'});    
    }            
  } else {        // 입력되지 않은 정보가 있는 경우
    res.send({success: false, message: '입력되지 않은 정보'});
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

app.post('/write', async (req, res) => {
  const { title, content, user } = req.body;
  if (!title || !content) {
    res.status(400).send('제목과 내용을 입력해주세요.');
    return;
  }

  try {
    const results = await db.query('INSERT INTO board (Title, Content, user_Id) VALUES (?, ?, ?)', [title, content, user]);
    res.send('글이 등록되었습니다.');
  } catch (error) {
    console.error(error);
    res.status(500).send('글 등록에 실패했습니다.');
  }
});

app.put('/edit/:indexs', async (req, res) => {
  const { title, content, indexs } = req.body;

  try {
    const result = await db.query(`UPDATE board SET Title = ?, Content = ? WHERE Indexs = ?`, [title, content, indexs]);
    res.json({ success: true, message: '글이 수정되었습니다.' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: '글 수정에 실패했습니다.' });
  }
});



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});