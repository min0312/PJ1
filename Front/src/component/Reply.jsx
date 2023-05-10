import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Reply() {
  const [data, setData] = useState(null);

  const { indexs } = useParams();

  const id = localStorage.getItem('user')

  useEffect(() => {
    axios.get(`http://localhost:4000/reply/${indexs}`)
      .then(res => {
        setData(res.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, [indexs]);

  return (
    <div>
      댓글
      {data && data.map((item) => (
        <div key={item.reply_Indexs} className="flex gap-3">
          <p>{item.board_indexs}</p>
          <p>{item.reply_Content}</p>
          <p>{item.comment_id}</p>
        </div>
      ))}
    </div>
  )
  
}