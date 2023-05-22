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
    <div className='pt-[6vh] h-[100vh] pl-[15vw] pr-[15vw]'>
      <div className="flex justify-between">
        <p className="text-lg">게시판</p>
        <Link to={`/Main`}>Back</Link>
      </div>
      <div className="h-[85vh] mt-[2vh] overflow-auto">
        <div className="mb-[1vh] border-2 p-[1vh] pb-[3vh]">
          <div className="flex justify-between pr-[20px]">
            <div className="flex justify-between w-[90%]">
              <p className="text-xl">{title}</p>
              <p className="">작성자: {user}</p>
            </div>
            <div className="flex align-top">
              {id === user ? (
                <div className="flex align-top gap-2">
                  <button className="border-2 h-[35px] w-[45px] rounded-md"><Link to={`/Edit/${indexs}`}>수정</Link></button>
                  <button className="border-2 h-[35px] w-[45px] rounded-md" onClick={() => handleDelete(index)}>삭제</button>
                </div>
                ) : (
                  <div></div>
                ) }
            </div>
          </div>
          <div className="p-[1vh]">
            {content}
          </div>
        </div>
        <Reply />
      </div>
    </div>
  )
  
}