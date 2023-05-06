import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePwChange = (e) => {
    setPw(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login 함수가 어디서 왔는지 알 수 없습니다.
    setRedirectToReferrer(true);
  };

  const { from } = window.location.state || { from: { pathname: '/' } };

  if (redirectToReferrer === true) {
    return <Navigate to={from} />;
  }

  return (
    <div>
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
    </div>
  );
}
