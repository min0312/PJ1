import React from 'react';
import { Link } from 'react-router-dom';
import Board from '../component/Board';
import Catimg from '../component/Catimg';

export default function Main() {

  const grade = localStorage.getItem('grade')

  return (
    <div className='flex pt-[6vh]'>
      <div className='w-[65vw]'>
        <div className='pl-[2vw] pr-[2vw] flex justify-between'>
          <h1>Board</h1>
          {grade === "Admin" ? (
          <Link to={`/Write`}>글쓰기</Link>
          ) : (
            <div></div>
          ) }
        </div>
        <Board />
      </div>
      <div className='w-[35vw] h-[94vh] bg-slate-100'>
        <div className='h-[28vh]'>
          <Catimg />
        </div>
        <div className='h-[66vh] bg-slate-500'>
          <h1>챗봇 API</h1>
        </div>
      </div>
    </div>
  );
}
