import axios from 'axios';
import React, { useState } from 'react';
import Join from './Join';

export default function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePwChange = (e) => {
    setPw(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본적인 폼 제출 동작을 막음

    // id와 pw를 서버에 전송하는 코드
    axios.post('http://localhost:4000/login', { id: id, pw: pw }, {
      withCredentials: true, // `withCredentials` 옵션을 `true`로 설정합니다.
    })
      .then(res => {
        const { success, token, user, grade } = res.data;
        if (success) { // 서버 응답이 성공일 때 페이지 이동
          localStorage.setItem('token', token);
          localStorage.setItem('user', user);
          localStorage.setItem('grade', grade);
          console.log("로그인 성공", res.data);
          window.location.href = '/Main'; // 페이지 이동
        } else {
          alert("로그인 실패")
          console.log("로그인 실패", res.data);
        }
      })
      .catch(error => {
        console.error('Error occurred during login:', error);
      });
  };

  return (
    <div className='pt-[6vh] h-[100vh]'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" name="id" value={id} onChange={handleIdChange} />
        </div>
        <div>
          <label htmlFor="pw">Password:</label>
          <input type="password" id="pw" name="pw" value={pw} onChange={handlePwChange} />
        </div>
        <button type="submit">Login</button>
      </form>
      <Join />
    </div>
  );
}
