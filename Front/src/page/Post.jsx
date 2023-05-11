import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Reply from "../component/Reply";

export default function Post() {
  const [index, setIndex] = useState(null);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [user, setUser] = useState(null);

  const { indexs } = useParams();

  const id = localStorage.getItem('user')

  useEffect(() => {
    axios.get(`http://localhost:4000/post/${indexs}`)
      .then(res => {
        setIndex(res.data.Indexs)
        setTitle(res.data.Title)
        setContent(res.data.Content)
        setUser(res.data.user_Id)
      })
      .catch(error => {
        console.log(error);
      });
  }, [indexs]);

  const handleDelete = (index) => {
    console.log(index)
    axios.delete(`http://localhost:4000/post/${index}`)
      .then(res => {
        const { success } = res.data;
        if (success) { // 서버 응답이 성공일 때 페이지 이동
          window.location.href = '/Main'; // 페이지 이동
        } else {
          alert("로그인 실패")
          console.log("로그인 실패", res.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='pt-[6vh] h-[100vh]'>
      <div className="flex justify-between">
        게시판
        <Link to={`/Main`}>Back</Link>
      </div>
      <div className="bg-slate-300 flex justify-between">
          <div className="flex h-[60vh]">
            {title}
            {user}
            <br/>
            {content}
          </div>
          <div className="flex align-top">
          {id === user ? (
            <div className="flex align-top bg-slate-600">
              <Link to={`/Edit/${indexs}`}>수정</Link>
              <button onClick={() => handleDelete(index)}>삭제</button>
            </div>
            ) : (
              <div></div>
            ) }
        
      </div>
      </div>
      <div className="h-[24vh]">
        <Reply />
      </div>
    </div>
  )
  
}