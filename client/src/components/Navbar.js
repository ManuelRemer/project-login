//styles
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li className="navbar_title">
          <h1>In/Out</h1>
        </li>
        <li className="navbar_links">
          <Link to="/login">
            <button className="btn">Login</button>
          </Link>
          <Link to="/signup">
            <button>Signup</button>
          </Link>
          <button>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
