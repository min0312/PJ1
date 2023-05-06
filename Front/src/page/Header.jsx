import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="w-[100vw] flex h-[6vh] p-[2vh] justify-between place-items-center">
      <Link to='/' className="w-[10vw] text-xl text-center">Logo</Link>
      <Link to={'/Login'}>
        <BsPersonCircle className="h-[24px] w-[24px]"/>
      </Link>
    </div>
  )
}