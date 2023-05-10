import axios from "axios";
import { useState } from "react";

export default function Join() {

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePwChange = (e) => {
    setPw(e.target.value);
  };

  const handlePw2Change = (e) => {
    setPw2(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본적인 폼 제출 동작을 막음
  
    // id와 pw를 서버에 전송하는 코드
    axios.post('http://localhost:4000/register', { id: id, pw: pw, pw2: pw2}, {
      withCredentials: true, // `withCredentials` 옵션을 `true`로 설정합니다.)
      }).then(res => {
        const { success, message } = res.data;
        if (success) { // 서버 응답이 성공일 때 페이지 이동
          alert("가입 성공")
          console.log("가입 성공", res.data);
          window.location.href = '/Login'; // 페이지 이동
        } else {
          alert(`가입 실패: ${message}`)
          console.log("가입 실패", res.data);
        }
      })
      .catch(error => {
        console.error('Error occurred during join:', error);
      });
  };

  return (
    <div className='pt-[6vh] h-[100vh]'>
      <h2>Join</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" name="id" value={id} onChange={handleIdChange} />
        </div>
        <div>
          <label htmlFor="pw">Password:</label>
          <input type="password" id="pw" name="pw" value={pw} onChange={handlePwChange} />
        </div>
        <div>
          <label htmlFor="pw2">Password Again:</label>
          <input type="password" id="pw2" name="pw2" value={pw2} onChange={handlePw2Change} />
        </div>
        <button type="submit">Join</button>
      </form>
    </div>
  )
}