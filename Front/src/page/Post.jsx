import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Reply from "../component/Reply";

export default function Post() {
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [user, setUser] = useState(null);

  const { indexs } = useParams();

  const id = localStorage.getItem('user')

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

  return (
    <div className='pt-[6vh] h-[100vh] flex'>
      <div className="w-[90vw]">
          <div className="flex h-[60vh]">
            {title}
            {user}
            <br/>
            {content}
          </div>
          <div className="h-[24vh]">
          <Reply />
        </div>
      </div>
      {id === user ? (
          <Link to={`/Edit/${indexs}`}>수정</Link>
          ) : (
            <div></div>
          ) }
      <Link to={`/Main`}>Back</Link>
    </div>
  )
  
}