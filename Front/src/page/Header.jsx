import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Header() {
  const [id, setId] = useState();

  const user = localStorage.getItem('user');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('grade');
    alert("로그아웃 되었습니다.")
    // 홈 화면으로 이동
    window.location.href = '/Main';
  };


  return (
    <div className="w-[100vw] flex h-[6vh] p-[2vh] justify-between place-items-center">
      <Link to='/' className="w-[10vw] text-xl text-center">Logo</Link>
      <div>
        {localStorage.getItem('token') ? (
          <div className="flex gap-2">
            <p>{user}님</p> 
            <button onClick={logout}>로그아웃</button>
          </div>
        ) : (
          <Link to={'/Login'}>
            <BsPersonCircle className="h-[24px] w-[24px]"/>
          </Link>
        )}
      </div>
    </div>
  )
}