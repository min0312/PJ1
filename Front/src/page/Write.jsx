import axios from 'axios';
import React, { useState } from 'react';

export default function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const user = localStorage.getItem('user');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/write', {
        title,
        content,
        user
      });
      alert('글이 등록되었습니다!');
      setTitle('');
      setContent('');
      window.location.href = '/Main';
    } catch (error) {
      console.error(error);
      alert('글 등록에 실패했습니다.');
    }
  };

  return (
    <div className='pt-[6vh] h-[100vh]'>
      <form onSubmit={handleSubmit} className='w-[100vw]'>
        <label>
          제목:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          작성자: {user}
        </label>
        <br />
        <label>
          내용:
          <br />
          <textarea className='w-[70vw]' value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <br />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

