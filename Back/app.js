const express = require('express');
const cors = require('cors');
const db = require('./DB');
const mysql = require('mysql');

const app = express();
const port = 4000;

const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

app.use(cors());

app.use(session({secret : '비밀코드', resave : true, saveUninitialized : false}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', function(req, res) {
  res.render('login.ejs')
});

app.post('/login', passport.authenticate('local', {
  failureRedirect : '/fail'
}), function(req, res) {
  res.redirect('/main')
})

passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
}, function (id, pw, done) {
  const sql = `SELECT * FROM user WHERE Id = ?`;
  pool.query(sql, [id], 
    function (error, result) {
      if (error) return done(error);

      if (!result || result.length === 0) {
        return done(null, false, { message: '존재하지 않는 아이디입니다.' });
      }

      const user = result[0];
      if (pw == user.pw) {
        return done(null, user);
      } else {
        return done(null, false, { message: '비밀번호가 올바르지 않습니다.' });
      }
  });
}));

passport.serializeUser(function (user, done) {
  done(null, user.id)
});

passport.deserializeUser(function (id, done) {
  const sql = `SELECT * FROM login WHERE id = ?`;
  pool.query(sql, [id], function (error, result) {
    if (error) return done(error);

    if (!result || result.length === 0) {
      return done(null, false, { message: '존재하지 않는 사용자입니다.' });
    }

    const user = result[0];
    return done(null, user);
  });
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