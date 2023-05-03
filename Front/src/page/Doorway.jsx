import { Link } from "react-router-dom";

export default function Doorway() {

  return (
    <div className="w-[100vw] h-[100vh] pt-[40vh] text-center place-content-around">
      <div><Link to='/Main'>Board</Link></div>
    </div>
  )
}