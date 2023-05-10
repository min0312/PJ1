import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Login from './loginpage/Login';
import Doorway from './page/Doorway';
import Edit from "./page/Edit";
import Header from "./page/Header";
import Main from "./page/Main";
import Post from "./page/Post";
import Write from "./page/Write";

function App() {
  return (
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
  );
}

export default App;
