import logo from "/knowlegeusOne.png";
import { Link } from "react-router-dom";
export default function Footer() {
  const date = new Date("10/4/2023");
  const year = date.getFullYear();

  return (
    <div className="bg-[#242630] text-secondary p-20">
      <div className="flex justify-between">
        <div>
          <img className="h-10" src={logo} alt="Logo" />
        </div>
        <div className="flex gap-20">
          <ul className="space-y-2">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/books">
              <li>Books</li>
            </Link>
            <Link to="/dashboard">
              <li>Dashboard</li>
            </Link>
          </ul>
          <ul className="space-y-2">
            <li>Contact</li>
            <li>Support</li>
          </ul>
          <ul className="space-y-2">
            {/* <li>List your gear</li>
            <li>Contact team</li> */}
            <Link to="#">
              <li>Login</li>
            </Link>
            <Link to="#">
              <li>Add book</li>
            </Link>
          </ul>
        </div>
        {/* <div className="flex gap-2 text-2xl">
          <RiFacebookBoxFill />
          <RiInstagramLine />
        </div> */}
      </div>
      <div className="flex w-full mt-20 gap-5">
        <p>Privacy Policy</p>
        <p>Terms & Condition</p>
        <p className="ml-auto"> &#169; Knowledgeus {year}</p>
      </div>
    </div>
  );
}
