import axios from "axios";
import { useState } from "react";

export default function Post({index}) {
  const [data, setData] = useState();


  axios.get(`http://localhost:4000/board/${index}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });

  return (
    <div>
      {{data}.title}
    </div>
  )
}