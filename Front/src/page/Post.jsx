import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Post() {
  const [data, setData] = useState(null);
  const { indexs } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:4000/post/${indexs}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [indexs]);

  return (
    <div className='pt-[6vh] h-[100vh] flex'>
      <div className="w-[95vw]">
        {data && (
          <>
            <div className="h-[70vh]">
              <div className="flex">
                {data.Title}
                {data.user_Id}
              </div>
              <div>
                {data.Content}
              </div>
            </div>
            <div className="h-[24vh]">
              {data.reply_index}
              {data.reply_Content}
              {data.comment_id}
            </div>
          </>
        )}
      </div>
      <Link to={`/Main`}>Back</Link>
    </div>
  )
  
}