import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Doorway from './page/Doorway';
import Header from "./page/Header";
import Login from './page/Login';
import Main from "./page/Main";
import Post from "./page/Post";

function App() {
  return (
    <BrowserRouter>
      <div className="absolute top-0"><Header /></div>
      <div className="">
        <Routes>
          <Route path="/" element={<Doorway />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/:index" element={<Post />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
