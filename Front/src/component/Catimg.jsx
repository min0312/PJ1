import axios from "axios";
import React, { useEffect, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';

function Catimg() {
  const [data, setData] = useState([{id: "loading", url: "https://t1.daumcdn.net/cfile/tistory/184F8A4E4E55932B06"}]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get('https://api.thecatapi.com/v1/images/search')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setData(error);
      });
  }

  const handleRefresh = () => {
    getData();
  }

  return (
    <div>
      <div className="flex justify-between p-[1vw]">
        <h3>고양이가 조와용</h3>
        <button className="bg-slate-500 w-[3vw] flex justify-center place-items-center rounded-lg" onClick={handleRefresh}><FiRefreshCcw /></button>
      </div>
      <div className="flex justify-center pl-[1vw] pr-[1vw]">
        <img src={data[0].url} alt={data[0].id} className="h-[22vh]"/>
      </div>
    </div>
  );
}

export default Catimg;
