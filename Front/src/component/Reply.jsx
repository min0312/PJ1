import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReplyEdit from "./ReplyEdit";
import ReplyWrite from "./ReplyWrite";

export default function Reply() {
  const [data, setData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  const { indexs } = useParams();

  const token = localStorage.getItem('token')
  const id = localStorage.getItem('user')

  useEffect(() => {
    axios.get(`http://localhost:4000/reply/${indexs}`)
      .then(res => {
        setData(res.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, [indexs, data]);
  

  const handleEdit = (item) => {
    setEditData(item);
    setShowEdit(true);
  }

  const handleEditSubmit = () => {
    axios.get(`http://localhost:4000/reply/${indexs}`)
      .then(res => {
        setData(res.data)
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleDelete = (replyIndex) => {
    axios.delete(`http://localhost:4000/reply/${replyIndex}`)
      .then(res => {
        setData(prevData => prevData.filter(item => item.reply_Indexs !== replyIndex));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleWrite = (newData) => {
    setData((prevData) => [newData, ...prevData]);
  };

  return (
    <div>
      댓글
      <div className="h-[15vh] overflow-auto">
        {data && data.map((item, index) => (
          <div key={index}>
            <div className="flex gap-3">
              <p>{item.reply_Content}</p>
              <p>{item.comment_id}</p>
              {id === item.comment_id ? (
                <>
                  <button onClick={() => handleEdit(item)}>수정</button>
                  <button onClick={() => handleDelete(item.reply_Indexs)}>삭제</button>
                </>
              ) : null}
            </div>
            {showEdit && editData.reply_Indexs === item.reply_Indexs && (
              <ReplyEdit
                data={editData}
                replyIndex={editData.reply_Indexs}
                boardindexs={editData.board_indexs}
                onSubmit={() => {
                  setShowEdit(false);
                  handleEditSubmit();
                  setData(null);
                }} 
                onCancel={() => setShowEdit(false)}
              />
            )}
          </div>
        ))}
      </div>
      댓글쓰기
      {token ? 
      <ReplyWrite 
        boardIndex={indexs} 
        onWrite={handleWrite} 
        onSubmit={() => {;
          handleEditSubmit();
          setData(null);
        }}/>
      : <div>로그인 필요</div>}
      
    </div>
  );
}
