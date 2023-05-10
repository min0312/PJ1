import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Edit() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [user, setUser] = useState('');

  const { indexs } = useParams();
  console.log(indexs)

  useEffect(() => {
    axios.get(`http://localhost:4000/post/${indexs}`)
      .then(res => {
        setTitle(res.data.Title)
        setContent(res.data.Content)
        setUser(res.data.user_Id)
      })
      .catch(error => {
        console.log(error);
      });
  }, [indexs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/edit/${indexs}`, {
        title,
        content,
        indexs
      });
      alert('글이 수정되었습니다!');
      window.location.href = '/Main';
    } catch (error) {
      console.error(error);
      alert('글 수정에 실패했습니다.');
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
        <button type="submit">수정</button>
      </form>
    </div>
  );
}
