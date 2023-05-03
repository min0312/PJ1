import React from 'react';
import Catimg from '../component/Catimg';

export default function Main() {

  return (
    <div className='flex pt-[6vh]'>
      <div className='w-[65vw]'>
        <h1>Board</h1>
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
