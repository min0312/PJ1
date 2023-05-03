import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function Board() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/board")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>Board Component</div>
      <table className='w-[30vw] border-collapse'>
        <thead>
          <tr>
            <th className='border-2 border-black'>제목</th>
            <th className='border-2 border-black'>작성자</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.Index} className='text-center'>
              <td className='border-2 border-black'><Link to={`/${item.Index}`} index={item.Index}>{item.Title}</Link></td>
              <td className='border-2 border-black'>{item.user_Id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}