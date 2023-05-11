import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Login from './loginpage/Login';
import Doorway from './page/Doorway';
import Edit from "./page/Edit";
import Header from "./page/Header";
import Main from "./page/Main";
import Post from "./page/Post";
import Write from "./page/Write";

export default function App() {

  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch("http://localhost:4000/board")
        .then(() => {
          setConnected(true);
        })
        .catch(() => {
          setConnected(false);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("grade");
        });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {connected ? console.log("서버와 연결됨") : "서버와 연결이 끊어짐"}
      <BrowserRouter>
        <div className="absolute top-0"><Header /></div>
        <div className="">
          <Routes>
            <Route path="/" element={<Doorway />} />
            <Route path="/Main" element={<Main />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Post/:indexs" element={<Post />} />
            <Route path="/Write" element={<Write />} />
            <Route path="/Edit/:indexs" element={<Edit />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
